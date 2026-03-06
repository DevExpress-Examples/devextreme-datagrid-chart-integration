import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { ChartPopupComponent } from './components/chart-popup/chart-popup.component';
import { ChartViewerComponent } from './components/chart-viewer/chart-viewer.component';
import { ChartSettingsComponent } from './components/chart-settings/chart-settings.component';
import { SeriesTypesTabsComponent } from './components/series-types-tabs/series-types-tabs.component';
import { DxSelectBoxModule, DxSwitchModule, DxTagBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeContentComponent,
    ChartPopupComponent,
    ChartViewerComponent,
    ChartSettingsComponent,
    SeriesTypesTabsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxChartModule,
    DxPieChartModule,
    DxPopupModule,
    DxTagBoxModule,
    DxSelectBoxModule,
    DxSwitchModule,
    DxPopoverModule,
    DxTabsModule,
    DxToolbarModule,
    DxFormModule,
    DxDropDownButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
