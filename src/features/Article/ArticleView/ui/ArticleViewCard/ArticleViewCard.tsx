import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewCard.module.scss';
import { Article, ArticleHeaderCard } from '@/entities/Article';
import { Card } from '@/shared/ui/Card/Card';
import { Image } from '@/shared/ui/Image/Image';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';

interface ArticleViewCardProps {
  className?: string;
  children?: React.ReactNode;
  article: Article;
}

export const ArticleViewCard: FC<ArticleViewCardProps> = memo((props) => {
  const { className = '', article } = props;

  return (
    <div className={classNames(cls.ArticleViewCard, {}, [className])}>
      <AppLink to={`${RoutePath.article_details}/${article.id}`}>
        <Card className={cls['card']}>
          <div className={cls['card-content']}>
            <Image src={article.previewImage} className={cls['card-image']} />

            <ArticleHeaderCard article={article} />
          </div>
        </Card>
      </AppLink>
    </div>
  );
});
