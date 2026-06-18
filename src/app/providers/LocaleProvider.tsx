import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import { useEffect, type PropsWithChildren } from 'react';
import { changeLanguage } from '@/app/bootstrap/i18n';
import { useSettingStore } from '@/shared/stores/setting.store';

/**
 * 国际化 Provider
 *
 * 注入当前语言环境（zh-CN / en-US ...），同时驱动 i18next、antd locale 与 dayjs。
 */
export function LocaleProvider({ children }: PropsWithChildren) {
  const locale = useSettingStore((state) => state.locale);
  const isZhCN = locale === 'zh-CN';

  useEffect(() => {
    dayjs.locale(isZhCN ? 'zh-cn' : 'en');
    void changeLanguage(locale);
  }, [isZhCN, locale]);

  return <ConfigProvider locale={isZhCN ? zhCN : enUS}>{children}</ConfigProvider>;
}
