import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Material, Project, Wood } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from '../section/section.component';
import { WoodStatsComponent } from '../wood-stats/wood-stats.component';
import { WoodComponent } from '../wood/wood.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SectionComponent,
    WoodComponent,
    WoodStatsComponent,
  ],
})
export class MaterialComponent {
  @Input()
  public material!: Material;

  public get projects(): Project[] {
    return this.material?.projects ?? [];
  }
  public get woodList(): Wood[] {
    return this.material?.woodList ?? [];
  }
}
