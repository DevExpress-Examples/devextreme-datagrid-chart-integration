<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/1149668002/26.1.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1321089)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# DevExtreme DataGrid - Chart Integration

This example uses three DevExtreme components: `dxChart`, `dxPopup`, and `dxDataGrid`. The popup chart visualizes data displayed within the Data Grid. 

Popup chart UI allows users to configure the following `dxChart` settings:

- Chart type
- The data field that supplies arguments
- Data fields that supply values (one or more series)

You can visualize a subset of available data. Select specific grid records or apply a filter before you invoke the chart popup.

You can save generated charts across four formats (.pdf, .png, .jpeg, .svg), or send charts directly to printer.

To display the chart popup, either use the DataGrid [toolbar](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/#Customize_the_Toolbar) or [context menu](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onContextMenuPreparing).

![DevExtreme DataGrid - Chart Integration](images/image-template.png)

This example adapts to screens of all sizes.

![DevExtreme DataGrid - Chart Integration Adaptability](images/image-adaptive.png)

## Files to Review

- **Angular**
    - [Integration Instructions](Angular/README.md)
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
    - [chart-popup/chart-popup.component.html](Angular/src/app/components/chart-popup/chart-popup.component.html)
    - [chart-popup/chart-popup.component.ts](Angular/src/app/components/chart-popup/chart-popup.component.ts)
    - [utils/chart-api.ts](Angular/src/app/utils/chart-api.ts)
    - [utils/chart-data.ts](Angular/src/app/utils/chart-data.ts)
- **React**
    - [Integration Instructions](React/README.md)
    - [App.tsx](React/src/App.tsx)
    - [components/chart/popup/ChartPopup.tsx](React/src/components/chart/popup/ChartPopup.tsx)
    - [hooks/useGridData.ts](React/src/hooks/useGridData.ts)
    - [utils/chart-api.ts](React/src/utils/chart-api.ts)
    - [utils/chart-data.ts](React/src/utils/chart-data.ts)
- **Vue**
    - [Integration Instructions](Vue/README.md)
    - [App.vue](Vue/src/App.vue)
    - [Home.vue](Vue/src/components/HomeContent.vue)
    - [components/ChartPopup.vue](Vue/src/components/ChartPopup.vue)
    - [utils/chartApi.ts](Vue/src/utils/chartApi.ts)
    - [utils/chartData.ts](Vue/src/utils/chartData.ts)
- **jQuery**
    - [Integration Instructions](jQuery/README.md)
    - [index.html](jQuery/src/index.html)
    - [index.js](jQuery/src/index.js)
    - [chart-integration/chart-api.js](jQuery/src/chart-integration/chart-api.js)
    - [chart-integration/chart-data.js](jQuery/src/chart-integration/chart-data.js)
    - [chart-integration/helpers.js](jQuery/src/chart-integration/helpers.js)
    - [chart-integration/main.js](jQuery/src/chart-integration/main.js)
- **ASP.NET Core**    
    - [Integration Instructions](ASP.NET%20Core/README.md)
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)
    - [wwwroot/js/chart-integration/main.js](ASP.NET%20Core/wwwroot/js/chart-integration/main.js)
    - [wwwroot/js/chart-integration/chart-api.js](ASP.NET%20Core/wwwroot/js/chart-integration/chart-api.js)
    - [wwwroot/js/chart-integration/chart-data.js](ASP.NET%20Core/wwwroot/js/chart-integration/chart-data.js)
    - [Models/ChartConfigurationModel.cs](ASP.NET%20Core/Models/ChartConfigurationModel.cs)

## Documentation

- [DataGrid Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Overview/)
- [Chart Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/Chart/Overview/)
- [PieChart Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/PieChart/Series/Overview/)
- [Popup Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/Popup/Overview/)

<!-- feedback -->
## Does This Example Address Your Development Requirements/Objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-chart-integration&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-chart-integration&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
