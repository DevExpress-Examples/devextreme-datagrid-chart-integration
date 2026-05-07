# Vue 3 + TypeScript + Vite + DevExtreme

Follow these steps to integrate the Chart Popup with your DataGrid.
- Add the following component files under `src/components/` and import them where needed:
  - `ChartPopup.vue` — the Popup container
  - `ChartViewer.vue` — chart rendering component
  - `ChartSettings.vue` — chart settings panel
  - `SeriesTypesTabs.vue` — series type selector
- Add `src/utils/chartApi.ts` and `src/utils/helpers.ts`.
- Replace data field names with yours in [chartData.ts](src/utils/chartData.ts) by updating `categories`, `seriesFields`, and `defaults`.
- Declare `<ChartPopup>` inside your DataGrid host component (see [HomeContent.vue](src/components/HomeContent.vue)):
```vue
<ChartPopup
  v-model:visible="chartPopupVisible"
  :chart-data="chartData"
  :only-selected="onlySelected"
  :has-selected-rows="hasSelectedRows"
  @update:only-selected="onOnlySelectedChange"
/>
```
- Wire up DataGrid selection and chart data in your host component, then call `showChartPopup()` to open the Popup.

For more information about this example check the [Readme](../README.md).

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
