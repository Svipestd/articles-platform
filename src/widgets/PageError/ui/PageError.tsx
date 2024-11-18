import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageError.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';

interface PageErrorProps {
  className?: string;
  children?: React.ReactNode;
}

export const PageError: FC<PageErrorProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <div>{t('defaultError')}</div>

      <Button onClick={reloadPage}>{t('reloadPage')}</Button>
    </div>
  );
};
