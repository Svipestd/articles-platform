import { Page } from '@/shared/ui/Page/Page';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface AboutPageProps {
  className?: string;
}

const AboutPage: FC<AboutPageProps> = memo(() => {
  const { t } = useTranslation('about');

  return <Page>{t('title')}</Page>;
});

export default AboutPage;
