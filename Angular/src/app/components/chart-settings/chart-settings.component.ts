import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import type { DxFormTypes } from 'devextreme-angular/ui/form';

import { categories, seriesFields } from '../../utils/chart-data';
import type { CategoryField, SeriesField } from '../../utils/chart-data';

interface SettingsFormData {
  CategoryAxis: CategoryField;
  Series: SeriesField[];
  OnlySelected: boolean;
}

@Component({
  selector: 'app-chart-settings',
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

  get onlySelectedEditorOptions(): object {
    return {
      elementAttr: { id: 'only-selected-box' },
      value: this.onlySelected,
      disabled: !this.hasSelectedRows,
    };
  }

  get categoryEditorOptions(): object {
    return {
      items: this.categoryItems,
      value: this.currentCategory,
    };
  }

  get seriesEditorOptions(): object {
    return {
      items: this.seriesItems,
      value: this.currentSeries,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCategory'] || changes['currentSeries'] || changes['onlySelected']) {
      this.formData = {
        CategoryAxis: this.currentCategory,
        Series: [...this.currentSeries],
        OnlySelected: this.onlySelected,
      };
    }
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
