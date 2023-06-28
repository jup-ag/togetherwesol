import { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

// mainly to solve ssr hydration issue by hiding stuff mismatch and showing in client
export const useIsBrowser = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  return isBrowser;
};
