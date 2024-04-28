import Printd from 'printd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
} from '../../core';
import * as data from '../../core/data.json';
import './App.css';
import { SectionComponent } from './components/Section';
import { WoodComponent } from './components/Wood';
import { WoodStatsComponent } from './components/WoodStats';
import { parseJson } from './store/cutListSlice';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();

  const projects = useSelector(selectProjects);
  const woodList = useSelector(selectWoodList);
  const totalCuts = useSelector(selectTotalCuts);
  const totalLength = useSelector(selectTotalLength);
  const woodLength = useSelector(selectWoodLength);
  const woodPercentage = (
    (totalLength / (woodLength * woodList.length)) *
    100
  ).toFixed(2);

  useEffect(() => {
    initPrintd(new Printd());

    dispatch(parseJson(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const print = () => {
    printCutList(document.querySelector('.content-wrapper') as HTMLElement);
  };

  return (
    <main>
      <div className="content-wrapper">
        <div>
          Number of cuts: {totalCuts} ({totalLength}")
        </div>
        <div>
          Number of wood ({woodLength / 12}'): {woodList.length} (
          {woodPercentage}%)
        </div>
        <div>
          {projects &&
            projects.map((project: Project, i: number) => (
              <div key={`project-${i}`}>
                <p>{project.name}</p>
                <ol>
                  {project.sections.map((section, j) => (
                    <li key={`section-${j}`}>
                      <SectionComponent section={section} />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
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
        <button onClick={print}>Print</button>
      </div>
    </main>
  );
}

export default App;
