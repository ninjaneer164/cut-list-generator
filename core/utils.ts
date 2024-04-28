import appStyles from './styles.css?inline';

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
    window.printd.print(element, [appStyles, ...(styles || [])]);
  }
};
export const uuid = (): string => {
  return crypto.randomUUID();
};
