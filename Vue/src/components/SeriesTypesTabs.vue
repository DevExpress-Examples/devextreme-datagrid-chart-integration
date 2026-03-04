<script setup lang="ts">
import { ref, computed, type Ref } from 'vue';
import DxTabs, { type DxTabsTypes } from 'devextreme-vue/tabs';
import { seriesTypes, defaults } from '../utils/chartData';
import { getIconExt, capitalizeFirst } from '../utils/helpers';
import type { SeriesType } from '../utils/chartData';

interface Props {
  isSmall: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'seriesTypeChange', value: SeriesType): void;
}>();

const selectedIndex: Ref<number> = ref(defaults.seriesTypeIndex);

const tabItems = computed<DxTabsTypes.Item[]>(() =>
  seriesTypes.map((st) => ({
    text: capitalizeFirst(st),
    icon: getIconExt(st),
  }))
);

const tabWidth = computed(() => props.isSmall ? 60 : 150);

function onSelectionChanged(e: { addedItems: DxTabsTypes.Item[] }) {
  const index = tabItems.value.findIndex(item => item.text === e.addedItems[0].text);
  if (index !== -1) {
    emit('seriesTypeChange', seriesTypes[index]);
  }
}
</script>

<template>
  <DxTabs
    id="popup-content-series-list"
    :items="tabItems"
    :width="tabWidth"
    orientation="vertical"
    icon-position="start"
    :selected-index="selectedIndex"
    @selection-changed="onSelectionChanged"
  />
</template>

<style scoped>
#popup-content-series-list {
  width: 150px;
  padding-right: 24px;
  box-sizing: border-box;
}
</style>
