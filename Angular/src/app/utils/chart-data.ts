import type { DxChartTypes } from 'devextreme-angular/ui/chart';
import type { DxPieChartTypes } from 'devextreme-angular/ui/pie-chart';

export type CategoryField = 'Product' | 'ExporterRegion';
export type SeriesField = 'ExportValue' | 'TaxPaid' | 'LogisticsCost';
export type SeriesType = DxChartTypes.SeriesType | DxPieChartTypes.PieChartType;

export const seriesTypes: SeriesType[] = ['line', 'area', 'bar', 'stackedbar', 'pie', 'doughnut'];
export const pieSeriesTypes: SeriesType[] = ['pie', 'doughnut'];
export const categories: CategoryField[] = ['Product', 'ExporterRegion'];
export const seriesFields: SeriesField[] = ['ExportValue', 'TaxPaid', 'LogisticsCost'];

export const defaults = {
  seriesTypeIndex: 0,
  category: 'Product' as CategoryField,
  series: ['ExportValue', 'TaxPaid', 'LogisticsCost'] as SeriesField[],
};
