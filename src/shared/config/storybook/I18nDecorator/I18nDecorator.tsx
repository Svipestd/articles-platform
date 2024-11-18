import { I18nextProvider } from 'react-i18next';
import i18n, { DEFAULT_LANG, Language } from '@/shared/config/i18n/i18n';
import { Suspense, useEffect } from 'react';

export const localeGlobalType = {
  name: 'Locale',
  description: 'Internationalization locale',
  defaultValue: DEFAULT_LANG,
  toolbar: {
    title: 'Locale',
    icon: 'globe',
    items: [
      { value: Language.EN, title: 'English' },
      { value: Language.RU, title: 'Russian' },
    ],
    dynamicTitle: true,
  },
};

export const I18nDecorator = (Story: any, context: any) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={''}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};
