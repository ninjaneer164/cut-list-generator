import { Component, Input } from '@angular/core';
import { Material, Project, Wood } from '@core';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
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
