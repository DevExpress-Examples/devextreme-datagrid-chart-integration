# jQuery DevExtreme Example

Follow these steps to integrate the Chart Popup with your DataGrid.
- Add files from the *chart-integration* and *styles* directories to your project and references them in your HTML.
- Declare DIV elements for Chart Popup and Settings Popover containers in your markup. The sample uses the `chart-popup` and `settings-popover` ids.
- Replace data field names with yours in [chart-data.js](src/chart-integration/chart-data.js) for the **categories**, **series**, and **defaults** fields.
- Execute the following code after your DataGrid initialization:
```js
chartIntegration.activate('chart-popup', 'settings-popover', gridInstance);
chartIntegration.enableAdaptivity(); // optional
```
- Call the `chartIntegration.showChartPopup` method to invoke the Popup when required.

For more information about this example check the [Readme](../README.md).

## Build and Lint

Install dependencies:
```sh
npm install
```

Start dev server:
```sh
npm start
```
App URL: http://localhost:5050/src/index.html

Run linter:
```sh
npm run lint
```

## Further help

jQuery docs: [https://api.jquery.com/](https://api.jquery.com/)
DevExtreme docs: https://js.devexpress.com/jQuery/Documentation

To get more help with DevExtreme, submit a ticket through the [Support Center](https://supportcenter.devexpress.com/ticket/create).
