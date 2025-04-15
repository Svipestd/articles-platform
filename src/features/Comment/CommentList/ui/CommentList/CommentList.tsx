import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentList.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextColor } from '@/shared/ui/Text/Text';
import { CommentViewCard } from '@/features/Comment/CommentView/ui/CommentViewCard/CommentViewCard';
import { SkeletonCard } from '@/shared/ui/SkeletonCard/SkeletonCard';

interface CommentListProps {
  className?: string;
  children?: React.ReactNode;
  commentIds: string[];
  isLoading: boolean;
}

export const CommentList: FC<CommentListProps> = memo((props) => {
  const { className = '', commentIds, isLoading } = props;
  const { t } = useTranslation('comment');

  const renderCommentList = () => {
    if (isLoading) {
      return Array(3)
        .fill(0)
        .map((_, index) => <SkeletonCard key={index} />);
    }

    if (!commentIds.length) {
      return (
        <Text
          text={t('COMMENT.TEXTS.noComments')}
          align={TextAlign.CENTER}
          margin="24px 0"
          width="100%"
          color={TextColor.FADED}
        />
      );
    }

    return (
      <div className={cls['comment-list-container']}>
        {commentIds.map((commentId) => (
          <CommentViewCard key={commentId} commentId={commentId} />
        ))}
      </div>
    );
  };

  const renderContent = () => {
    return <>{renderCommentList()}</>;
  };

  return <div className={classNames(cls.CommentList, {}, [className])}>{renderContent()}</div>;
});
