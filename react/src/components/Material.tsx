import {
  Material,
  Project,
  Wood,
  selectMaterialProjects,
} from '@cut-list-generator/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SectionComponent } from './Section';
import { WoodComponent } from './Wood';
import { WoodStatsComponent } from './WoodStats';

export interface MaterialComponentProps {
  material: Material;
}

const MaterialComponent = ({ material }: MaterialComponentProps) => {
  const projects = useSelector(selectMaterialProjects(material.id));

  const { t } = useTranslation();

  const { totalCuts, totalLength } = material;

  return (
    <>
      <div
        className="material"
        id={`material-${material.id}`}
        key={`material-${material.id}`}
      >
        <h2>
          {material.name} ({material.length / 12}')
        </h2>
        <div className="material-stats">
          {t('numberOfCuts', { totalCuts, totalLength })}
        </div>
        <div className="material-stats">
          {t('numberOfWood', {
            woodLength: material.length / 12,
            woodCount: material.woodList.length,
            woodPercentage: (
              (totalLength / (material.length * material.woodList.length)) *
              100
            ).toFixed(2),
          })}
        </div>
        <div className="projects-wrapper">
          {projects && (
            <ol>
              {projects.map((project: Project, i: number) => (
                <li key={`project-${i}`}>
                  <div>
                    <p className="project-name">{project.name}</p>
                    <ol type="a">
                      {project.sections.map((section, j) => (
                        <li key={`section-${j}`}>
                          <SectionComponent section={section} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="cutlist-wrapper">
          <div className="wood-col">
            {material.woodList.map((wood: Wood, i: number) => (
              <WoodComponent
                key={`wood-${i}`}
                materialId={material.id}
                wood={wood}
              />
            ))}
          </div>
          <div className="stats-col">
            {material.woodList.map((wood: Wood, i: number) => (
              <WoodStatsComponent key={`wood-stats-${i}`} wood={wood} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { MaterialComponent };
