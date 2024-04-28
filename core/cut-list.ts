import { Cut, Project, ProjectUtils, Wood, WoodData } from '.';

export interface CutList {
  bladeThickness: number;
  projects: Project[];
  totalCuts: number;
  totalLength: number;
  woodLength: number;
  woodList: Wood[];
  woodThickness: number;
}

export const CutListUtils = {
  parseJson: (data: any, bladeThickness: number = 1 / 8): CutList => {
    const woodLength = data.woodLength ?? 144;
    const woodThickness = data.woodThickness ?? 1.5;
    const nSections = data.projects.reduce(
      (n: number, p: Project) => n + p.sections.length,
      0
    );
    const d = 360 / nSections;
    const hues = Array.from({ length: nSections }, (_, i) => d * i).reverse();
    const cuts: any[] = [];
    const projects = data.projects.map((p: any) => {
      const project = ProjectUtils.create(p.name, p.sections, hues);
      project.totalLength = project.sections.reduce(
        (l, section) => l + section.totalLength,
        0
      );
      cuts.push(ProjectUtils.getCuts(project));
      return project;
    });

    const totalLength = projects.reduce(
      (l: number, project: Project) => l + project.totalLength,
      0
    );
    const count = Math.ceil(totalLength / woodLength);
    const items: Cut[] = cuts
      .flat()
      .sort((a, b) => (a.length > b.length ? 1 : a.length < b.length ? -1 : 0));
    const items_ = [...items].sort((a, b) =>
      a.length > b.length ? 1 : a.length < b.length ? -1 : 0
    );

    const woodList = Array.from(
      { length: count },
      (_, i) => new WoodData(i, woodLength, bladeThickness)
    );

    const overages: Cut[] = [];
    let idx = 0;

    while (items_.length > 0) {
      let item = items_.pop();

      if (item) {
        let fits = false;
        do {
          fits = woodList[idx++].cut(item);
          if (!fits && idx === count) {
            overages.push(item);
            fits = true;
          }
        } while (!fits);
      }

      if (idx === count) {
        idx = 0;
      }
    }

    if (overages.length > 0) {
      const wood = new WoodData(
        woodList.length,
        woodLength,
        bladeThickness,
        true
      );
      overages.forEach((overage) => wood.cut(overage));
      woodList.push(wood);
    }

    return {
      bladeThickness,
      projects,
      totalCuts: items.length,
      totalLength,
      woodLength,
      woodList: woodList.map((wood) => wood.toWood()),
      woodThickness,
    };
  },
};
