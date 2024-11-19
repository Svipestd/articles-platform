import { FC, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher';
import { Button } from '@/shared/ui/Button/Button';

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { className } = props;

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <Button data-testid="sidebar-toggle" onClick={onToggle}></Button>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
};
