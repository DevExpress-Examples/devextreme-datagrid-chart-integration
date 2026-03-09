import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';

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
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxSwitchModule } from 'devextreme-angular/ui/switch'; 
import { DxTagBoxModule } from 'devextreme-angular/ui/tag-box';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChartPopupComponent } from './components/chart-popup/chart-popup.component';
import { ChartViewerComponent } from './components/chart-viewer/chart-viewer.component';
import { ChartSettingsComponent } from './components/chart-settings/chart-settings.component';
import { SeriesTypesTabsComponent } from './components/series-types-tabs/series-types-tabs.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartPopupComponent,
    ChartViewerComponent,
    ChartSettingsComponent,
    SeriesTypesTabsComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
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
