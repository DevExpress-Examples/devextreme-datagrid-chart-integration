# jQuery DevExtreme Example

To integrate the chart popup in your jQuery application, follow these steps:

1. Copy `src/chart-integration` and `src/styles` into your application and reference the following files in your root HTML:

```html
<head>
    <link rel="stylesheet" type="text/css" href="./styles/index.css" />
    <link rel="stylesheet" type="text/css" href="./styles/dx-styles.css" />
    <script type="text/javascript" src="chart-integration/chart-data.js"></script>
    <script type="text/javascript" src="chart-integration/helpers.js"></script>
    <script type="text/javascript" src="chart-integration/chart-api.js"></script>
    <script type="text/javascript" src="chart-integration/main.js"></script>
    <!-- ... -->
</head>
```

2. Add containers for the chart popup and the settings panel within the popup. This example uses DIV elements with *"chart-popup"* and *"settings-popover"* `id` attributes:

```html
<body class="dx-viewport">
    <div id="grid"></div>
    <div id="chart-popup"></div>
    <div id="settings-popover"></div>
</body>
```

3. Update the `chartData` variable in [chart-data.js](src/chart-integration/chart-data.js). Update `categories`, `series`, and `defaults` fields to match field names in your data set.

4. Implement the following code after you initialize your dxDataGrid instance:

```js
chartIntegration.activate('chart-popup', 'settings-popover', gridInstance);
chartIntegration.enableAdaptivity(); // optional
```

5. Call `chartIntegration.showChartPopup()` to invoke the chart popup. This example calls `showChartPopup()` in the **onClick** handlers of a toolbar button and a context menu item:

```js
$('#grid').dxDataGrid({
    toolbar: {
        items: [{
            widget: 'dxButton',
            options: {
                onClick: chartIntegration.showChartPopup
            }
        }]
    },
    onContextMenuPreparing: function(e) {
        e.items = [{
            onClick: chartIntegration.showChartPopup
        }];
    },
});
```

For additional information about this example, refer to the general [Readme](../README.md).

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
