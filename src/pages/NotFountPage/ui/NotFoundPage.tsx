import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page/Page';

interface NotFoundPageProps {
  className?: string;
  children?: React.ReactNode;
}

export const NotFoundPage: FC<NotFoundPageProps> = memo((props) => {
  const { className = '' } = props;

  const { t } = useTranslation();

  return <Page className={classNames(cls.NotFoundPage, {}, [className])}>{t('pageNotFound')}</Page>;
});
