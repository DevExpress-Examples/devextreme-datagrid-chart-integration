import { useState, useEffect, useCallback } from 'react';

const BREAKPOINT_SMALL = 800;

export default function useScreenSize(): { isSmall: boolean } {
  const [isSmall, setIsSmall] = useState(
    () => window.innerWidth <= BREAKPOINT_SMALL,
  );

  const handleResize = useCallback(() => {
    setIsSmall(window.innerWidth <= BREAKPOINT_SMALL);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return { isSmall };
}
