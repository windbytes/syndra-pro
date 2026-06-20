import { type ComponentType, lazy } from 'react';
import { PlaceholderPage } from './fallback';

/**
 * 菜单 component 字段 → 业务页面组件 的映射。
 *
 * 后端菜单返回的 `component` 是相对 modules 的逻辑路径（如 `system/user`、`dashboard`）。
 * 这里通过 Vite 的 import.meta.glob 在构建期收集 modules 下所有页面，
 * 运行期按约定路径解析，解析不到时回退到占位页。
 */
const pageModules = import.meta.glob(['/src/modules/**/*.tsx', '!/src/modules/auth/**']);

type PageLoader = () => Promise<{ default?: ComponentType<unknown> }>;

/**
 * 按约定路径在 modules 中匹配页面模块加载器。
 *
 * 依次尝试：
 *  - /src/modules/{component}/pages/index.tsx
 *  - /src/modules/{component}/index.tsx
 *  - /src/modules/{component}.tsx
 */
function matchPageLoader(component: string): PageLoader | undefined {
  const normalized = component.replace(/^\/+/, '').replace(/\.tsx$/, '');
  const candidates = [
    `/src/modules/${normalized}/pages/index.tsx`,
    `/src/modules/${normalized}/index.tsx`,
    `/src/modules/${normalized}.tsx`,
  ];

  for (const candidate of candidates) {
    if (pageModules[candidate]) {
      return pageModules[candidate] as PageLoader;
    }
  }

  return undefined;
}

/**
 * 将菜单 component 字段解析为可懒加载的页面组件。
 *
 * - 命中且模块存在 default 导出 → 使用真实页面组件；
 * - 命中但模块尚未实现（无 default 导出，例如当前的 export {} 占位文件）→ 使用占位页；
 * - 未命中 → 使用占位页。
 */
export function resolvePageComponent(component: string) {
  const loader = matchPageLoader(component);

  return lazy(async () => {
    if (!loader) {
      return { default: PlaceholderPage };
    }
    const mod = await loader();
    return { default: mod.default ?? PlaceholderPage };
  });
}
