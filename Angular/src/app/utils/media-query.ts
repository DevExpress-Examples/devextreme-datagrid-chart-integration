const BREAKPOINT_SMALL = '(max-width: 800px)';

type Handler = () => void;

let handlers: Handler[] = [];
let mediaQuery: MediaQueryList | null = null;

if (typeof window !== 'undefined') {
  mediaQuery = window.matchMedia(BREAKPOINT_SMALL);
  mediaQuery.addEventListener('change', () => {
    handlers.forEach((h) => h());
  });
}

export function isSmallScreen(): boolean {
  return mediaQuery?.matches ?? false;
}

export function subscribeToScreenResize(handler: Handler): void {
  handlers.push(handler);
}

export function unsubscribeFromScreenResize(handler: Handler): void {
  handlers = handlers.filter((h) => h !== handler);
}
