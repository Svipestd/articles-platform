import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import { ProfileSection } from '@/widgets/Profile/ProfileSection';
import { useParams } from 'react-router-dom';
import { Page } from '@/shared/ui/Page/Page';

interface ProfilePageProps {
  className?: string;
  children?: React.ReactNode;
}

const ProfilePage: FC<ProfilePageProps> = memo((props) => {
  const { className = '' } = props;
  const params = useParams();

  return (
    <Page className={classNames(cls.ProfilePage, {}, [className])}>
      <ProfileSection userId={params.id!} />
    </Page>
  );
});

export default ProfilePage;
