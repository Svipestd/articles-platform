import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImage.module.scss';
import { useTranslation } from 'react-i18next';
import { ArticleBlockImage } from '../../model/types/article';
import { Text, TextColor } from '@/shared/ui/Text/Text';

interface ArticleImageProps {
  className?: string;
  children?: React.ReactNode;
  block: ArticleBlockImage;
}

export const ArticleImage: FC<ArticleImageProps> = memo((props) => {
  const { className = '', block } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticleImage, {}, [className])}>
      <img src={block.src} />

      {block.title && <Text text={block.title} color={TextColor.FADED} />}
    </div>
  );
});
