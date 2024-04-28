import { deg2rad, uuid } from '.';

export interface Cut {
  color: string;
  id: string;
  isCut: boolean;
  length: number;
  miters: CutMiters;
}

export interface CutMiters {
  left: number;
  right: number;
}

export interface CutData {
  count: number;
  length: number;
  miters?: CutMiters;
}

export const CutUtils = {
  create: (
    length: number,
    count: number,
    color: string,
    woodThickness: number,
    miters?: CutMiters
  ): Cut[] => {
    const _ = (a: number): number => {
      return a && a > 0
        ? Math.ceil(woodThickness * Math.tan(deg2rad(a)) * 2) / 2
        : 0;
    };
    const l = _(miters?.left!);
    const r = _(miters?.right!);

    return Array.from({ length: count ?? 1 }, () => ({
      miters: {
        left: miters?.left ?? 0,
        right: miters?.right ?? 0,
      },
      color,
      id: uuid(),
      isCut: false,
      length: length + l + r,
    }));
  },
};
