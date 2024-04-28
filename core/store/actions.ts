const actionPrefix = '[CutList]';

export const CutListActionName = {
  parseJson: `${actionPrefix} parseJson`,
  print: `${actionPrefix} print`,
  setSectionColor: `${actionPrefix} setSectionColor`,
};

export interface SetSectionColorActionProps {
  color: string;
  sectionId: string;
}
