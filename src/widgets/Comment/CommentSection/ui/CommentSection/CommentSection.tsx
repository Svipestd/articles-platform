import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentSection.module.scss';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import {
  commentSectionReducer,
  commentSectionSelectors,
  commentSectionThunks,
} from '../../model/slices/commentSectionSlice/commentSectionSlice';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { CommentCreateForm } from '@/features/Comment/CommentCreate';
import { CommentList } from '@/features/Comment/CommentList';
import { Card } from '@/shared/ui/Card/Card';

const initialReducers: ReducersList = {
  commentSection: commentSectionReducer,
};

interface CommentSectionProps {
  className?: string;
  children?: React.ReactNode;
  parentId: string;
}

export const CommentSection: FC<CommentSectionProps> = memo((props) => {
  const { className = '', parentId } = props;
  const { t } = useTranslation('comment');
  const dispatch = useAppDispatch();

  const commentSectionIsLoading = useSelector(commentSectionSelectors.selectIsLoading);
  const commentSectionError = useSelector(commentSectionSelectors.selectError);
  const commentSectionCommentIds = useSelector(commentSectionSelectors.selectCommentsIds);

  useInitialEffect(() => {
    dispatch(commentSectionThunks.fetchCommentListByIdThunk({ id: parentId }));
  });

  const renderTitle = () => {
    if (commentSectionIsLoading) return <Skeleton height={38} width={'100%'} margin="12px 0" />;

    return (
      <Text
        className={cls['comment-list-title']}
        text={t('COMMENT.TEXTS.commentList')}
        size={TextSize.L}
        bold
      />
    );
  };

  const renderCommentCreateForm = () => {
    if (commentSectionIsLoading) return <Skeleton height={38} width={'100%'} margin="12px 0" />;

    return <CommentCreateForm parentId={parentId} />;
  };

  const renderCommentList = () => {
    return (
      <CommentList commentIds={commentSectionCommentIds} isLoading={commentSectionIsLoading} />
    );
  };

  const renderContent = () => {
    return (
      <Card>
        {renderTitle()}
        {renderCommentCreateForm()}
        {renderCommentList()}
      </Card>
    );
  };

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.CommentList, {}, [className])}>{renderContent()}</div>
    </DynamicModuleLoader>
  );
});
