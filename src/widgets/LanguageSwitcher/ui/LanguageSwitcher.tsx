import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LanguageSwitcher.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import FlagEn from '@/shared/assets/icons/flags/flag-en.svg';
import FlagRu from '@/shared/assets/icons/flags/flag-ru.svg';
import { Language } from '@/shared/config/i18n/i18n';

interface LanguageSwitcherProps {
  className?: string;
  children?: React.ReactNode;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = (props) => {
  const { className } = props;

  const { i18n } = useTranslation();

  const toggleLanguage = async () => {
    i18n.changeLanguage(i18n.language === Language.RU ? Language.EN : Language.RU);
  };

  return (
    <Button
      className={classNames(cls.ThemeSwitcher, {}, [className, cls.icon])}
      theme={ThemeButton.CLEAR}
      onClick={toggleLanguage}
    >
      {i18n.language === Language.RU ? <FlagRu /> : <FlagEn />}
    </Button>
  );
};
