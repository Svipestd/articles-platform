import { FC, memo, MutableRefObject, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { useTranslation } from 'react-i18next';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { appActions } from '@/app/model/app/slices/appSlice/appSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface PageProps {
  className?: string;
  children?: React.ReactNode;
  onScrollEnd?: (isPageEnd: boolean) => void;
}

export const Page: FC<PageProps> = memo((props) => {
  const { className = '', children, onScrollEnd } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const wrapperRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  const onScrollEndHandler = (isPageEnd: boolean) => {
    dispatch(appActions.setIsPageEnd(isPageEnd));

    if (onScrollEnd) onScrollEnd(isPageEnd);
  };

  useInfiniteScroll({ wrapperRef, triggerRef, callback: onScrollEndHandler });

  return (
    <main className={classNames(cls.Page, {}, [className])}>
      {children}
      <div ref={triggerRef}></div>
    </main>
  );
});
