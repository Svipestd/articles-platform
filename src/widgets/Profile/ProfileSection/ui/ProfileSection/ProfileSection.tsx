import { FC, memo, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileSection.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  profileSectionActions,
  profileSectionReducer,
  profileSectionSelectors,
  profileSectionThunks,
} from '../../model/slices/profileSectionSlice/profileSectionSlice';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { FormMode } from '@/shared/types/common';
import { Text, TextAlign, TextColor } from '@/shared/ui/Text/Text';
import { UserAvatar } from '@/entities/User';
import { Divider } from '@/shared/ui/Divider/Divider';
import { authSelectors } from '@/app/model/auth/slices/authSlice/authSlice';
import { ProfileEditForm } from '@/features/Profile/ProfileEdit';
import { ProfileViewCard } from '@/features/Profile/ProfileView';
import { Card } from '@/shared/ui/Card/Card';
import { testFunc } from '@/test';
import { ArticlesListCurrentUserSection } from '@/widgets/Article/ArticlesListCurrentUserSection';
import { ArticlesListOtherUserSection } from '@/widgets/Article/ArticlesListOtherUserSection';
import { SkeletonCard, SkeletonCardType } from '@/shared/ui/SkeletonCard/SkeletonCard';

const initialReducers: ReducersList = {
  profileSection: profileSectionReducer,
};

interface ProfileSectionProps {
  className?: string;
  children?: React.ReactNode;
  userId: string;
}

export const ProfileSection: FC<ProfileSectionProps> = memo((props) => {
  const { className = '', userId } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLoading = useSelector(profileSectionSelectors.selectIsLoading);
  const error = useSelector(profileSectionSelectors.selectError);
  const formMode = useSelector(profileSectionSelectors.selectFormMode);
  const profile = useSelector(profileSectionSelectors.selectProfile);

  const authUser = useSelector(authSelectors.selectUser);
  const isOwner = authUser && authUser.id === userId;

  useEffect(() => {
    dispatch(profileSectionThunks.fetchProfileByIdThunk({ id: userId }));
  }, [dispatch, userId]);

  const onChangeFormMode = (value: FormMode) => {
    dispatch(profileSectionActions.setFormMode(value));
  };

  const onDeleteProfile = () => {
    testFunc(true);
    return;
  };

  const renderActions = () => {
    if (!isOwner) return null;

    let actionsComponent = null;

    if (formMode === FormMode.VIEW) {
      actionsComponent = (
        <>
          <Button onClick={() => onChangeFormMode(FormMode.EDIT)}>
            {t('GENERAL.ACTIONS.edit', { ns: 'translation' })}
          </Button>
          <Button onClick={() => onDeleteProfile()}>
            {t('GENERAL.ACTIONS.delete', { ns: 'translation' })}
          </Button>
        </>
      );
    }

    if (formMode === FormMode.EDIT) {
      actionsComponent = (
        <>
          <Button variant={ButtonVariant.OUTLINE} onClick={() => onChangeFormMode(FormMode.VIEW)}>
            {t('GENERAL.ACTIONS.cancel', { ns: 'translation' })}
          </Button>
        </>
      );
    }

    return <div className={cls['action-container']}>{actionsComponent}</div>;
  };

  const renderHeader = () => {
    if (isLoading) return <SkeletonCard cardType={SkeletonCardType.USER} width="100%" />

    return (
      <Card className={cls['header']}>
        <UserAvatar user={profile} />
        {renderActions()}
      </Card>
    );
  };

  const renderProfile = () => {
    if (isLoading) return <SkeletonCard cardType={SkeletonCardType.POST} width="100%" />

    if (formMode === FormMode.VIEW) return <ProfileViewCard profile={profile} />;
    if (formMode === FormMode.EDIT) return <ProfileEditForm profile={profile} />;
  };

  const renderArticles = () => {
    if (userId === authUser?.id) return <ArticlesListCurrentUserSection userId={userId} />;
    if (userId !== authUser?.id) return <ArticlesListOtherUserSection userId={userId} />;
  };

  const renderContent = () => {
    if (error) {
      return (
        <>
          <Text
            text={t('GENERAL.ERRORS.defaultError', { ns: 'translation' })}
            align={TextAlign.CENTER}
            color={TextColor.ERROR}
          />
        </>
      );
    }

    return (
      <>
        {renderHeader()}

        <Divider isLine={false} />

        {renderProfile()}

        <Divider isLine={false} />

        {renderArticles()}
      </>
    );
  };

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ProfileSection, {}, [className])}>{renderContent()}</div>
    </DynamicModuleLoader>
  );
});
