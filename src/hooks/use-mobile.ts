import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Initialize with false to match server-side rendering (desktop-first approach)
  const [isMobile, setIsMobile] = React.useState(false);
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    // Mark as mounted to prevent hydration mismatch
    setHasMounted(true);

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Return false during SSR and initial hydration to prevent mismatch
  if (!hasMounted) {
    return false;
  }

  return isMobile;
}
