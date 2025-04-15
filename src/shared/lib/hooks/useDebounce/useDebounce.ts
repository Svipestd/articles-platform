import { MutableRefObject, useCallback, useRef } from 'react';

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number,
  deps: any[] = []
) => {
  const timer = useRef() as MutableRefObject<any>;

  return useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, delay, ...deps]
  );
};
