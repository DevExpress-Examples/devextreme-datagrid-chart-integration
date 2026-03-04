<script setup lang="ts">
import { ref, computed, type Ref } from 'vue';

import DxForm, { DxLabel, DxSimpleItem, type DxFormTypes } from 'devextreme-vue/form';
import 'devextreme-vue/tag-box';
import 'devextreme-vue/switch';

import { categories, seriesFields } from '../utils/chartData';
import type { CategoryField, SeriesField } from '../utils/chartData';

interface Props {
  onlySelected: boolean;
  hasSelectedRows: boolean;
  currentCategory: CategoryField;
  currentSeries: SeriesField[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'categoryChange', value: CategoryField): void;
  (e: 'seriesChange', value: SeriesField[]): void;
  (e: 'onlySelectedChange', value: boolean): void;
}>();

const formData: Ref<{
  CategoryAxis: CategoryField;
  Series: SeriesField[];
  OnlySelected: boolean;
}> = ref({
  CategoryAxis: props.currentCategory,
  Series: [...props.currentSeries],
  OnlySelected: props.onlySelected
});

const seriesEditorOptions = {
  items: seriesFields,
  value: props.currentSeries
};

const categoryEditorOptions = {
  items: categories,
  value: props.currentCategory
};

const onlySelectedEditorOptions = computed(() => {
  return {
    elementAttr: { id: 'only-selected-box' },
    value: props.onlySelected,
    disabled: !props.hasSelectedRows
  };
});

function onFieldDataChanged(e: DxFormTypes.FieldDataChangedEvent) {
  if (e.dataField === 'CategoryAxis' && typeof e.value === 'string') {
    emit('categoryChange', e.value as CategoryField);
  } else if (e.dataField === 'Series' && Array.isArray(e.value)) {
    emit('seriesChange', e.value as SeriesField[]);
  } else if (e.dataField === 'OnlySelected' && typeof e.value === 'boolean') {
    emit('onlySelectedChange', e.value);
  }
}
</script>

<template>
  <div id="popup-content-data-panel">
    <DxForm
      id="popup-data-form"
      :form-data="formData"
      label-mode="outside"
      :show-colon-after-label="false"
      @field-data-changed="onFieldDataChanged"
    >
      <DxSimpleItem
        data-field="CategoryAxis"
        editor-type="dxSelectBox"
        :editor-options="categoryEditorOptions"
      />
      <DxSimpleItem
        data-field="Series"
        editor-type="dxTagBox"
        :editor-options="seriesEditorOptions"
      />

      <DxSimpleItem
        data-field="OnlySelected"
        editor-type="dxSwitch"
        css-class="label-v-center"
        :editor-options="onlySelectedEditorOptions"
      >
        <DxLabel
          location="left"
          alignment="left"
        />
      </DxSimpleItem>
    </DxForm>
  </div>
</template>

<style scoped>
#popup-content-data-panel {
  padding: 16px;
}

#popup-data-form :deep(.label-v-center.dx-label-h-align.dx-flex-layout:not(.dx-field-item-label-align)) {
  align-items: center;
}

:deep(#only-selected-box) {
  float: right;
  margin-top: 0;
  margin-bottom: 4px;
}
</style>
