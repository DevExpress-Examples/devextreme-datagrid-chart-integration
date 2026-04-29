# ASP.NET Core DevExtreme Example

Follow these steps to integrate the Chart Popup with your DataGrid.
- Add the following files and references them in your layout (see *Views/Shared/_Layout.cshtml*):
  - `~/css/index.css`, `~/css/dx-styles.css`
  - All js files from `~/js/chart-integration/`
- Declare the Popup and settings Popover containers in [_ChartPopup.cshtml](Views/Shared/_ChartPopup.cshtml). The Popup's content is composed of the following partials:
  - [_SeriesTypesTabs.cshtml](Views/Shared/_SeriesTypesTabs.cshtml) — series type selector
  - [_ChartToolbar.cshtml](Views/Shared/_ChartToolbar.cshtml) — chart toolbar
  - [_Chart.cshtml](Views/Shared/_Chart.cshtml) — the chart itself
- Replace data field names with yours in [ChartConfigurationModel.cs](Models/ChartConfigurationModel.cs) by updating the `Categories`, `Series`, and `Defaults` values in `ChartConfigurationModel.Default`. These are served to the client via `GET /api/ChartConfiguration` by [ChartConfigurationController.cs](Controllers/ChartConfigurationController.cs) and received by [chart-data.js](wwwroot/js/chart-integration/chart-data.js).
- Execute the following code after your DataGrid initialization (see *Views/Home/Index.cshtml*):
```js
chartIntegration.activate();
chartIntegration.enableAdaptivity(); // optional
```
- Call the `chartIntegration.showChartPopup` method to invoke the Popup when required.

For more information about this example check the [Readme](../README.md).

## Build and Run

Prerequisites: .NET 8 SDK, Node.js (for npm/gulp resource bundling).

Restore and build:
```sh
dotnet restore
dotnet build
```

Run (HTTPS on 5001, HTTP on 5000 by default):
```sh
dotnet run
```

You can also use Visual Studio: F5 / Ctrl+F5.

## Further help

DevExtreme ASP.NET Core Razor syntax: https://docs.devexpress.com/AspNetCore/400574/devextreme-based-controls/concepts/razor-syntax
Client-side API basics:
* Get/Set properties: https://js.devexpress.com/DevExtreme/Guide/jQuery_Components/Component_Configuration_Syntax/#Get_and_Set_Properties
* Call methods: https://js.devexpress.com/DevExtreme/Guide/jQuery_Components/Component_Configuration_Syntax/#Call_Methods
* Get instance: https://js.devexpress.com/DevExtreme/Guide/jQuery_Components/Component_Configuration_Syntax/#Get_a_UI_Component_Instance

To get more help with DevExtreme, submit a ticket through the [Support Center](https://supportcenter.devexpress.com/ticket/create).
