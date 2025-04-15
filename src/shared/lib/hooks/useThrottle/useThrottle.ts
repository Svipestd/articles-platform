import { useCallback, useRef } from 'react';

export const useThrottle = (callback: (...args: any[]) => void, delay: number, deps: any[] = []) => {
  const throttleRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      console.log('hey');

      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;
      }

      setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, delay, ...deps]
  );
};
