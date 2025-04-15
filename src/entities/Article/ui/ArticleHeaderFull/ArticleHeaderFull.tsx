import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleHeaderFull.module.scss';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from '@/entities/User';
import { Article } from '@/entities/Article';
import { Text, TextColor, TextSize } from '@/shared/ui/Text/Text';
import { Icon, IconSize } from '@/shared/ui/Icon/Icon';
import { FaEye } from 'react-icons/fa';
import { UserAvatarSize } from '@/entities/User/ui/UserAvatar/UserAvatar';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ArticleHeaderFullProps {
  className?: string;
  children?: React.ReactNode;
  article: Article | null;
}

export const ArticleHeaderFull: FC<ArticleHeaderFullProps> = memo((props) => {
  const { className = '', article } = props;
  const { t } = useTranslation();

  const renderTitle = () => {
    if (!article) return <Skeleton height={50} width={'100%'} />;

    return <Text text={article.title} size={TextSize.XXL} bold />;
  };

  const renderStatistic = () => {
    if (!article)
      return (
        <>
          <div className={cls['statistic-item']}>
            <Skeleton height={24} width={100} />
          </div>
        </>
      );

    return (
      <>
        <div className={cls['statistic-item']}>
          <Icon Svg={FaEye} size={IconSize.S} />
          <Text text={String(article.views)} color={TextColor.FADED} />
        </div>

        <div className={cls['statistic-item']}>
          <Text text={article.createdAt} color={TextColor.FADED} />
        </div>
      </>
    );
  };

  return (
    <div className={classNames(cls.ArticleHeaderFull, {}, [className])}>
      <div className={cls['title-container']}>{renderTitle()}</div>

      <div className={cls['info-container']}>
        <UserAvatar user={article?.user || null} size={UserAvatarSize.S} isLink={true} />

        <div className={cls['statistic-container']}>{renderStatistic()}</div>
      </div>
    </div>
  );
});
