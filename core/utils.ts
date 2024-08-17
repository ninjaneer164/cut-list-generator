import { Material } from './material';

export namespace Utils {
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
