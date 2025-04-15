import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSection.module.scss';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleSectionReducer,
  articleSectionSelectors,
  articleSectionThunks,
} from '../../model/slices/articleSectionSlice/articleSectionSlice';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextAlign, TextColor } from '@/shared/ui/Text/Text';
import { Divider } from '@/shared/ui/Divider/Divider';
import { CommentSection } from '@/widgets/Comment/CommentSection';
import { ArticleViewFull } from '@/features/Article/ArticleView';

const initialReducers: ReducersList = {
  articleSection: articleSectionReducer,
};

interface ArticleSectionProps {
  className?: string;
  children?: React.ReactNode;
  articleId: string;
}

export const ArticleSection: FC<ArticleSectionProps> = memo((props) => {
  const { className = '', articleId } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const articleSectionIsLoading = useSelector(articleSectionSelectors.selectIsLoading);
  const articleSectionError = useSelector(articleSectionSelectors.selectError);
  const article = useSelector(articleSectionSelectors.selectArticle);

  useInitialEffect(() => {
    dispatch(articleSectionThunks.fetchArticleThunk({ id: articleId }));
  });

  const renderError = () => {
    return (
      <Text
        text={t('GENERAL.ERRORS.defaultError', { ns: 'translation' })}
        align={TextAlign.CENTER}
        color={TextColor.ERROR}
      />
    );
  };

  const renderArticle = () => {
    if (articleSectionError) return renderError();

    return (
      <>
        <ArticleViewFull article={article} />
      </>
    );
  };

  const renderComments = () => {
    return (
      <>
        <CommentSection parentId={articleId} />
      </>
    );
  };

  const renderContent = () => {
    return (
      <>
        {renderArticle()}

        <Divider isLine={false} />

        {renderComments()}
      </>
    );
  };

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ArticleSection, {}, [className])}>{renderContent()}</div>
    </DynamicModuleLoader>
  );
});
