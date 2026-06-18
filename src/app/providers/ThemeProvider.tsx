import { ConfigProvider } from 'antd';
import { useEffect, useMemo, type PropsWithChildren } from 'react';
import { useShallow } from 'zustand/shallow';
import { applyDocumentTheme, createAntdTheme, getResolvedThemeMode } from '@/app/bootstrap/theme';
import { useSettingStore } from '@/shared/stores/setting.store';

/**
 * 主题 Provider
 *
 * 注入主题上下文（明/暗、主色、紧凑模式等），
 * 同时驱动 antd ConfigProvider 与 document 主题属性。
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  const { colorPrimary, colorError, colorSuccess, colorWarning, radius, themeMode, compact } = useSettingStore(
    useShallow((state) => ({
      colorPrimary: state.colorPrimary,
      colorError: state.colorError,
      colorSuccess: state.colorSuccess,
      colorWarning: state.colorWarning,
      radius: state.radius,
      themeMode: state.themeMode,
      compact: state.compact,
    }))
  );

  const resolvedThemeMode = getResolvedThemeMode(themeMode);
  const isDark = resolvedThemeMode === 'dark';

  useEffect(() => {
    applyDocumentTheme(isDark);
  }, [isDark]);

  const theme = useMemo(
    () =>
      createAntdTheme({
        isDark,
        compact,
        colorPrimary,
        colorError,
        colorSuccess,
        colorWarning,
        radius,
      }),
    [isDark, compact, colorPrimary, colorError, colorSuccess, colorWarning, radius]
  );

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
