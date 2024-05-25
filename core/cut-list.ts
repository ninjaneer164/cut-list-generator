import { Material, MaterialData, MaterialUtils } from '.';

export interface CutList {
  bladeThickness: number;
  description?: string;
  materials: Material[];
  title?: string;
  totalCuts: number;
  totalLength: number;
}

export interface CutListData {
  description?: string;
  materials: MaterialData[];
  title?: string;
}

export const CutListUtils = {
  parseJson: (data: CutListData, bladeThickness: number = 1 / 8): CutList => {
    const { description, title } = data;

    let nSections = 0;
    let totalCuts = 0;
    let totalLength = 0;

    const materials = data.materials.map((m: MaterialData) => {
      const [material, ns] = MaterialUtils.create(m, bladeThickness);
      nSections += ns;
      totalCuts += material.totalCuts;
      totalLength += material.totalLength;
      return material;
    });

    const d = 360 / nSections;
    const hues = Array.from({ length: nSections }, (_, i) => d * i).reverse();

    return {
      bladeThickness,
      description,
      materials,
      title,
      totalCuts,
      totalLength,
    };
  },
};
