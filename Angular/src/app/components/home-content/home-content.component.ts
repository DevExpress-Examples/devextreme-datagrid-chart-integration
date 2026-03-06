import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import type { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import ArrayStore from 'devextreme/data/array_store';
import type dxDataGrid from 'devextreme/ui/data_grid';

import { GridDataService, type GridDataItem } from '../../data/grid-data';
import { getIcon } from '../../utils/helpers';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  providers:[GridDataService],
  styleUrls: ['./home-content.component.scss'],
})
export class HomeContentComponent {
  @ViewChild('gridRef') gridRef?: DxDataGridComponent;

  readonly gridDataStore = new ArrayStore<GridDataItem, number>({
    data: this.gridDataService.getData(),
    key: 'Id',
  });

  chartPopupVisible = false;
  isDataGridEmpty = false;
  hasSelectedRows = false;
  selectedRowsData: GridDataItem[] = [];

  constructor(private readonly gridDataService: GridDataService) {}

  get gridInstance(): dxDataGrid<GridDataItem, number> | undefined {
    return this.gridRef?.instance;
  }

  get generateChartButtonIcon(): string {
    return getIcon('pie', false);
  }

  get generateChartContextMenuIcon(): string {
    return getIcon('pie', true);
  }

  showChartPopup(): void {
    this.chartPopupVisible = true;
  }

  onLoadingChanged(isLoading: boolean): void {
    if (!isLoading) {
      this.isDataGridEmpty = (this.gridInstance?.totalCount() ?? 0) === 0;
    }
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
  }

  onContextMenuPreparing(e: DxDataGridTypes.ContextMenuPreparingEvent<GridDataItem, number>): void {
    if (e.target === 'content') {
      e.items = [
        {
          text: 'Generate Chart',
          icon: this.generateChartContextMenuIcon,
          disabled: this.isDataGridEmpty,
          onItemClick: () => this.showChartPopup(),
        },
      ];
    }
  }
}
