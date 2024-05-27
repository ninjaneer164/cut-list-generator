/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WoodStatsComponent } from './wood-stats.component';

describe('WoodStatsComponent', () => {
  let component: WoodStatsComponent;
  let fixture: ComponentFixture<WoodStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WoodStatsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
