import {
  Cut,
  selectBladeThicknessPercent,
  selectCutColor,
  selectWoodLength,
} from '@cut-list-generator/core';
import { useSelector } from 'react-redux';

export interface CutComponentProps {
  cut: Cut;
}

const CutComponent = ({ cut }: CutComponentProps) => {
  const bgColor = useSelector(selectCutColor(cut.id));
  const bladeThicknessPercent = useSelector(selectBladeThicknessPercent);
  const woodLength = useSelector(selectWoodLength);

  return (
    <>
      <div
        className="cut"
        id={`cut-${cut.id}`}
        key={`cut-${cut.id}`}
        style={{
          backgroundColor: bgColor,
          marginRight: `${bladeThicknessPercent}%`,
          width: `${(cut.length / woodLength) * 100}%`,
        }}
      >
        <span>{cut.length}"</span>
      </div>
    </>
  );
};

export { CutComponent };
