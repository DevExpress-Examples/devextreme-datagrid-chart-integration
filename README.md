<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/1149668002/25.2.2%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1321089)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# DevExtreme DataGrid - Chart Integration

This example adds data visualization capabilities to a DataGrid using a DevExtreme Chart component. A dxChart is configured within a DevExtreme Popup and is bound to the grid data source.

The chart popup allows you to configure multiple dxChart settings, including:

- The chart type
- Series (value axis) data fields
- The argument axis data field

You can also visualize the grid dataset partially using the selection and filtering capabilities of the dxDataGrid. Select specific records or apply filtering settings before you invoke the chart popup.

This example also implements the exporting and printing capabilities of dxChart. You can save generated charts in four formats (.pdf, .png, .jpeg, .svg), or print directly without exporting.

You can invoke the chart popup from either the DataGrid [toolbar](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/#Customize_the_Toolbar) or [context menu](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onContextMenuPreparing).

![DevExtreme DataGrid - Chart Integration](images/image-template.png)

This example can adapt to screens of all sizes.

![DevExtreme DataGrid - Chart Integration Adaptability](images/image-adaptive.png)

## Files to Review

- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **React**
    - [App.tsx](React/src/App.tsx)
- **Vue**
    - [App.vue](Vue/src/App.vue)
    - [Home.vue](Vue/src/components/HomeContent.vue)
- **jQuery**
    - [Instructions](jQuery/README.md)
    - [index.html](jQuery/src/index.html)
    - [index.js](jQuery/src/index.js)
    - [chart-integration/chart-api.js](jQuery/src/chart-integration/chart-api.js)
    - [chart-integration/chart-data.js](jQuery/src/chart-integration/chart-data.js)
    - [chart-integration/helpers.js](jQuery/src/chart-integration/helpers.js)
    - [chart-integration/main.js](jQuery/src/chart-integration/main.js)
- **ASP.NET Core**    
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)

## Documentation

- [Chart Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/Chart/Overview/)
- [PieChart Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/PieChart/Series/Overview/)
- [Popup Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/Popup/Overview/)

<!-- feedback -->
## Does This Example Address Your Development Requirements/Objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-chart-integration&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-chart-integration&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
