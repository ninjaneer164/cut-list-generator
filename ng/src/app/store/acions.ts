import { CutListActionName, SetSectionColorActionProps } from '@core';
import { createAction, props } from '@ngrx/store';

export namespace CutListActions {
  export const parseJson = createAction(
    CutListActionName.parseJson,
    props<{ json: any }>()
  );
  export const setSectionColor = createAction(
    CutListActionName.setSectionColor,
    props<{ params: SetSectionColorActionProps }>()
  );
}
