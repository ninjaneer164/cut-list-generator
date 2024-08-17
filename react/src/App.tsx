import {
  CutListData,
  selectDescription,
  selectMaterials,
  selectTitle,
} from '@cut-list-generator/core';
import * as data from '@cut-list-generator/core/data.json';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './App.css';
import { MaterialComponent } from './components/Material';
import { parseJson } from './store/cutListSlice';
import { useAppDispatch } from './store/hooks';

import Printd from 'printd';
import appStyles from '../../core/styles.css?inline';

function App() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const materials = useSelector(selectMaterials);

  useEffect(() => {
    dispatch(parseJson(data as CutListData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const print = () => {
    const printd = new Printd();
    const element = document.querySelector('.content-wrapper') as HTMLElement;
    const styles = [
      'h1, h2, li, .description, .material-stats, .project-name, .stats-col { color: black; }',
      '.material-wrapper { border-color: black; }',
      '.section-name { color: white; }',
    ];
    printd.print(element, [appStyles, ...styles]);
  };

  return (
    <main>
      <div className="content-wrapper">
        {title && <h1 className="mb-2">{title}</h1>}
        {description && <p className="description mb-4">{description}</p>}
        <div className="materials-wrapper">
          {materials &&
            materials.map((material, i) => (
              <div className="material-wrapper" key={`material-${i}`}>
                <MaterialComponent material={material} />
              </div>
            ))}
        </div>
      </div>
      <div className="mt-4">
        <button onClick={print}>{t('print')}</button>
      </div>
    </main>
  );
}

export default App;
