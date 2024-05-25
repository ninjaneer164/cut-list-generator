import {
  CutListData,
  initPrintd,
  printCutList,
  selectDescription,
  selectMaterials,
  selectTitle,
} from '@cut-list-generator/core';
import * as data from '@cut-list-generator/core/data.json';
import Printd from 'printd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './App.css';
import { MaterialComponent } from './components/Material';
import { parseJson } from './store/cutListSlice';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const materials = useSelector(selectMaterials);

  useEffect(() => {
    initPrintd(new Printd());

    dispatch(parseJson(data as CutListData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const print = () => {
    printCutList(document.querySelector('.content-wrapper') as HTMLElement, [
      'h1, h2, li, .description, .material-stats, .project-name, .stats-col { color: black; }',
      '.section-name { color: white; }',
    ]);
  };

  return (
    <main>
      <div className="content-wrapper">
        {title && <h1>{title}</h1>}
        {description && <p className="description">{description}</p>}
        <div className="materials-wrapper">
          {materials &&
            materials.map((material, i) => (
              <div className="material-wrapper" key={`material-${i}`}>
                <MaterialComponent material={material} />
              </div>
            ))}
        </div>
      </div>
      <div>
        <button onClick={print}>{t('print')}</button>
      </div>
    </main>
  );
}

export default App;
