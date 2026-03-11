import type { DxChartTypes } from 'devextreme-angular/ui/chart';
import type { DxPieChartTypes } from 'devextreme-angular/ui/pie-chart';
import ArrayStore from 'devextreme/data/array_store';
import type { DataSourceOptions } from 'devextreme/data/data_source';

import type { GridDataItem } from '../data/grid-data';
import type { CategoryField, SeriesField } from './chart-data';

export type ChartDataSource = DataSourceOptions<GridDataItem, number>;

export function getDataForChart(
  allDataStore: ArrayStore<GridDataItem, number>,
  filter: unknown,
  selectedRowsData: GridDataItem[],
  onlySelected: boolean,
): ChartDataSource {
  return {
    store: onlySelected ? selectedRowsData : allDataStore,
    filter: onlySelected ? null : filter,
    paginate: false,
  };
}

export function getChartConfig(
  dataSource: ChartDataSource,
  argument: CategoryField,
  values: SeriesField[],
  seriesType: DxChartTypes.SeriesType | DxPieChartTypes.PieChartType,
  isPie: boolean,
): DxChartTypes.Properties | DxPieChartTypes.Properties {
  const series = values.map((v) => ({ valueField: v, name: v }));

  const commonConfig = {
    dataSource,
    series,
  };

  if (isPie) {
    return {
      ...commonConfig,
      type: seriesType as DxPieChartTypes.PieChartType,
      commonSeriesSettings: {
        argumentField: argument,
      },
    } as DxPieChartTypes.Properties;
  }

  return {
    ...commonConfig,
    commonSeriesSettings: {
      argumentField: argument,
      type: seriesType as DxChartTypes.SeriesType,
    },
  } as DxChartTypes.Properties;
}
