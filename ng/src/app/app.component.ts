import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Material, Utils } from '@core';
import json from '@core/data.json';
import en from '@core/i18n/en.json';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  CutListActions,
  selectDescription,
  selectMaterials,
  selectTitle,
} from '@store';
import Printd from 'printd';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public description: string = '';
  public materials: Material[] = [];
  public title: string = '';

  constructor(
    private store: Store,
    private translate: TranslateService
  ) {
    this.translate.setTranslation('en', en);

    this.store.dispatch(CutListActions.parseJson({ json }));

    Utils.initPrintd(new Printd());

    combineLatest([
      this.store.select(selectTitle),
      this.store.select(selectDescription),
      this.store.select(selectMaterials),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([title, description, materials]) => {
        this.title = title;
        this.description = description;
        this.materials = materials;
      });
  }

  public print(): void {
    Utils.printCutList(
      document.querySelector('.content-wrapper') as HTMLElement,
      [
        'h1, h2, li, .description, .material-stats, .project-name, .stats-col { color: black; }',
        '.section-name { color: white; }',
      ]
    );
  }
}
