import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesList.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextColor } from '@/shared/ui/Text/Text';
import { SkeletonCard, SkeletonCardType } from '@/shared/ui/SkeletonCard/SkeletonCard';
import { ArticleViewCard, ArticleViewPreview } from '@/features/Article/ArticleView';
import { DisplayType } from '@/features/DataListManager';
import { Article } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';

interface ArticlesListProps {
  className?: string;
  children?: React.ReactNode;
  articlesList: Article[];
  isLoading: boolean;
  displayType: DisplayType;
}

export const ArticlesList: FC<ArticlesListProps> = memo((props) => {
  const { className = '', articlesList, isLoading, displayType } = props;
  const { t } = useTranslation('article');

  const renderArticle = (article: Article) => {
    if (displayType === DisplayType.CARD)
      return <ArticleViewCard key={article.id} article={article} />;

    if (displayType === DisplayType.PREVIEW)
      return <ArticleViewPreview key={article.id} article={article} />;
  };

  const renderArticlesList = () => {
    let loadingElement = null;

    if (isLoading) {
      if (displayType === DisplayType.CARD) {
        loadingElement = Array(9)
          .fill(0)
          .map((_, index) => (
            <SkeletonCard key={index} cardType={SkeletonCardType.POST} width="30%" />
          ));
      }

      if (displayType === DisplayType.PREVIEW) {
        loadingElement = Array(4)
          .fill(0)
          .map((_, index) => (
            <SkeletonCard key={index} cardType={SkeletonCardType.USER} width="100%" />
          ));
      }
    }

    if (!isLoading && !articlesList.length) {
      return (
        <Text
          text={t('ARTICLE.TEXTS.noArticles')}
          align={TextAlign.CENTER}
          margin="24px 0"
          width="100%"
          color={TextColor.FADED}
        />
      );
    }

    return (
      <>
        {articlesList.map((article) => (
          <div key={article.id}>{renderArticle(article)}</div>
        ))}
        {loadingElement}
      </>
    );
  };

  const renderContent = () => {
    return <VStack gap="24">{renderArticlesList()}</VStack>;
  };

  return <div className={classNames(cls.ArticlesList, {}, [className])}>{renderContent()}</div>;
});
