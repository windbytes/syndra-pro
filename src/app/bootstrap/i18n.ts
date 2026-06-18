import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from '@/locales/en-US';
import zhCN from '@/locales/zh-CN';
import { useSettingStore } from '@/shared/stores/setting.store';

export const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  'en-US': {
    translation: enUS,
  },
} as const;

export type AppLocale = keyof typeof resources;

export async function initI18n() {
  const locale = useSettingStore.getState().locale;

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      lng: locale,
      fallbackLng: 'zh-CN',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });
  }

  return i18n;
}

export const changeLanguage = i18n.changeLanguage.bind(i18n);
export default i18n;
