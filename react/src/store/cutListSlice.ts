import {
  CutListData,
  CutListUtils,
  SetSectionColorActionProps,
  initialState
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
      state.materials.forEach((material) => {
        material.projects.some((project) => {
          const section = project.sections.find(
            (section) => section.id === sectionId
          );
          if (section) {
            section.color = color;
            section.cuts.forEach((cut) => {
              cut.color = color;
            });
            return true;
          }
          return false;
        });
      })
      return;
    },
  },
});

export const { parseJson, setSectionColor } = cutListSlice.actions;

export default cutListSlice.reducer;
