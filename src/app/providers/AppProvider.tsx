import { App as AntdApp } from 'antd';
import type { PropsWithChildren } from 'react';
import { AuthProvider } from './AuthProvider';
import { LocaleProvider } from './LocaleProvider';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

/**
 * 全局根 Provider
 *
 * 组合所有上层 Provider（Query / Theme / Locale / Auth 等），
 * 作为整个 React 应用的统一出口。
 */
export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <LocaleProvider>
          <AntdApp className="h-full">
            <AuthProvider>{children}</AuthProvider>
          </AntdApp>
        </LocaleProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
