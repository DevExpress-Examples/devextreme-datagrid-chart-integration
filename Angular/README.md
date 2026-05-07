# Angular DevExtreme Example

Follow these steps to integrate the Chart Popup with your DataGrid.
- Add the following component folders under `src/app/components/` and declare them in your module (see [app.module.ts](src/app/app.module.ts)):
  — `ChartPopupComponent` displays all content in a popup window
  — `ChartViewerComponent` contains Charts that display data from DataGrid
  — `ChartSettingsComponent` implements manipulation with different Chart settings
  - `SeriesTypesTabsComponent` allows switching between Chart types.
- Add `src/app/services/screen.service.ts` and `src/app/utils/chart-api.ts`, `helpers.ts`.
- Replace data field names with yours in [chart-data.ts](src/app/utils/chart-data.ts) by updating `categories`, `seriesFields`, and `defaults`.
- Declare `<app-chart-popup>` inside your DataGrid host component (see [home.component.html](src/app/components/home/home.component.html)):
```html
<app-chart-popup
  [visible]="chartPopupVisible"
  [chartData]="chartData"
  [onlySelected]="onlySelected"
  [hasSelectedRows]="hasSelectedRows"
  (visibleChange)="onVisibleChange($event)"
  (onlySelectedChange)="onOnlySelectedChange($event)"
></app-chart-popup>
```
- Bind DataGrid selection and chart data in your host component, then call `showChartPopup()` to open the Popup.

For more information about this example check the [Readme](../README.md).

## Build and Run

Prerequisites: Node.js.

Install dependencies:
```sh
npm install
```

Start dev server:
```sh
npm start
```
Open: http://localhost:4200/

Build production bundle:
```sh
npm run build
```

Run linter:
```sh
npm run lint
```

## Further help

Angular CLI docs: https://angular.dev/tools/cli
DevExtreme Angular docs: https://js.devexpress.com/Angular/Documentation

To get more help with DevExtreme, submit a ticket through the [Support Center](https://supportcenter.devexpress.com/ticket/create).
