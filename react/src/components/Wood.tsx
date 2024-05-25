import { Wood } from '@cut-list-generator/core';
import { CutComponent } from './Cut';

export interface WoodComponentProps {
  materialId: string;
  wood: Wood;
}

const WoodComponent = ({ materialId, wood }: WoodComponentProps) => {
  return (
    <>
      <div className="wood">
        {wood.cuts.map((cut) => (
          <CutComponent
            cut={cut}
            key={`cut-${cut.id}`}
            materialId={materialId}
          />
        ))}
      </div>
    </>
  );
};

export { WoodComponent };
