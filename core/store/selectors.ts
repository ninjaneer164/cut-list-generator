import { CutListState, Material, Project } from '..';

const getState = (state: any) => state.cutList ?? state;

export const selectCutListState = (state: any): CutListState => getState(state);

export const selectBladeThicknessPercentByMaterialId =
  (materialId: string) =>
  (state: any): number => {
    const material = getState(state).materials.find(
      (m: Material) => m.id === materialId
    );
    if (material) {
      return (getState(state).bladeThickness / material.length) * 100;
    }
    return 0;
  };
export const selectCutColor =
  (cutId: string) =>
  (state: any): string => {
    let color: string = '';
    getState(state).materials.some((material: Material) => {
      material.projects.some((project: Project) => {
        const section = project.sections.find((section) =>
          section.cuts.find((cut) => cut.id === cutId)
        );
        if (section) {
          color = section.color;
          return true;
        }
        return false;
      });
      return !!color;
    });
    return color;
  };
export const selectDescription = (state: any): string =>
  getState(state).description;
export const selectMaterial =
  (materialId: string) =>
  (state: any): Material =>
    getState(state).materials.find((m: Material) => m.id === materialId);
export const selectMaterials = (state: any): Material[] =>
  getState(state).materials;
export const selectMaterialProjects =
  (materialId: string) =>
  (state: any): Project[] =>
    getState(state).materials.find((m: Material) => m.id === materialId)
      ?.projects;
export const selectTitle = (state: any): string => getState(state).title;
export const selectTotalCuts = (state: any): number =>
  getState(state).totalCuts;
export const selectTotalLength = (state: any): number =>
  getState(state).totalLength;
export const selectMaterialLength =
  (materialId: string) =>
  (state: any): number => {
    const material = getState(state).materials.find(
      (m: Material) => m.id === materialId
    );
    if (material) {
      return material.length;
    }
    return 0;
  };
