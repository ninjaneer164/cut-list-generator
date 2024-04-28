import { CutList } from '..';

export interface CutListState extends CutList {}

export const initialState: CutListState = {
  bladeThickness: 1 / 8,
  projects: [],
  totalCuts: 0,
  totalLength: 0,
  woodLength: 144,
  woodList: [],
};
