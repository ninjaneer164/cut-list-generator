import {
  Cut,
  selectBladeThicknessPercentByMaterialId,
  selectCutColor,
  selectMaterialLength,
} from '@cut-list-generator/core';
import { useSelector } from 'react-redux';

export interface CutComponentProps {
  cut: Cut;
  materialId: string;
}

const CutComponent = ({ cut, materialId }: CutComponentProps) => {
  const bgColor = useSelector(selectCutColor(cut.id));
  const bladeThicknessPercent = useSelector(
    selectBladeThicknessPercentByMaterialId(materialId)
  );
  const materialLength = useSelector(selectMaterialLength(materialId));

  const showMiters = !!cut.miters.left || !!cut.miters.right;

  return (
    <>
      <div
        className={`cut ${showMiters ? 'angles' : ''}`}
        id={`cut-${cut.id}`}
        key={`cut-${cut.id}`}
        style={{
          backgroundColor: bgColor ?? cut.color,
          marginRight: `${bladeThicknessPercent}%`,
          width: `${(cut.length / materialLength) * 100}%`,
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
