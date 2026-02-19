export {};

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    clarity?: (action: string, ...args: unknown[]) => void;
  }
}
