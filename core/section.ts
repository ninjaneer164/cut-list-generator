import { Cut, CutData, CutUtils, getRandomColor, uuid } from '.';

export interface Section {
  color: string;
  cuts: Cut[];
  id: string;
  name: string;
  totalLength: number;
}

export interface SectionData {
  color?: string;
  cuts: CutData[];
  name: string;
}

export const SectionUtils = {
  create: (name: string, cuts: CutData[], color?: string): Section => {
    const c = color ?? getRandomColor();
    const id = uuid();
    const section: Section = {
      color: c,
      cuts: cuts
        .map((cut: CutData) => {
          return CutUtils.create(cut.length, cut.count, c);
        })
        .flat(),
      id,
      name,
      totalLength: 0,
    };
    section.totalLength = section.cuts.reduce((l, cut) => l + cut.length, 0);
    return section;
  },
};
