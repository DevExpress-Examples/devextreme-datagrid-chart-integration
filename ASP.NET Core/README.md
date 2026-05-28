# ASP.NET Core DevExtreme Example

To integrate the chart popup from this example into your ASP.NET Core application, follow the steps below:

1. Copy `wwwroot/js/chart-integration` and `wwwroot/css` into your application (except `Site.css`). Reference the following files in your `_Layout.cshtml`:

    ```razor
    <head>
        <link rel="stylesheet" href="~/css/index.css" />
        <link rel="stylesheet" href="~/css/dx-styles.css" />

        @* Core files *@
        <script src="~/js/chart-integration/chart-data.js"></script>
        <script src="~/js/chart-integration/helpers.js"></script>
        <script src="~/js/chart-integration/chart-api.js"></script>

        @* Component files - one per partial view *@
        <script src="~/js/chart-integration/chart.js"></script>
        <script src="~/js/chart-integration/series-tabs.js"></script>
        <script src="~/js/chart-integration/chart-toolbar.js"></script>
        <script src="~/js/chart-integration/chart-popup.js"></script>

        @* Initialization js *@
        <script src="~/js/chart-integration/main.js"></script>
    </head>
    ```

2. Copy partial views from `Views/Shared` into your application (except `_Layout.cshtml`). Render `_ChartPopup.cshtml` after `DataGrid` declaration:

    ```razor
    @(Html.DevExtreme().DataGrid<TData>()
        // ...
    )

    @await Html.PartialAsync("_ChartPopup")
    ```

3. Copy the following files into your application:

    - `Controllers/ChartConfigurationController.cs`
    - `Models/ChartConfiguration.cs`
    - `Models/ChartConfigurationModel.cs`

    Update `Categories`, `Series`, and `Defaults` properties in `ChartConfigurationModel.Default` to match field names in your data set.

4. Add the following code after `DataGrid` instance initialization:

    ```razor
    <script>
        $(() => {
            (async () => {
                await chartIntegration.activate();
                chartIntegration.enableAdaptivity(); // optional
            })();
        });
    </script>
    ```

5. Call `chartIntegration.showChartPopup()` to display the chart popup. This example uses a toolbar button’s **onClick** handler and a context menu item:

    ```razor
    @(Html.DevExtreme().DataGrid<TData>()
        .Toolbar(t => t.Items(items => {
            items.Add()
                .Widget(w => w.Button()
                    .OnClick("chartIntegration.showChartPopup")
                );
        }))
        .OnContextMenuPreparing("onContextMenuPreparing")
    )

    <script>
        function onContextMenuPreparing(e) {
            e.items = [{
                onClick: chartIntegration.showChartPopup
            }];
        }
    </script>
    ```

For additional information about this example, refer to the [main readme](../README.md).

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
