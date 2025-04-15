import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileViewCard.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextColor } from '@/shared/ui/Text/Text';
import { User } from '@/entities/User';
import { Card } from '@/shared/ui/Card/Card';

interface ProfileViewCardProps {
  className?: string;
  children?: React.ReactNode;
  profile: User | null;
}

const ProfileViewCard: FC<ProfileViewCardProps> = memo((props) => {
  const { className = '', profile } = props;
  const { t } = useTranslation('profile');

  const renderContent = () => {
    if (!profile) {
      return null;
    }

    return (
      <Card>
        <div className={cls.cardItem}>
          <Text className={cls.cardItemHeader} text={t('PROFILE.FIELDS.birthDate')} bold />
          <Text
            className={cls.cardItemValue}
            text={profile.birthDate || t('GENERAL.TEXTS.notSpecified', { ns: 'translation' })}
            color={TextColor.FADED}
          />
        </div>

        <div className={cls.cardItem}>
          <Text
            className={cls.cardItemHeader}
            text={t('GENERAL.FIELDS.country', { ns: 'translation' })}
            bold
          />
          <Text
            className={cls.cardItemValue}
            text={profile.country || t('GENERAL.TEXTS.notSpecified', { ns: 'translation' })}
            color={TextColor.FADED}
          />
        </div>

        <div className={cls.cardItem}>
          <Text className={cls.cardItemHeader} text={t('PROFILE.FIELDS.city')} bold />
          <Text
            className={cls.cardItemValue}
            text={profile.city || t('GENERAL.TEXTS.notSpecified', { ns: 'translation' })}
            color={TextColor.FADED}
          />
        </div>

        <div className={cls.cardItem}>
          <Text
            className={cls.cardItemHeader}
            text={t('GENERAL.FIELDS.currency', { ns: 'translation' })}
            bold
          />
          <Text
            className={cls.cardItemValue}
            text={profile.currency || t('GENERAL.TEXTS.notSpecified', { ns: 'translation' })}
            color={TextColor.FADED}
          />
        </div>
      </Card>
    );
  };

  return <div className={classNames(cls.ProfileViewCard, {}, [className])}>{renderContent()}</div>;
});

export default ProfileViewCard;
