import { MutableRefObject, useEffect } from 'react';

interface UseInfiniteScrollOptions {
  wrapperRef: MutableRefObject<HTMLElement>;
  triggerRef: MutableRefObject<HTMLElement>;
  callback?: (isPageEnd: boolean) => void;
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions) {
  const { wrapperRef, triggerRef, callback } = options;

  useEffect(() => {
    if (!callback) return;

    const triggerRefStored = triggerRef.current;
    const wrapperRefStored = wrapperRef.current;

    const options = {
      root: wrapperRefStored,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      // if (entries[0].isIntersecting) {
      //   callback(entries[0].isIntersecting);
      // }

      callback(entries[0].isIntersecting);
    }, options);

    observer.observe(triggerRefStored);

    return () => {
      observer.unobserve(triggerRefStored);
    };
  }, [wrapperRef, triggerRef, callback]);
}
