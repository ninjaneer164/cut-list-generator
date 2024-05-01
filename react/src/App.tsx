import {
  Project,
  Wood,
  initPrintd,
  printCutList,
  selectProjects,
  selectTotalCuts,
  selectTotalLength,
  selectWoodLength,
  selectWoodList,
} from '@cut-list-generator/core';
import * as data from '@cut-list-generator/core/data.json';
import Printd from 'printd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './App.css';
import { SectionComponent } from './components/Section';
import { WoodComponent } from './components/Wood';
import { WoodStatsComponent } from './components/WoodStats';
import { parseJson } from './store/cutListSlice';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const projects = useSelector(selectProjects);
  const woodList = useSelector(selectWoodList);
  const totalCuts = useSelector(selectTotalCuts);
  const totalLength = useSelector(selectTotalLength);
  const woodLength = useSelector(selectWoodLength);

  const [woodLengthFt, setWoodLengthFt] = useState<string>('0');
  const [woodListLength, setWoodListLength] = useState<string>('0');
  const [woodPercentage, setWoodPercentage] = useState<string>('0');

  useEffect(() => {
    initPrintd(new Printd());

    dispatch(parseJson(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setWoodLengthFt((woodLength / 12).toString());
    setWoodListLength(woodList.length.toString());
    setWoodPercentage(
      ((totalLength / (woodLength * woodList.length)) * 100).toFixed(2)
    );
  }, [totalLength, woodLength, woodList]);

  const print = () => {
    printCutList(document.querySelector('.content-wrapper') as HTMLElement);
  };

  return (
    <main>
      <div className="content-wrapper">
        <div>{t('numberOfCuts', { totalCuts, totalLength })}</div>
        <div>
          {t('numberOfWood', {
            woodLength: woodLengthFt,
            woodCount: woodListLength,
            woodPercentage,
          })}
        </div>
        <div>
          {projects && (
            <ol>
              {projects.map((project: Project, i: number) => (
                <li key={`project-${i}`}>
                  <div>
                    <p>{project.name}</p>
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
            {woodList &&
              woodList.map((wood: Wood, i: number) => (
                <WoodComponent key={`wood-${i}`} wood={wood} />
              ))}
          </div>
          <div className="stats-col">
            {woodList &&
              woodList.map((wood: Wood, i: number) => (
                <WoodStatsComponent key={`wood-stats-${i}`} wood={wood} />
              ))}
          </div>
        </div>
      </div>
      <div>
        <button onClick={print}>{t('print')}</button>
      </div>
    </main>
  );
}

export default App;
