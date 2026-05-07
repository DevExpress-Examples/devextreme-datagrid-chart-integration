# React + TypeScript + Vite + DevExtreme

Follow these steps to integrate the Chart Popup with your DataGrid.
- Add the following components from `src/components/chart/*`:
  — `ChartPopup` -  The main component that contains all content.
  — `ChartViewer`, `CommonChartViewer`, `PieChartViewer` - contain Chart components and configuration settings.
  — `ChartSettings`  manipulates chart settings. 
  — `SeriesTypesTabs` implements switching between different chart types.
- Add from `src/hooks/` to impelment integration between components.
- Add `src/utils/chart-api.ts` and `src/utils/helpers.ts`.
- Replace data field names with yours in [chart-data.ts](src/utils/chart-data.ts) by updating `categories`, `seriesFields`, and `defaults`.
- Declare `<ChartPopup>` inside your DataGrid host component (see [Home.tsx](src/components/Home.tsx)):
```tsx
<ChartPopup
  visible={chartPopupVisible}
  chartData={chartData}
  onlySelected={onlySelected}
  hasSelectedRows={hasSelectedRows}
  onVisibleChange={handleVisibleChange}
  onOnlySelectedChange={handleOnlySelectedChange}
/>
```
- Use the `useGridData` hook to bind DataGrid selection and chart data, then call `showChartPopup()` to open the Popup.

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

React docs: https://react.dev/learn
Vite docs: https://vite.dev/
DevExtreme React docs: https://js.devexpress.com/React/Documentation

To get more help with DevExtreme, submit a ticket through the [Support Center](https://supportcenter.devexpress.com/ticket/create).