import { Wood } from '../../../core';
import { CutComponent } from './Cut';

export interface WoodComponentProps {
  wood: Wood;
}

const WoodComponent = ({ wood }: WoodComponentProps) => {
  return (
    <>
      <div className="wood">
        {wood.cuts.map((cut) => (
          <CutComponent cut={cut} key={`cut-${cut.id}`} />
        ))}
      </div>
    </>
  );
};

export { WoodComponent };
