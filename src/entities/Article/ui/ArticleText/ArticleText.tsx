import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleText.module.scss';
import { useTranslation } from 'react-i18next';
import { ArticleBlockText } from '../../model/types/article';
import { Text, TextSize } from '@/shared/ui/Text/Text';

interface ArticleTextProps {
  className?: string;
  children?: React.ReactNode;
  block: ArticleBlockText;
}

export const ArticleText: FC<ArticleTextProps> = memo((props) => {
  const { className = '', block } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticleText, {}, [className])}>
      {block.title && (
        <div className={cls['article-text-title']}>
          <Text text={block.title} size={TextSize.XL} bold />
        </div>
      )}

      {block.paragraphs.map((paragraph) => (
        <Text key={paragraph} text={paragraph} size={TextSize.L} />
      ))}
    </div>
  );
});
