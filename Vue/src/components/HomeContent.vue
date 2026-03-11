<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue';

import 'devextreme/dist/css/dx.fluent.blue.light.css';
import DxDataGrid, {
  DxColumn,
  DxToolbar,
  DxItem as DxToolbarItem,
  DxSelection,
  DxHeaderFilter,
  DxFilterRow,
  DxPaging
} from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import { DataSource, ArrayStore } from 'devextreme-vue/common/data';

import type { DxDataGridTypes } from 'devextreme-vue/data-grid';
import type dxDataGrid from 'devextreme/ui/data_grid';

import ChartPopup from './ChartPopup.vue';
import { gridData, type GridDataItem } from '../data/gridData';
import { getIcon } from '../utils/helpers';
import { getDataForChart, type ChartDataSource } from '@/utils/chartApi';

const gridRef = ref<DxDataGrid>();
const chartPopupVisible: Ref<boolean> = ref(false);

const isDataGridEmpty = ref(false);
const dataStore = new ArrayStore({
  data: gridData,
  key: 'Id',
});

const dataSource = new DataSource({
  store: dataStore,
  onChanged: () => {
    if (!gridInstance.value) return;
    isDataGridEmpty.value = gridInstance.value.totalCount() === 0;
    chartDataSource.value = getDataForChart(gridInstance.value, selectedRowsData.value?.length > 0);
  }
});

const gridInstance = computed<dxDataGrid | undefined>(() => gridRef.value?.instance);
const chartDataSource = ref<ChartDataSource>();
const hasSelectedRows = ref(false);
const selectedRowsData = ref<GridDataItem[]>([]);

watch(hasSelectedRows, (onlySelected) => {
  if (!gridInstance.value) return;
  chartDataSource.value = getDataForChart(gridInstance.value, onlySelected);
});

function showChartPopup() {
  chartPopupVisible.value = true;
  hasSelectedRows.value = selectedRowsData.value.length > 0;
}

function onRowClick(e: DxDataGridTypes.RowClickEvent) {
  if (e.component.isRowSelected(e.key)) {
    e.component.deselectRows([e.key]);
  } else {
    e.component.selectRows([e.key], true);
  }
}

function onSelectionChanged(e: DxDataGridTypes.SelectionChangedEvent<GridDataItem, number>) {
  hasSelectedRows.value = e.component.getSelectedRowsData().length > 0;
  selectedRowsData.value = e.component.getSelectedRowsData();
  if (!gridInstance.value) return;
  chartDataSource.value = getDataForChart(gridInstance.value, hasSelectedRows.value);
}

function onContextMenuPreparing(e: DxDataGridTypes.ContextMenuPreparingEvent) {
  if (e.target === 'content') {
    e.items = [{
      text: 'Generate Chart',
      icon: getIcon('pie', true),
      disabled: isDataGridEmpty.value,
      onItemClick: showChartPopup
    }];
  }
}
</script>

<template>
  <div class="demo-container">
    <DxDataGrid
      id="grid"
      ref="gridRef"
      :data-source="dataSource"
      :show-borders="true"
      :column-auto-width="true"
      @selection-changed="onSelectionChanged"
      @row-click="onRowClick"
      @context-menu-preparing="onContextMenuPreparing"
    >
      <DxSelection mode="multiple"/>
      <DxHeaderFilter :visible="true"/>
      <DxFilterRow :visible="true"/>
      <DxPaging :page-size="10"/>

      <DxToolbar>
        <DxToolbarItem
          name="chart"
          location="after"
        >
          <template #default>
            <DxButton
              text="Generate Chart"
              :icon="getIcon('pie', false)"
              styling-mode="contained"
              type="default"
              :disabled="isDataGridEmpty"
              @click="showChartPopup"
            >
              <template #default>
                <i
                  class="dx-icon dx-svg-icon"
                  v-html="getIcon('pie', false)"
                />
                <span class="dx-button-text">Generate Chart</span>
              </template>
            </DxButton>
          </template>
        </DxToolbarItem>
      </DxToolbar>

      <DxColumn
        data-field="Product"
        :width="170"
      />
      <DxColumn
        data-field="ExporterRegion"
        :width="170"
      />
      <DxColumn
        data-field="ExportCategory"
        caption="Category"
        :width="170"
      />
      <DxColumn data-field="ExportValue"/>
      <DxColumn data-field="TaxPaid"/>
      <DxColumn data-field="LogisticsCost"/>
    </DxDataGrid>

    <ChartPopup
      v-model:visible="chartPopupVisible"
      v-model:only-selected="hasSelectedRows"
      :chart-data-source="chartDataSource"
      :selected-rows-data="selectedRowsData"
    />
  </div>
</template>

<style scoped>
.demo-container {
  margin: 50px;
  width: 90vw;
}
#grid {
  min-width: 580px;
}
</style>
