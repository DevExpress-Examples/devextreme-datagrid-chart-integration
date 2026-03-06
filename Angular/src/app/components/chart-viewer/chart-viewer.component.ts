import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import type { DxChartTypes } from 'devextreme-angular/ui/chart';
import type { DxPieChartTypes } from 'devextreme-angular/ui/pie-chart';
import { DxChartComponent } from 'devextreme-angular/ui/chart';
import { DxPieChartComponent } from 'devextreme-angular/ui/pie-chart';
import type dxChart from 'devextreme/viz/chart';
import type dxPieChart from 'devextreme/viz/pie_chart';

import { pieSeriesTypes, seriesTypes, defaults } from '../../utils/chart-data';
import { getChartConfig } from '../../utils/chart-api';
import type { CategoryField, SeriesField, SeriesType } from '../../utils/chart-data';
import type { ChartDataSource } from '../../utils/chart-api';

@Component({
  selector: 'app-chart-viewer',
  templateUrl: './chart-viewer.component.html',
  styleUrls: ['./chart-viewer.component.scss'],
})
export class ChartViewerComponent implements OnChanges {
  @Input() dataSource: ChartDataSource = { store: [], paginate: false };
  @Input() seriesType: SeriesType = seriesTypes[defaults.seriesTypeIndex];
  @Input() category: CategoryField = defaults.category;
  @Input() seriesFields: SeriesField[] = [...defaults.series];

  @ViewChild('chartRef') chartRef?: DxChartComponent;
  @ViewChild('pieChartRef') pieChartRef?: DxPieChartComponent;

  isPieChart = false;
  chartConfig: DxChartTypes.Properties | DxPieChartTypes.Properties = {};

  ngOnChanges(_changes: SimpleChanges): void {
    this.isPieChart = pieSeriesTypes.includes(this.seriesType);
    this.chartConfig = getChartConfig(
      this.dataSource,
      this.category,
      this.seriesFields,
      this.seriesType,
      this.isPieChart,
    );
  }

  exportChart(fileName: string, format: string): void {
    const instance = this.getChartInstance();
    instance?.exportTo(fileName, format);
  }

  printChart(): void {
    const instance = this.getChartInstance();
    instance?.print();
  }

  private getChartInstance(): dxChart | dxPieChart | undefined {
    if (this.isPieChart) {
      return this.pieChartRef?.instance;
    }
    return this.chartRef?.instance;
  }
}
