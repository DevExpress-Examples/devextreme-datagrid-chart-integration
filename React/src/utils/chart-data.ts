import type { ChartTypes } from 'devextreme-react/chart';
import type { PieChartTypes } from 'devextreme-react/pie-chart';

export type CategoryField = 'Product' | 'ExporterRegion';
export type SeriesField = 'ExportValue' | 'TaxPaid' | 'LogisticsCost';
export type SeriesType = ChartTypes.SeriesType | PieChartTypes.PieChartType

export const seriesTypes: SeriesType[] = ['line', 'area', 'bar', 'stackedbar', 'pie', 'doughnut'];
export const pieSeriesTypes: SeriesType[] = ['pie', 'doughnut'];
export const categories: CategoryField[] = ['Product', 'ExporterRegion'];
export const seriesFields: SeriesField[] = ['ExportValue', 'TaxPaid', 'LogisticsCost'];

export const defaults = {
  seriesTypeIndex: 0,
  category: 'Product' as CategoryField,
  series: ['ExportValue', 'TaxPaid', 'LogisticsCost'] as SeriesField[],
};
