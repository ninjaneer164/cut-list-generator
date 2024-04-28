import {
  CutListUtils,
  SetSectionColorActionProps,
  initialState,
} from '@cut-list-generator/core';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const cutListSlice = createSlice({
  name: 'cutList',
  initialState,
  reducers: {
    parseJson: (state, action: PayloadAction<unknown>) => {
      const {
        bladeThickness,
        projects,
        totalCuts,
        totalLength,
        woodLength,
        woodList,
      } = CutListUtils.parseJson(action.payload);
      state.bladeThickness = bladeThickness;
      state.projects = projects;
      state.totalCuts = totalCuts;
      state.totalLength = totalLength;
      state.woodLength = woodLength;
      state.woodList = woodList;
    },
    setSectionColor: (
      state,
      action: PayloadAction<SetSectionColorActionProps>
    ) => {
      const {
        payload: { color, sectionId },
      } = action;
      state.projects.some((project) => {
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
    },
  },
});

export const { parseJson, setSectionColor } = cutListSlice.actions;

export default cutListSlice.reducer;
