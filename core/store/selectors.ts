import { Project } from '..';

export const selectCutColor = (cutId: string) => (state: any) => {
  let color: string = '';
  state.cutList.projects.some((project: Project) => {
    const section = project.sections.find((section) =>
      section.cuts.find((cut) => cut.id === cutId)
    );
    if (section) {
      color = section.color;
      return true;
    }
    return false;
  });
  return color;
};
export const selectProjects = (state: any) => state.cutList.projects;
export const selectTotalCuts = (state: any) => state.cutList.totalCuts;
export const selectTotalLength = (state: any) => state.cutList.totalLength;
export const selectWoodLength = (state: any) => state.cutList.woodLength;
export const selectWoodList = (state: any) => state.cutList.woodList;
export const selectBladeThicknessPercent = (state: any) =>
  (state.cutList.bladeThickness / state.cutList.woodLength) * 100;
