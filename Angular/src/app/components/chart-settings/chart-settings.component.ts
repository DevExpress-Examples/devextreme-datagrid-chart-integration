import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import type { DxFormTypes } from 'devextreme-angular/ui/form';

import { categories, seriesFields } from '../../utils/chart-data';
import type { CategoryField, SeriesField } from '../../utils/chart-data';
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

interface SettingsFormData {
  CategoryAxis: CategoryField;
  Series: SeriesField[];
  OnlySelected: boolean;
}

@Component({
  selector: 'app-chart-settings',
  imports: [DxDataGridModule, DxButtonModule, DxChartModule, DxPieChartModule, DxPopupModule, DxPopoverModule, DxTabsModule, DxToolbarModule, DxFormModule, DxDropDownButtonModule, DxSelectBoxModule, DxSwitchModule, DxTagBoxModule],
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.scss'],
})
export class ChartSettingsComponent implements OnChanges {
  @Input() onlySelected = false;
  @Input() hasSelectedRows = false;
  @Input() currentCategory: CategoryField = 'Product';
  @Input() currentSeries: SeriesField[] = ['ExportValue', 'TaxPaid', 'LogisticsCost'];

  @Output() categoryChange = new EventEmitter<CategoryField>();
  @Output() seriesChange = new EventEmitter<SeriesField[]>();
  @Output() onlySelectedChange = new EventEmitter<boolean>();

  readonly categoryItems = categories;
  readonly seriesItems = seriesFields;

  formData: SettingsFormData = {
    CategoryAxis: this.currentCategory,
    Series: [...this.currentSeries],
    OnlySelected: this.onlySelected,
  };

  onlySelectedEditorOptions = this.buildOnlySelectedEditorOptions();

  readonly categoryEditorOptions = {
    items: this.categoryItems,
    value: this.currentCategory,
  };

  readonly seriesEditorOptions = {
    items: this.seriesItems,
    value: this.currentSeries,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onlySelected'] || changes['hasSelectedRows']) {
      this.onlySelectedEditorOptions = this.buildOnlySelectedEditorOptions();
    }
  }

  private buildOnlySelectedEditorOptions(): object {
    return {
      elementAttr: { id: 'only-selected-box' },
      value: this.onlySelected,
      disabled: !this.hasSelectedRows,
    };
  }
  
  onFieldDataChanged(e: DxFormTypes.FieldDataChangedEvent): void {
    if (e.dataField === 'CategoryAxis' && typeof e.value === 'string') {
      this.categoryChange.emit(e.value as CategoryField);
    } else if (e.dataField === 'Series' && Array.isArray(e.value)) {
      this.seriesChange.emit(e.value as SeriesField[]);
    } else if (e.dataField === 'OnlySelected' && typeof e.value === 'boolean') {
      this.onlySelectedChange.emit(e.value);
    }
  }
}
