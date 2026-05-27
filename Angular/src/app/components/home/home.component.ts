import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {DxDataGridComponent, DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import { DataSource } from 'devextreme-angular/common/data';
import ArrayStore from 'devextreme/data/array_store';
import type { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

import { GridDataService, type GridDataItem } from '../../data/grid-data';
import { getIcon } from '../../utils/helpers';
import { getDataForChart } from '../../utils/chart-api';
import type { ChartDataSource } from '../../utils/chart-api';
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



@Component({
  selector: 'app-home',
  imports: [DxDataGridModule, DxButtonModule, DxChartModule, DxPieChartModule, DxPopupModule, DxPopoverModule, DxTabsModule, DxToolbarModule, DxFormModule, DxDropDownButtonModule, DxSelectBoxModule, DxSwitchModule, DxTagBoxModule],
  templateUrl: './home.component.html',
  providers: [GridDataService],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('gridRef', { static: false }) gridRef?: DxDataGridComponent;

  private readonly dataStore: ArrayStore<GridDataItem, number>;
  gridDataSource: DataSource<GridDataItem, number>;
  chartData: ChartDataSource = { store: [], paginate: false };
  chartPopupVisible = false;
  isDataGridEmpty = false;
  hasSelectedRows = false;
  onlySelected = false;
  selectedRowsData: GridDataItem[] = [];

  constructor(private readonly gridDataService: GridDataService, private readonly sanitizer: DomSanitizer) {
    this.dataStore = new ArrayStore<GridDataItem, number>({
      data: this.gridDataService.getData(),
      key: 'Id',
    });
    this.gridDataSource = new DataSource<GridDataItem, number>({
      store: this.dataStore,
      onChanged: () => {
        this.isDataGridEmpty = (this.gridRef?.instance.totalCount() ?? 0) === 0;
        this.updateChartData();
      },
    });
  }

  private updateChartData(): void {
    const filter = this.gridRef?.instance.getCombinedFilter(true) ?? null;
    this.chartData = getDataForChart(this.dataStore, filter, this.selectedRowsData, this.onlySelected);
  }

  get generateChartButtonIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(getIcon('pie', false));
  }

  showChartPopup(): void {
    this.chartPopupVisible = true;
  }

  onRowClick(e: DxDataGridTypes.RowClickEvent<GridDataItem, number>): void {
    if (e.component.isRowSelected(e.key)) {
      e.component.deselectRows([e.key]);
    } else {
      e.component.selectRows([e.key], true);
    }
  }

  onSelectionChanged(e: DxDataGridTypes.SelectionChangedEvent<GridDataItem, number>): void {
    this.hasSelectedRows = e.component.getSelectedRowsData().length > 0;
    this.selectedRowsData = e.component.getSelectedRowsData();
    this.onlySelected = this.hasSelectedRows;
    this.updateChartData();
  }

  onVisibleChange(visible: boolean): void {
    this.chartPopupVisible = visible ?? false;
  }

  onOnlySelectedChange(onlySelected: boolean): void {
    this.onlySelected = onlySelected;
    this.updateChartData();
  }

  onContextMenuPreparing(e: DxDataGridTypes.ContextMenuPreparingEvent<GridDataItem, number>): void {
    if (e.target === 'content') {
      e.items = [
        {
          text: 'Generate Chart',
          icon: getIcon('pie', true),
          disabled: this.isDataGridEmpty,
          onItemClick: () => this.showChartPopup(),
        },
      ];
    }
  }
}
