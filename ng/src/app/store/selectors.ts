import {
  CutListState,
  selectBladeThicknessPercentByMaterialId as _selectBladeThicknessPercentByMaterialId,
  selectCutColor as _selectCutColor,
  selectDescription as _selectDescription,
  selectMaterialLength as _selectMaterialLength,
  selectMaterials as _selectMaterials,
  selectTitle as _selectTitle,
} from '@core';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCutListState =
  createFeatureSelector<CutListState>('cutList');

export const selectCutColor = (cutId: string) =>
  createSelector(selectCutListState, _selectCutColor(cutId));
export const selectBladeThicknessPercentByMaterialId = (materialId: string) =>
  createSelector(
    selectCutListState,
    _selectBladeThicknessPercentByMaterialId(materialId)
  );
export const selectDescription = createSelector(
  selectCutListState,
  _selectDescription
);
export const selectMaterialLength = (materialId: string) =>
  createSelector(selectCutListState, _selectMaterialLength(materialId));
export const selectMaterials = createSelector(
  selectCutListState,
  _selectMaterials
);
export const selectTitle = createSelector(selectCutListState, _selectTitle);

// export const selectProjects = createSelector(
//   selectCutListState,
//   (state) => state.projects
// );
// export const selectWoodList = createSelector(
//   selectCutListState,
//   (state) => state.woodList
// );
// export const selectTotalCuts = createSelector(
//   selectCutListState,
//   (state) => state.totalCuts
// );
// export const selectTotalLength = createSelector(
//   selectCutListState,
//   (state) => state.totalLength
// );
// export const selectWoodLength = createSelector(
//   selectCutListState,
//   (state) => state.woodLength
// );
