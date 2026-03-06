import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import type { DxTabsTypes } from 'devextreme-angular/ui/tabs';

import { seriesTypes, defaults } from '../../utils/chart-data';
import { getIconExt, capitalizeFirst } from '../../utils/helpers';
import type { SeriesType } from '../../utils/chart-data';

@Component({
  selector: 'app-series-types-tabs',
  templateUrl: './series-types-tabs.component.html',
  styleUrls: ['./series-types-tabs.component.scss'],
})
export class SeriesTypesTabsComponent implements OnChanges {
  @Input() isSmall = false;
  @Output() seriesTypeChange = new EventEmitter<SeriesType>();

  selectedIndex = defaults.seriesTypeIndex;

  tabItems: DxTabsTypes.Item[] = seriesTypes.map((st) => ({
    text: capitalizeFirst(st),
    icon: getIconExt(st),
  }));

  get tabWidth(): number {
    return this.isSmall ? 60 : 150;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    // tabWidth is computed from isSmall, Angular re-evaluates bindings automatically
  }

  onSelectionChanged(e: DxTabsTypes.SelectionChangedEvent): void {
    const added = e.addedItems?.[0];
    if (!added) return;
    const index = this.tabItems.findIndex((item) => item.text === added.text);
    if (index !== -1) {
      this.seriesTypeChange.emit(seriesTypes[index]);
    }
  }
}
