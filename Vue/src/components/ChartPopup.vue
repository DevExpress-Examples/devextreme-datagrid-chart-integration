<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue';

import DxPopup from 'devextreme-vue/popup';
import DxToolbar, { DxItem as DxToolbarItem } from 'devextreme-vue/toolbar';
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import DxButton from 'devextreme-vue/button';
import DxPopover from 'devextreme-vue/popover';
import type dxDataGrid from 'devextreme/ui/data_grid';
import type { DxDropDownButtonTypes } from 'devextreme-vue/drop-down-button';

import SeriesTypesTabs from './SeriesTypesTabs.vue';
import ChartViewer from './ChartViewer.vue';
import ChartSettings from './ChartSettings.vue';

import { seriesTypes, defaults } from '../utils/chartData';
import { capitalizeFirst } from '../utils/helpers';
import { sizes, subscribe, unsubscribe } from '../utils/media-query';
import type { CategoryField, SeriesField, SeriesType } from '../utils/chartData';
import type { ChartDataSource } from '../utils/chartApi';
import type { GridDataItem } from '../data/gridData';

interface Props {
  visible: boolean;
  gridInstance?: dxDataGrid;
  onlySelected: boolean;
  selectedRowsData: GridDataItem[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'update:onlySelected', value: boolean): void;
}>();

const currentSeriesType: Ref<SeriesType> = ref(seriesTypes[defaults.seriesTypeIndex]);
const currentCategory: Ref<CategoryField> = ref(defaults.category);
const currentSeriesFields: Ref<SeriesField[]> = ref([...defaults.series]);
const settingsVisible: Ref<boolean> = ref(false);
const chartRef: Ref<typeof ChartViewer | null> = ref(null);
const isSmall: Ref<boolean> = ref(sizes()['screen-x-small']);

const printButtonOptions = {
  icon: 'print',
  text: 'Print',
  stylingMode: 'text',
  onClick: onPrintClick
};
const wrapperAttr = { class: 'chart-popup' };

const exportItems = [
  { icon: 'image', text: 'PNG' },
  { icon: 'pdffile', text: 'PDF' },
  { icon: 'jpgfile', text: 'JPEG' },
  { icon: 'svgfile', text: 'SVG' },
];

const popoverPosition = {
  at: 'bottom right',
  my: 'top right',
  offset: { y: -8 }
};

const popupWidth = computed(() => isSmall.value ? 576 : 800);
const chartTitle = computed(() => `${capitalizeFirst(currentSeriesType.value)} Chart`);
const chartDataSource = computed<ChartDataSource>(() => {
  if (!props.gridInstance) {
    return { store: [], filter: null, paginate: false };
  }
  return {
    store: props.onlySelected
      ? props.selectedRowsData
      : props.gridInstance.getDataSource()!.store(),
    filter: props.onlySelected ? null : props.gridInstance.getCombinedFilter(true),
    paginate: false,
  };
});
const hasSelectedRows = computed(() => {
  return props.selectedRowsData.length > 0;
});

function onSeriesTypeChange(newType: SeriesType) {
  currentSeriesType.value = newType;
}

function onCategoryChange(newCategory: CategoryField) {
  currentCategory.value = newCategory;
}

function onSeriesChange(newSeries: SeriesField[]) {
  currentSeriesFields.value = newSeries;
}

function onOnlySelectedChange(value: boolean) {
  emit('update:onlySelected', value);
}

function onExportItemClick(e: DxDropDownButtonTypes.ItemClickEvent) {
  if (chartRef.value) {
    chartRef.value.exportChart('Grid Data', e.itemData.text);
  }
}

function onPrintClick() {
  if (chartRef.value) {
    chartRef.value.printChart();
  }
}

function toggleSettings() {
  settingsVisible.value = !settingsVisible.value;
}

function onPopupHiding() {
  emit('update:visible', false);
  settingsVisible.value = false;
}

const handleMediaChange = () => {
  isSmall.value = sizes()['screen-x-small'];
};

onMounted(() => {
  subscribe(handleMediaChange);
});

onUnmounted(() => {
  unsubscribe(handleMediaChange);
});

</script>

<template>
  <DxPopup
    :visible="visible"
    :width="popupWidth"
    :height="550"
    :wrapper-attr="wrapperAttr"
    title="Chart Preview"
    @hiding="onPopupHiding"
  >
    <template #content>
      <div id="popup-content">
        <SeriesTypesTabs
          :is-small="isSmall"
          @series-type-change="onSeriesTypeChange"
        />
        <div id="popup-content-data">
          <DxToolbar id="popup-content-toolbar">
            <DxToolbarItem
              template="titleTemplate"
              location="before"
            />
            <template #titleTemplate>
              <div class="chart-title">{{ chartTitle }}</div>
            </template>

            <DxToolbarItem
              v-if="isSmall"
              location="after"
              locate-in-menu="always"
              template="exportTemplate"
            />

            <DxToolbarItem
              v-if="!isSmall"
              location="after"
              locate-in-menu="auto"
              template="exportTemplate"
            />
            <template #exportTemplate>
              <DxDropDownButton
                styling-mode="text"
                icon="export"
                text="Export"
                display-expr="text"
                key-expr="text"
                :items="exportItems"
                @item-click="onExportItemClick"
              />
            </template>

            <DxToolbarItem
              v-if="isSmall"
              location="after"
              locate-in-menu="always"
              widget="dxButton"
              :options="printButtonOptions"
            />

            <DxToolbarItem
              v-if="!isSmall"
              location="after"
              locate-in-menu="auto"
              widget="dxButton"
              :options="printButtonOptions"
            />

            <DxToolbarItem
              location="after"
              template="settingsTemplate"
              widget="dxButton"
            />
            <template #settingsTemplate>
              <DxButton
                styling-mode="text"
                id="settings-button"
                icon="optionsoutline"
                template="buttonTemplate"
                text="Settings"
                @click="toggleSettings"
              >
                <template #buttonTemplate>
                  <i class="dx-icon dx-icon-optionsoutline"/>
                  <span class="dx-button-text">Settings</span>
                  <i class="dx-icon dx-icon-spindown"/>
                </template>
              </DxButton>
            </template>

          </DxToolbar>
          <ChartViewer
            ref="chartRef"
            :data-source="chartDataSource"
            :series-type="currentSeriesType"
            :category="currentCategory"
            :series-fields="currentSeriesFields"
          />
        </div>
      </div>
    </template>
  </DxPopup>

  <DxPopover
    :visible="settingsVisible"
    :defer-rendering="false"
    :show-title="false"
    :width="240"
    height="auto"
    :shading="false"
    target="#settings-button"
    :position="popoverPosition"
    wrapper-attr-class="dx-dropdownbutton-popup-wrapper"
    @hiding="settingsVisible = false"
  >

    <template #content>
      <ChartSettings
        :only-selected="onlySelected"
        :has-selected-rows="hasSelectedRows"
        :current-category="currentCategory"
        :current-series="currentSeriesFields"
        @category-change="onCategoryChange"
        @series-change="onSeriesChange"
        @only-selected-change="onOnlySelectedChange"
      />
    </template>
  </DxPopover>
</template>

<style scoped>
.chart-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--fluent-colors-grey-900);
}

#popup-content {
  display: flex;
  height: 100%;
  max-width: 100%;
}

#popup-content-data {
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--fluent-colors-grey-0, #FFF);
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 4%), 0 4px 24px 0 rgb(0 0 0 / 2%);
  padding: 24px;
  row-gap: 24px;
}

#settings-button .dx-icon-spindown {
  margin-inline: 0 8px;
}
</style>
