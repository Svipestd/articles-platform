import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { selectSidebarItems } from '../../model/selectors/selectSidebarItems/selectSidebarItems';
import { VStack } from '@/shared/ui/Stack';

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}

export const Sidebar: FC<SidebarProps> = memo((props) => {
  const { className = '' } = props;

  const SidebarItemsList = useSelector(selectSidebarItems);

  return (
    <aside data-testid="sidebar" className={classNames(cls.Sidebar, {}, [className])}>
      <VStack className={cls.items} gap="4" role="navigation">
        {SidebarItemsList.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={false} />
        ))}
      </VStack>
    </aside>
  );
});
