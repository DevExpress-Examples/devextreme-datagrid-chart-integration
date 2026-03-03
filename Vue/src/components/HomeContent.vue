<script setup lang="ts">
import { ref, computed, type Ref, watchEffect } from 'vue';
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
import type { DxDataGridTypes } from 'devextreme-vue/data-grid';
import type dxDataGrid from 'devextreme/ui/data_grid';
import DxButton from 'devextreme-vue/button';
import ArrayStore from 'devextreme/data/array_store';

import ChartPopup from './ChartPopup.vue';
import { gridData } from '../data/gridData';
import { getIcon } from '../utils/helpers';

const gridRef = ref<DxDataGrid>();
const chartPopupVisible: Ref<boolean> = ref(false);

const isDataGridEmpty = ref(false);
const gridDataStore = new ArrayStore({
  data: gridData,
  key: 'Id',
});

const gridInstance = computed<dxDataGrid | undefined>(() => gridRef.value?.instance);

const hasSelectedRows = ref(false);

watchEffect(() => {
  if (!gridInstance.value) return false;
  hasSelectedRows.value = gridInstance.value.getSelectedRowsData().length > 0;
});

watchEffect(() => {
  if (!gridInstance.value) return true;
  isDataGridEmpty.value = gridInstance.value.totalCount() === 0;
});

function showChartPopup() {
  chartPopupVisible.value = true;
}

function onRowClick(e: DxDataGridTypes.RowClickEvent) {
  if (e.component.isRowSelected(e.key)) {
    e.component.deselectRows([e.key]);
  } else {
    e.component.selectRows([e.key], true);
  }
}

function onSelectionChanged(e: DxDataGridTypes.SelectionChangedEvent) {
  hasSelectedRows.value = e.component.getSelectedRowsData().length > 0;
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
      :data-source="gridDataStore"
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
                <div v-html="getIcon('pie', false)"/>
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
      :grid-instance="gridInstance"
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
