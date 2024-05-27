import {
  CutListData,
  CutListUtils,
  SetSectionColorActionProps,
  Utils,
  initialState,
} from '@cut-list-generator/core';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const cutListSlice = createSlice({
  name: 'cutList',
  initialState,
  reducers: {
    parseJson: (state, action: PayloadAction<CutListData>) => {
      const {
        bladeThickness,
        description,
        materials,
        title,
        totalCuts,
        totalLength,
      } = CutListUtils.parseJson(action.payload);

      state.bladeThickness = bladeThickness;
      state.description = description;
      state.materials = materials;
      state.title = title;
      state.totalCuts = totalCuts;
      state.totalLength = totalLength;
    },
    setSectionColor: (
      state,
      action: PayloadAction<SetSectionColorActionProps>
    ) => {
      const {
        payload: { color, sectionId },
      } = action;
      state.materials = Utils.setSectionColor(
        state.materials,
        sectionId,
        color
      );
    },
  },
});

export const { parseJson, setSectionColor } = cutListSlice.actions;

export default cutListSlice.reducer;
