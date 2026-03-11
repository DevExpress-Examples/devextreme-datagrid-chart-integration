import type { GridDataItem } from '../data/gridData';
import type { CategoryField, SeriesField } from './chartData';

import type { DxChartTypes } from 'devextreme-vue/chart';
import type dxDataGrid from 'devextreme/ui/data_grid';
import type { DxPieChartTypes } from 'devextreme-vue/pie-chart';
import type { DataSource, DataSourceOptions } from 'devextreme/common/data';

export type ChartDataSource<TItem = any, TKey = any> = DataSource<TItem, TKey> | DataSourceOptions<TItem, TKey> | undefined;

function getDataForChart(
  gridInstance: dxDataGrid,
  onlySelected: boolean
): ChartDataSource<GridDataItem, number> {
  return {
    store: onlySelected ? gridInstance.getSelectedRowsData() : gridInstance.getDataSource()?.store(),
    filter: onlySelected ? null : gridInstance.getCombinedFilter(true),
    paginate: false,
  };
}

function getChartConfig(
  dataSource: ChartDataSource,
  argument: CategoryField,
  values: SeriesField[],
  seriesType: DxChartTypes.SeriesType | DxPieChartTypes.PieChartType,
  isPie: boolean
): DxChartTypes.Properties | DxPieChartTypes.Properties {
  const series = values.map(v => ({
    valueField: v,
    name: v
  }));

  const commonConfig = {
    dataSource,
    series,
    legend: {
      verticalAlignment: 'bottom' as const,
      horizontalAlignment: 'center' as const,
      columnItemSpacing: 24,
      itemTextPosition: 'right' as const,
    },
    animation: { enabled: false }
  };

  if (isPie) {
    return {
      ...commonConfig,
      type: seriesType as DxPieChartTypes.PieChartType,
      commonSeriesSettings: {
        argumentField: argument,
      }
    } as DxPieChartTypes.Properties;
  } else {
    return {
      ...commonConfig,
      commonSeriesSettings: {
        argumentField: argument,
        type: seriesType as DxChartTypes.SeriesType,
      },
      argumentAxis: {
        label: {
          displayMode: 'rotate' as const,
          rotationAngle: 45,
        },
      },
      valueAxis: {
        visible: false,
        tick: { visible: false }
      },
    } as DxChartTypes.Properties;
  }
}

export { getDataForChart, getChartConfig };
