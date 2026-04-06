const chartData = {
  seriesTypes: ['line', 'area', 'bar', 'stackedbar', 'pie', 'doughnut'],
  pieSeriesTypes: ['pie', 'doughnut'],
  categories: ['Product', 'ExporterRegion'],
  series: ['ExportValue', 'TaxPaid', 'LogisticsCost'],
  defaults: {
    seriesTypeIndex: 0,
    category: 'Product',
    series: ['ExportValue', 'TaxPaid', 'LogisticsCost']
  },
};

window.chartData = chartData;
