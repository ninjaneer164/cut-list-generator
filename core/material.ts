import {
  Cut,
  Project,
  ProjectData,
  ProjectUtils,
  Utils,
  Wood,
  WoodData,
} from '.';

export interface Material {
  id: string;
  length: number;
  name: string;
  projects: Project[];
  thickness: number;
  totalCuts: number;
  totalLength: number;
  width: number;
  woodList: Wood[];
}

export interface MaterialData {
  length: number;
  name: string;
  projects: ProjectData[];
  thickness: number;
  width: number;
}

export const MaterialUtils = {
  create: (data: MaterialData, bladeThickness: number): [Material, number] => {
    let nSections = 0;
    const cuts: any[] = [];
    let totalLength: number = 0;
    const material = {
      ...data,
      id: Utils.uuid(),
      projects: data.projects.map((p: any) => {
        const project = ProjectUtils.create(p.name, p.sections, data.thickness);
        nSections += project.sections.length;
        cuts.push(ProjectUtils.getCuts(project));
        totalLength += project.totalLength;
        return project;
      }),
    } as Material;
    material.totalLength = totalLength;

    const count = Math.ceil(totalLength / material.length);
    const items: Cut[] = cuts
      .flat()
      .sort((a, b) => (a.length > b.length ? 1 : a.length < b.length ? -1 : 0));
    const items_ = [...items].sort((a, b) =>
      a.length > b.length ? 1 : a.length < b.length ? -1 : 0
    );
    const woodList = Array.from(
      { length: count },
      (_, i) => new WoodData(i, material.length, bladeThickness)
    );

    material.totalCuts = items.length;

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
        material.length,
        bladeThickness,
        true
      );
      overages.forEach((overage) => wood.cut(overage));
      woodList.push(wood);
    }

    material.woodList = woodList.map((wood) => wood.toWood());

    return [material, nSections];
  },
};
