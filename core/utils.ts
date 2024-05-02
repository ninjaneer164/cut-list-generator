// import appStyles from './styles.css?inline';

declare global {
  interface Window {
    printd: any;
  }
}

export const initPrintd = (printd: any): void => {
  window.printd = printd;
};
export const printCutList = (element: HTMLElement, styles?: string[]): void => {
  if (window.printd) {
    window.printd.print(element, [...(styles || [])]);
  }
};
export const deg2rad = (deg: number): number => {
  return Math.PI * (deg / 180);
};
export const uuid = (): string => {
  return crypto.randomUUID();
};
