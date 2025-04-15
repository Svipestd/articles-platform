import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkColor } from '@/shared/ui/AppLink/AppLink';
import { useSelector } from 'react-redux';
import { Icon, IconColor } from '@/shared/ui/Icon/Icon';
import { SidebarItemType } from '../../model/types/sidebarTypes';
import { authSelectors } from '@/app/model/auth/slices/authSlice/authSlice';
import { Text, TextColor, TextSize } from '@/shared/ui/Text/Text';

interface SidebarItemProps {
  className?: string;
  children?: React.ReactNode;
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = memo((props) => {
  const { className = '', item, collapsed } = props;
  const { t } = useTranslation();

  const user = useSelector(authSelectors.selectUser);

  if (item.authOnly && !user) return null;

  return (
    <AppLink
      className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed }, [className])}
      to={item.path}
      color={AppLinkColor.PRIMARY}
    >
      <Icon Svg={item.Icon} color={IconColor.PRIMARY} />
      <Text
        className={cls.link}
        text={t(item.text)}
        color={TextColor.PRIMARY}
        size={TextSize.L}
      ></Text>
    </AppLink>
  );
});
