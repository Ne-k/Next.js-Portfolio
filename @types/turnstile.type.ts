export type TurnstileOptions = {
  sitekey: string;
  theme?: "auto" | "light" | "dark";
  action?: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (target: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
    };
  }
}
