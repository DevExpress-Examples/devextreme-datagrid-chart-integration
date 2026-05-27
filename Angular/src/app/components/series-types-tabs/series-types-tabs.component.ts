import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import type { DxTabsTypes } from 'devextreme-angular/ui/tabs';

import { seriesTypes, defaults } from '../../utils/chart-data';
import { getIconExt, capitalizeFirst } from '../../utils/helpers';
import type { SeriesType } from '../../utils/chart-data';
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

@Component({
  selector: 'app-series-types-tabs',
  imports: [DxDataGridModule, DxButtonModule, DxChartModule, DxPieChartModule, DxPopupModule, DxPopoverModule, DxTabsModule, DxToolbarModule, DxFormModule, DxDropDownButtonModule, DxSelectBoxModule, DxSwitchModule, DxTagBoxModule],
  templateUrl: './series-types-tabs.component.html',
  styleUrls: ['./series-types-tabs.component.scss'],
})
export class SeriesTypesTabsComponent  {
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

  onSelectionChanged(e: DxTabsTypes.SelectionChangedEvent): void {
    const added = e.addedItems?.[0];
    if (!added) return;
    const index = this.tabItems.findIndex((item) => item.text === added.text);
    if (index !== -1) {
      this.seriesTypeChange.emit(seriesTypes[index]);
    }
  }
}
