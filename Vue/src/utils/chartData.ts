import type { DxPieChartTypes } from "devextreme-vue/pie-chart";
import type { DxChartTypes } from "devextreme-vue/chart";

export type CategoryField = 'Product' | 'ExporterRegion';
export type SeriesField = 'ExportValue' | 'TaxPaid' | 'LogisticsCost';
export type SeriesType = DxChartTypes.SeriesType | DxPieChartTypes.PieChartType;  

const seriesTypes: SeriesType[] = ['line', 'area', 'bar', 'stackedbar', 'pie', 'doughnut'];
const pieSeriesTypes: SeriesType[] = ['pie', 'doughnut'];
const categories: CategoryField[] = ['Product', 'ExporterRegion'];
const seriesFields: SeriesField[] = ['ExportValue', 'TaxPaid', 'LogisticsCost'];

const defaults = {
  seriesTypeIndex: 0,
  category: 'Product' as CategoryField,
  series: ['ExportValue', 'TaxPaid', 'LogisticsCost'] as SeriesField[]
};

export { seriesTypes, pieSeriesTypes, categories, seriesFields, defaults };
