import ArrayStore from 'devextreme/data/array_store';
import type { DataSourceOptions } from 'devextreme/data/data_source';

import type { GridDataItem } from '../data/grid-data';
import type { CategoryField, SeriesField, SeriesType } from './chart-data';
import { pieSeriesTypes } from './chart-data';

export type ChartDataSource = DataSourceOptions<GridDataItem, number>;

export interface ChartConfig {
  dataSource: ChartDataSource;
  series: Array<{ valueField: string; name: string }>;
  commonSeriesSettings: {
    argumentField: string;
    type?: SeriesType;
  };
  type?: SeriesType;
}

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
  seriesType: SeriesType,
  isPie: boolean,
): ChartConfig {
  const series = values.map((v) => ({ valueField: v, name: v }));

  const commonConfig = {
    dataSource,
    series,
  };

  if (isPie) {
    return {
      ...commonConfig,
      type: seriesType,
      commonSeriesSettings: {
        argumentField: argument,
      },
    };
  }

  return {
    ...commonConfig,
    commonSeriesSettings: {
      argumentField: argument,
      type: seriesType,
    },
  };
}

export function isPieSeriesType(seriesType: SeriesType): boolean {
  return pieSeriesTypes.includes(seriesType);
}
