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

  const showMiters = !!cut.miters.left || !!cut.miters.right;

  return (
    <>
      <div
        className={`cut ${showMiters ? 'angles' : ''}`}
        id={`cut-${cut.id}`}
        key={`cut-${cut.id}`}
        style={{
          backgroundColor: bgColor,
          marginRight: `${bladeThicknessPercent}%`,
          width: `${(cut.length / woodLength) * 100}%`,
        }}
      >
        <div className="cut-length">{cut.length}"</div>
        {showMiters && (
          <div className="cut-angles">
            {cut.miters.left !== 0 && (
              <span>
                {Math.abs(cut.miters.left)}&deg;{' '}
                {cut.miters.left > 0 ? '/' : cut.miters.left < 0 ? '\\' : ''}
              </span>
            )}
            {cut.miters.right !== 0 && (
              <span>
                {cut.miters.right > 0 ? '\\' : cut.miters.right < 0 ? '/' : ''}{' '}
                {Math.abs(cut.miters.right)}&deg;
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export { CutComponent };
