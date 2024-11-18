import { lazy } from 'react';

export const MainPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        //@ts-expect-error test
        resolve(import('./MainPage'));
      }, 111111);
    })
);
