import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCode.module.scss';
import { useTranslation } from 'react-i18next';
import { ArticleBlockCode } from '../../model/types/article';
import { Code } from '@/shared/ui/Code/Code';

interface ArticleCodeProps {
  className?: string;
  children?: React.ReactNode;
  block: ArticleBlockCode;
}

export const ArticleCode: FC<ArticleCodeProps> = memo((props) => {
  const { className = '', block } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticleCode, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
});
