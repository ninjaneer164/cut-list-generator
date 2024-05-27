// import appStyles from './styles.css?inline';

import { Material } from './material';

declare global {
  interface Window {
    printd: any;
  }
}

export namespace Utils {
  export const initPrintd = (printd: any): void => {
    window.printd = printd;
  };
  export const printCutList = (
    element: HTMLElement,
    styles?: string[]
  ): void => {
    if (window.printd) {
      // window.printd.print(element, [appStyles, ...(styles || [])]);
      window.printd.print(element, [...(styles || [])]);
    }
  };
  export const deg2rad = (deg: number): number => {
    return Math.PI * (deg / 180);
  };
  export const uuid = (): string => {
    return crypto.randomUUID();
  };

  export const setSectionColor = (
    materials: Material[],
    sectionId: string,
    color: string
  ): Material[] => {
    materials.forEach((material) => {
      material.projects.some((project) => {
        let section = project.sections.find(
          (section) => section.id === sectionId
        );
        if (section) {
          section = {
            ...section,
            color,
            cuts: section.cuts.map((cut) => {
              return {
                ...cut,
                color,
              };
            }),
          };
          // section.color = color;
          return true;
        }
        return false;
      });
    });
    return materials;
  };
}
