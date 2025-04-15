import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleSection } from '@/widgets/Article/ArticleSection/ui/ArticleSection/ArticleSection';
import { Page } from '@/shared/ui/Page/Page';

interface ArticleDetailsPageProps {
  className?: string;
  children?: React.ReactNode;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = memo((props) => {
  const { className = '' } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>{t('No article')}</div>
    );
  }

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleSection articleId={id} />
    </Page>
  );
});

export default ArticleDetailsPage;
