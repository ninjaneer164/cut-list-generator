import { Wood } from '@cut-list-generator/core';

export interface WoodStatsComponentProps {
  wood: Wood;
}

const WoodStatsComponent = ({ wood }: WoodStatsComponentProps) => {
  return (
    <>
      <div className="wood-stats">
        {wood.stats.map((stat, i) => (
          <span key={`wood-stat-${i}`}>{stat}</span>
        ))}
      </div>
    </>
  );
};

export { WoodStatsComponent };
