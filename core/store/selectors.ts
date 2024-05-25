import { CutListState, Material, Project } from '..';

export const selectCutListState = (state: any): CutListState => state.cutList;

export const selectBladeThicknessPercentByMaterialId = (materialId: string) => (state: any): number => {
  const material = state.cutList.materials.find((m: Material) => m.id === materialId);
  if (material) {
    return (state.cutList.bladeThickness / material.length) * 100;
  }
  return 0;
}
export const selectCutColor = (cutId: string) => (state: any): string => {
  let color: string = '';
  state.cutList.materials.some((material: Material) => {
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
export const selectDescription = (state: any): string => state.cutList.description;
export const selectMaterial = (materialId: string) => (state: any): Material => state.cutList.materials.find((m: Material) => m.id === materialId);
export const selectMaterials = (state: any): Material[] => state.cutList.materials;
export const selectMaterialProjects = (materialId: string) => (state: any): Project[] => state.cutList.materials.find((m: Material) => m.id === materialId)?.projects;
export const selectTitle = (state: any): string => state.cutList.title;
export const selectTotalCuts = (state: any): number => state.cutList.totalCuts;
export const selectTotalLength = (state: any): number => state.cutList.totalLength;
export const selectMaterialLength = (materialId: string) => (state: any): number => {
  const material = state.cutList.materials.find((m: Material) => m.id === materialId);
  if (material) {
    return material.length;
  }
  return 0;
};
