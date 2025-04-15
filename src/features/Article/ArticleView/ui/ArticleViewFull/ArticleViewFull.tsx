import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article, ArticleBlock, ArticleBlockType } from '@/entities/Article/model/types/article';
import cls from './ArticleViewFull.module.scss';
import { SkeletonSection } from '@/shared/ui/SkeletonSection/SkeletonSection';
import { ArticleCode, ArticleHeaderFull, ArticleImage, ArticleText } from '@/entities/Article';
import { Card } from '@/shared/ui/Card/Card';

interface ArticleViewFullProps {
  className?: string;
  children?: React.ReactNode;
  article: Article | null;
}

export const ArticleViewFull: FC<ArticleViewFullProps> = memo((props) => {
  const { className = '', article } = props;

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.TEXT: {
        return <ArticleText block={block} key={block.id} />;
      }
      case ArticleBlockType.CODE: {
        return <ArticleCode block={block} key={block.id} />;
      }
      case ArticleBlockType.IMAGE: {
        return <ArticleImage block={block} key={block.id} />;
      }

      default:
        return null;
    }
  }, []);

  const renderContent = () => {
    return (
      <Card>
        <ArticleHeaderFull article={article} />

        <div className={cls['article-content']}>
          {!article && <SkeletonSection />}
          {article && article.blocks.map((block) => renderBlock(block))}
        </div>
      </Card>
    );
  };

  return <div className={classNames(cls.ArticleViewFull, {}, [className])}>{renderContent()}</div>;
});
