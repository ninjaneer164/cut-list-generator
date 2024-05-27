import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Wood, selectBladeThicknessPercentByMaterialId } from '@core';
import { Store } from '@ngrx/store';
import { selectMaterialLength } from '@store';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-wood',
  templateUrl: './wood.component.html',
  styleUrls: ['./wood.component.scss'],
})
export class WoodComponent implements OnInit {
  @Input()
  public materialId!: string;
  @Input()
  public wood!: Wood;

  public bladeThicknessPercent: number = 0;

  public get paddingRight(): string {
    return `${this.bladeThicknessPercent}%`;
  }

  private destroyRef = inject(DestroyRef);
  private materialLength: number = 0;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    combineLatest([
      this.store.select(
        selectBladeThicknessPercentByMaterialId(this.materialId)
      ),
      this.store.select(selectMaterialLength(this.materialId)),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([bladeThicknessPercent, materialLength]) => {
        this.bladeThicknessPercent = bladeThicknessPercent;
        this.materialLength = materialLength;
      });
  }

  public getCutWidthPercent(length: number): string {
    return `${(length / this.materialLength) * 100}%`;
  }
}
