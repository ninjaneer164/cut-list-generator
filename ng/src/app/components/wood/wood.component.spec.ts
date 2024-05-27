/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WoodComponent } from './wood.component';

describe('WoodComponent', () => {
  let component: WoodComponent;
  let fixture: ComponentFixture<WoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WoodComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
