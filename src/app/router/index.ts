import { Card, Typography } from 'antd';
import { createElement } from 'react';

/**
 * 路由系统入口
 *
 * 当前先提供可挂载的路由壳，后续可在这里替换为 TanStack Router 实例，
 * 统一编排根路由、静态路由、动态路由、权限过滤等模块。
 */
export function AppRouter() {
  return createElement(
    'main',
    { className: 'app-root' },
    createElement(
      Card,
      { className: 'app-root__card' },
      createElement(Typography.Title, { level: 3 }, 'Syndra Pro'),
      createElement(Typography.Paragraph, null, '应用入口已接入 AppProvider，可继续接入业务路由。')
    )
  );
}
