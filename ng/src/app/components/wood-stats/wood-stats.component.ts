import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Wood } from '@core';

@Component({
  selector: 'app-wood-stats',
  templateUrl: './wood-stats.component.html',
  styleUrls: ['./wood-stats.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WoodStatsComponent {
  @Input()
  public wood!: Wood;
}
