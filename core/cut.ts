import { uuid } from '.';

export interface Cut {
  color: string;
  id: string;
  isCut: boolean;
  length: number;
}

export interface CutData {
  count: number;
  length: number;
}

export const CutUtils = {
  create: (length: number, count: number, color: string): Cut[] => {
    return Array.from({ length: count ?? 1 }, () => ({
      color,
      id: uuid(),
      isCut: false,
      length,
    }));
  },
};
