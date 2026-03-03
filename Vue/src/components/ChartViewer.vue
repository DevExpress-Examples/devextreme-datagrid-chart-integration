<script setup lang="ts">
import { ref, computed } from 'vue';

import DxChart, { type DxChartTypes } from 'devextreme-vue/chart';
import DxPieChart, { type DxPieChartTypes } from 'devextreme-vue/pie-chart';
import type dxPieChart from 'devextreme/viz/pie_chart';
import type dxChart from 'devextreme/viz/chart';

import { pieSeriesTypes } from '../utils/chartData';
import type { CategoryField, SeriesField } from '../utils/chartData';
import type { ChartDataSource } from '../utils/chartApi';
import { getChartConfig } from '../utils/chartApi';
import type { GridDataItem } from '@/data/gridData';

interface Props {
  dataSource: ChartDataSource<GridDataItem, number>;
  seriesType: DxChartTypes.SeriesType | DxPieChartTypes.PieChartType;
  category: CategoryField;
  seriesFields: SeriesField[];
}

const props = defineProps<Props>();

const chartInstance = ref<dxChart | dxPieChart>();

const isPieChart = computed(() =>
  pieSeriesTypes.includes(props.seriesType as DxPieChartTypes.PieChartType));

const chartConfig = computed(() => {
  return getChartConfig(
    props.dataSource,
    props.category,
    props.seriesFields,
    props.seriesType,
    isPieChart.value
  );
});

function onChartInitialized(e: DxChartTypes.InitializedEvent | DxPieChartTypes.InitializedEvent) {
  chartInstance.value = e.component;
}

function exportChart(fileName: string, format: string) {
  if (chartInstance.value && typeof chartInstance.value === 'object') {
    const chart = chartInstance.value as { exportTo: (name: string, format: string) => void };
    chart.exportTo(fileName, format);
  }
}

function printChart() {
  if (chartInstance.value && typeof chartInstance.value === 'object') {
    const chart = chartInstance.value as { print: () => void };
    chart.print();
  }
}

defineExpose({
  exportChart,
  printChart,
});
</script>

<template>
  <DxChart
    class="popup-content-chart"
    v-if="!isPieChart"
    v-bind="chartConfig as any"
    @initialized="onChartInitialized"
  />
  <DxPieChart
    class="popup-content-chart"
    v-else
    v-bind="chartConfig as any"
    @initialized="onChartInitialized"
  />
</template>
<style scoped>
.popup-content-chart {
  height: calc(100% - 48px);
  width: 100%;
}
</style>
