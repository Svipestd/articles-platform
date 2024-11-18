import { FC } from 'react'
import { useTranslation } from 'react-i18next';

interface MainPageProps {
  className?: string
}

const MainPage: FC<MainPageProps> = () => {
  const { t } = useTranslation()

  return (
    <div>
      {t('title')}
    </div>
  );
};

export default MainPage