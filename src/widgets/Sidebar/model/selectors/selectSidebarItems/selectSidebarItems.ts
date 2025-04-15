import IconAbout from '@/shared/assets/icons/sidebar/about.svg';
import IconHome from '@/shared/assets/icons/sidebar/home.svg';
import { authSelectors } from '@/app/model/auth/slices/authSlice/authSlice';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from '../../types/sidebarTypes';

export const selectSidebarItems = createSelector(authSelectors.selectUser, (user) => {
  const sidebarItems: SidebarItemType[] = [
    {
      path: RoutePath.main,
      text: 'SIDEBAR.ITEMS.main',
      Icon: IconHome,
    },
    {
      path: RoutePath.about,
      text: 'SIDEBAR.ITEMS.about',
      Icon: IconAbout,
    },
  ];

  if (user)
    sidebarItems.push(
      {
        path: `${RoutePath.profile}/${user.id}`,
        text: 'SIDEBAR.ITEMS.profile',
        Icon: IconHome,
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        text: 'SIDEBAR.ITEMS.articles',
        Icon: IconHome,
        authOnly: true,
      }
    );

  return sidebarItems;
});
