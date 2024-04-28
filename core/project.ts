import { Cut, Section, SectionData, SectionUtils, hsl2Rgb, uuid } from '.';

export interface Project {
  id: string;
  name: string;
  sections: Section[];
  totalLength: number;
}

export interface ProjectData {
  hues: number[];
  name: string;
  sections: SectionData[];
}

export const ProjectUtils = {
  create: (name: string, sections: SectionData[], hues: number[]): Project => {
    const id = uuid();
    const project = {
      id,
      name,
      sections: sections.map((s: SectionData) => {
        const section = SectionUtils.create(
          s.name,
          s.cuts,
          s.color ?? hsl2Rgb(hues.pop()! / 360, 0.5, 0.5) // `hsl(${hues.pop()},50%,50%)`
        );
        section.totalLength = section.cuts.reduce(
          (l, cut) => l + cut.length,
          0
        );
        return section;
      }),
      totalLength: 0,
    };
    project.totalLength = project.sections.reduce(
      (l, section) => l + section.totalLength,
      0
    );
    return project;
  },
  getCuts: (project: Project): Cut[] => {
    return project.sections.map((section) => section.cuts).flat();
  },
};
