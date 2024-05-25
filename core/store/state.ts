import { CutList } from '..';

export interface CutListState extends CutList { }

export const initialState: CutListState = {
  bladeThickness: 1 / 8,
  description: '',
  materials: [],
  title: '',
  totalCuts: 0,
  totalLength: 0,
};
