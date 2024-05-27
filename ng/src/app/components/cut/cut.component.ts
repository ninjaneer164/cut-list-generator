import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cut, selectCutColor } from '@core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-cut',
  templateUrl: './cut.component.html',
  styleUrls: ['./cut.component.scss'],
})
export class CutComponent implements OnInit {
  @Input()
  public cut!: Cut;
  @Input()
  public materialId!: string;

  public bgColor!: string;

  public get backgroundColor(): string {
    return this.bgColor ?? this.cut.color;
  }
  public get showMiters(): boolean {
    return !!this.cut.miters.left || !!this.cut.miters.right;
  }

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    combineLatest([this.store.select(selectCutColor(this.cut.id))])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([bgColor]) => {
        this.bgColor = bgColor;
      });
  }
}
