import { useCallback, useEffect } from 'react';

/**
 * A hook that handles pressed Enter key.
 *
 * @param callback - callback that called when Enter pressed
 */
export function usePressEnter(callback: () => void) {
  const keyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [keyDown]);
}
