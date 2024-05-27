import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CutComponent,
  MaterialComponent,
  SectionComponent,
  WoodComponent,
  WoodStatsComponent,
} from '@components';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { cutListReducer } from '@store';
import { AppComponent } from './app.component';

const components = [
  AppComponent,
  CutComponent,
  MaterialComponent,
  SectionComponent,
  WoodComponent,
  WoodStatsComponent,
];
const ngModules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
];
const modules = [
  TranslateModule.forRoot({
    defaultLanguage: 'en',
  }),
];
const stores = [
  StoreModule.forRoot({}),

  StoreModule.forFeature('cutList', cutListReducer),
];

@NgModule({
  declarations: [...components],
  imports: [...ngModules, ...modules, ...stores],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
