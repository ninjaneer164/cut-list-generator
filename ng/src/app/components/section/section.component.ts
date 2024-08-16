import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Section } from '@core';
import { Store } from '@ngrx/store';
import { CutListActions } from '../../store/acions';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [NgStyle],
})
export class SectionComponent {
  @Input()
  public get section(): Section {
    return this._section;
  }
  public set section(value: Section) {
    this._section = value;
  }

  public get bgColor(): string {
    return this._bgColor ?? this.section.color;
  }

  private _bgColor!: string;
  private _section!: Section;

  constructor(private store: Store) {}

  public onChangeColor(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    if (color) {
      this._bgColor = color;

      this.store.dispatch(
        CutListActions.setSectionColor({
          params: { color, sectionId: this.section.id },
        })
      );
    }
  }
}
