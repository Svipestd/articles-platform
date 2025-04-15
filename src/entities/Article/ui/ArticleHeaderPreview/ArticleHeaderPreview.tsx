import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleHeaderPreview.module.scss';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from '@/entities/User';
import { Article } from '@/entities/Article';
import { Text, TextColor, TextSize } from '@/shared/ui/Text/Text';
import { Icon, IconSize } from '@/shared/ui/Icon/Icon';
import { FaEye } from 'react-icons/fa';
import { UserAvatarSize } from '@/entities/User/ui/UserAvatar/UserAvatar';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Tag, TagColor } from '@/shared/ui/Tag/Tag';

interface ArticleHeaderPreviewProps {
  className?: string;
  children?: React.ReactNode;
  article: Article | null;
}

export const ArticleHeaderPreview: FC<ArticleHeaderPreviewProps> = memo((props) => {
  const { className = '', article } = props;
  const { t } = useTranslation();

  const renderTitle = () => {
    if (!article) return <Skeleton height={50} width={'100%'} />;

    return <Text text={article.title} size={TextSize.XXL} bold />;
  };

  const renderInfo = () => {
    if (!article)
      return (
        <>
          <div className={cls['info-item']}>
            <Skeleton height={24} width={100} />
          </div>
        </>
      );

    return (
      <>
        <div className={cls['info-item']}>
          <Text text={article.createdAt} color={TextColor.FADED} bold />
        </div>

        <div className={cls['info-item']}>
          <Icon Svg={FaEye} size={IconSize.S} />
          <Text text={String(article.views)} color={TextColor.FADED} bold />
        </div>
      </>
    );
  };

  const renderTags = () => {
    if (!article)
      return (
        <div className={cls['tag-item']}>
          <Skeleton height={24} width={100} />
        </div>
      );

    return article.tags.map((tag) => (
      <div key={tag} className={cls['tags-item']}>
        <Tag text={tag} color={TagColor.PRIMARY} />
      </div>
    ));
  };

  return (
    <div className={classNames(cls.ArticleHeaderPreview, {}, [className])}>
      <div className={cls['username-container']}>
        <UserAvatar user={article?.user || null} size={UserAvatarSize.S} isLink={true} />
      </div>

      <div className={cls['title-container']}>{renderTitle()}</div>

      <div className={cls['info-container']}>{renderInfo()}</div>

      <div className={cls['tags-container']}>{renderTags()}</div>
    </div>
  );
});
