const Breakpoints = {
  XSmall: '(max-width: 800px)',
};

type Handler = () => void;

let handlers: Handler[] = [];

let xSmallMedia: MediaQueryList | null = null;

if (typeof window !== 'undefined') {
  xSmallMedia = window.matchMedia(Breakpoints.XSmall);

  xSmallMedia.addEventListener('change', () => {
    handlers.forEach((handler) => handler());
  });
}

export interface ScreenSizes {
  'screen-x-small': boolean;
}

export const sizes = (): ScreenSizes => {
  return {
    'screen-x-small': xSmallMedia?.matches ?? false,
  };
};

export const subscribe = (handler: Handler): void => {
  handlers.push(handler);
};

export const unsubscribe = (handler: Handler): void => {
  handlers = handlers.filter((item) => item !== handler);
};
