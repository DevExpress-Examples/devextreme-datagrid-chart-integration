# Vue 3 + TypeScript + Vite + DevExtreme

To integrate the chart popup in your Angular application, follow these steps:

1. Copy `src/utils`, `src/assets/chart-styles.css`, and `src/components` (all components except `HomeContent`) into your application.

2. Update types and variables in [src/utils/chartData.ts](src/utils/chartData.ts) to match field names in your data set. Replace all instances of `GridDataItem` with your grid data type (this example imports `GridDataItem` from `src/data/gridData.ts`).

3. Add `<ChartPopup>` beside your dxDataGrid instance and define the `visible` and `chart-data` properties.

```vue
<template>
    <DxDataGrid>
        <!-- ... -->
    </DxDataGrid>
    <ChartPopup
        v-model:visible="chartPopupVisible"
        :chart-data="chartData"
    />
</template>
```

4. Modify the `visible` property value to toggle the chart popup. This example sets this property to `true` in the click handlers of a toolbar button and a context menu item:

```vue
<template>
    <DxDataGrid
        @context-menu-preparing="onContextMenuPreparing"
    >
        <DxToolbar>
            <DxToolbarItem>
                <template #default>
                    <DxButton
                        @click="handleChartButtonClick"
                    />
                </template>
            </DxToolbarItem>
        </DxToolbar>
    </DxDataGrid>
</template>

<script setup lang="ts">
import ChartPopup from './ChartPopup.vue';
// ...

function handleChartButtonClick() {
    chartPopupVisible.value = true;
}

function onContextMenuPreparing(e: DxDataGridTypes.ContextMenuPreparingEvent) {
    e.items = [{
        onItemClick: () => { chartPopupVisible.value = true; },
    }];
}
</script>
```

For additional information about this example, refer to the general [Readme](../README.md).

## Build and Run

Prerequisites: Node.js.

Install dependencies:
```sh
npm install
```

Start dev server:
```sh
npm run dev
```
Open: http://localhost:5173/

Build production bundle:
```sh
npm run build
```

Run linter:
```sh
npm run lint
```

## Further help

Vue docs: https://vuejs.org/guide/introduction.html
Vite docs: https://vite.dev/
DevExtreme Vue docs: https://js.devexpress.com/Vue/Documentation

To get more help with DevExtreme, submit a ticket through the [Support Center](https://supportcenter.devexpress.com/ticket/create).
