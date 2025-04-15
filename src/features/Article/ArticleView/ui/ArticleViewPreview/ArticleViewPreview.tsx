import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article, ArticleBlockType } from '@/entities/Article/model/types/article';
import cls from './ArticleViewPreview.module.scss';
import { SkeletonSection } from '@/shared/ui/SkeletonSection/SkeletonSection';
import { ArticleHeaderPreview, ArticleText } from '@/entities/Article';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { Button } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card/Card';

interface ArticleViewPreviewProps {
  className?: string;
  children?: React.ReactNode;
  article: Article;
}

export const ArticleViewPreview: FC<ArticleViewPreviewProps> = memo((props) => {
  const { className = '', article } = props;
  const { t } = useTranslation('article');

  const renderArticleText = () => {
    const articleTextBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT);
    if (!articleTextBlock) return null;

    return (
      <div className={cls['text-block-container']}>
        <ArticleText block={articleTextBlock} key={articleTextBlock.id} />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <Card>
        <ArticleHeaderPreview article={article} />

        <div className={cls['article-content']}>
          {!article && <SkeletonSection />}
          {article && renderArticleText()}
        </div>

        <div className={cls['article-actions']}>
          <AppLink to={`${RoutePath.article_details}/${article.id}`}>
            <Button>{t('ARTICLE.ACTIONS.readMore')}</Button>
          </AppLink>
        </div>
      </Card>
    );
  };

  return (
    <div className={classNames(cls.ArticleViewPreview, {}, [className])}>{renderContent()}</div>
  );
});
