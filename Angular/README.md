# Angular DevExtreme Example

To integrate the chart popup from this example to your Angular application, follow the steps below:

1. Copy `src/app/components` into your application (all component folders except `home`) and reference the following files in your `app.module.ts`:

    ```ts
    import { ChartPopupComponent } from './components/chart-popup/chart-popup.component';
    import { ChartViewerComponent } from './components/chart-viewer/chart-viewer.component';
    import { ChartSettingsComponent } from './components/chart-settings/chart-settings.component';
    import { SeriesTypesTabsComponent } from './components/series-types-tabs/series-types-tabs.component';

    @NgModule({
        declarations: [
            ChartPopupComponent,
            ChartViewerComponent,
            ChartSettingsComponent,
            SeriesTypesTabsComponent,
        ],
    })
    export class AppModule {}
    ```

2. Copy `src/app/services` and `src/app/utils` into your application. Update types and variables in `src/app/utils/chart-data.ts` to match field names in your dataset. Replace all instances of `GridDataItem` with your grid data type (the example imports `GridDataItem` from `src/app/data/grid-data.ts`).

3. Add `<app-chart-popup>` next to your `<dx-data-grid>` and define `visible` and `chartData` properties.

    ```html
    <dx-data-grid>
        <!-- ... -->
    </dx-data-grid>
    <app-chart-popup
        [visible]="chartPopupVisible"
        [chartData]="chartData"
    ></app-chart-popup>
    ```

4. Set `visible` to `true` to display the chart popup. This example uses toolbar button click handlers and a context menu item:

    ```html
    <dx-data-grid
        (onContextMenuPreparing)="onContextMenuPreparing($event)"
    >
        <dxo-data-grid-toolbar [visible]="true">
            <dxi-data-grid-item
                template="chartButtonTemplate"
            ></dxi-data-grid-item>
        </dxo-data-grid-toolbar>

        <div *dxTemplate="let _ of 'chartButtonTemplate'">
            <dx-button
                (onClick)="handleChartButtonClick()"
            >
                <!-- ... -->
            </dx-button>
        </div>
    </dx-data-grid>
    <app-chart-popup
        [visible]="chartPopupVisible"
        [chartData]="chartData"
    ></app-chart-popup>
    ```

    ```ts
    export class HomeComponent {
        chartPopupVisible = false;

        handleChartButtonClick(): void {
            this.chartPopupVisible = true;
        }

        onContextMenuPreparing(e: DxDataGridTypes.ContextMenuPreparingEvent<GridDataItem, number>): void {
            e.items = [{
                onItemClick: () => { this.chartPopupVisible = true },
            }];
        }
    }
    ```

For additional information about this example, refer to the [main readme](../README.md).

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
