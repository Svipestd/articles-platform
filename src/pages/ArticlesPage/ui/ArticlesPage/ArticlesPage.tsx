import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page/Page';
import { ArticlesListAllSection } from '@/widgets/Article/ArticlesListAllSection';

interface ArticlesPageProps {
  className?: string;
  children?: React.ReactNode;
}

const ArticlesPage: FC<ArticlesPageProps> = memo((props) => {
  const { className = '' } = props;
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticlesListAllSection />
    </Page>
  );
});

export default ArticlesPage;
