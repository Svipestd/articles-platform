import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentViewCard.module.scss';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from '@/entities/User';
import { Icon, IconSize } from '@/shared/ui/Icon/Icon';
import { FaHeart } from 'react-icons/fa';
import { Text, TextColor } from '@/shared/ui/Text/Text';
import { UserAvatarSize } from '@/entities/User/ui/UserAvatar/UserAvatar';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { commentSectionSelectors } from '@/widgets/Comment/CommentSection';

interface CommentViewCardProps {
  className?: string;
  children?: React.ReactNode;
  commentId: string;
}

export const CommentViewCard: FC<CommentViewCardProps> = memo((props) => {
  const { className = '', commentId } = props;
  const { t } = useTranslation();

  const comment = useSelector((state: StateSchema) =>
    commentSectionSelectors.selectCommentById(state, commentId)
  );

  return (
    <div className={classNames(cls.CommentViewCard, {}, [className])}>
      <div>
        <UserAvatar user={comment.user} size={UserAvatarSize.S} isLink={true} />
      </div>

      <div className={cls['comment-text']}>
        <Text text={comment.text} />
      </div>

      <div className={cls['comment-actions']}>
        <div className={cls['comment-action-item']}>
          <Icon Svg={FaHeart} size={IconSize.S} />
          <Text text={comment.likes} color={TextColor.FADED} />
        </div>
      </div>
    </div>
  );
});
