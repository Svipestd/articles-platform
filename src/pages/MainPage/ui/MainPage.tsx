import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text/Text';
import { Page } from '@/shared/ui/Page/Page';

interface MainPageProps {
  className?: string;
}

const MainPage: FC<MainPageProps> = memo(() => {
  const { t } = useTranslation();

  return (
    <Page>
      <Text text={t('SIDEBAR.ITEMS.main')}></Text>
    </Page>
  );
});

export default MainPage;
