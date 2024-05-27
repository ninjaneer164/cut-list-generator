import { CutListUtils, Utils, initialState } from '@core';
import { createReducer, on } from '@ngrx/store';
import { CutListActions } from './acions';

export const cutListReducer = createReducer(
  initialState,
  on(CutListActions.parseJson, (state, { json }) => {
    const {
      bladeThickness,
      description,
      materials,
      title,
      totalCuts,
      totalLength,
    } = CutListUtils.parseJson(json);
    return {
      ...state,
      bladeThickness,
      description,
      materials,
      title,
      totalCuts,
      totalLength,
    };
  }),
  on(
    CutListActions.setSectionColor,
    (state, { params: { color, sectionId } }) => {
      return {
        ...state,
        materials: Utils.setSectionColor(state.materials, sectionId, color),
      };
    }
  )
);
