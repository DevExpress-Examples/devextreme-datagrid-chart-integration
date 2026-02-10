$(() => {
  const grid = $('#grid').dxDataGrid({
    dataSource: {
      store: new DevExpress.data.ArrayStore({
        data: gridData,
        key: 'Id',
      }),
      onLoadingChanged: (isLoading) => {
        if (!isLoading) {
          const toolbarItems = grid.option('toolbar.items');
          toolbarItems.find(ti => ti.name === 'chart').disabled = helpers.isDataGridEmpty();
          grid.option('toolbar.items', toolbarItems);
        }
      }
    },
    showBorders: true,
    columnAutoWidth: true,
    selection: { mode: 'multiple' },
    headerFilter: { visible: true },
    filterRow: { visible: true },
    paging: { pageSize: 10 },
    toolbar: {
      items: [{
        name: 'chart',
        widget: 'dxButton',
        options: {
          text: 'Generate Chart',
          icon: helpers.getIcon('pie', false),
          stylingMode: 'contained',
          type: 'default',
          onClick: chartIntegration.showChartPopup
        }
      }]
    },
    onContextMenuPreparing: function(e) {
      if (e.target === 'content') {
        e.items = [{
          text: 'Generate Chart',
          icon: helpers.getIcon('pie', true),
          disabled: helpers.isDataGridEmpty(),
          onClick: chartIntegration.showChartPopup
        }];
      }
    },
    onRowClick: function(e) {
      if (e.component.isRowSelected(e.key)) {
        e.component.deselectRows([e.key]);
      } else {
        e.component.selectRows([e.key], true);
      }
    },
    columns: [
      { dataField: 'Product', width: 170 },
      { dataField: 'ExporterRegion', width: 170 },
      { dataField: 'ExportCategory', caption: 'Category', width: 170 },
      { dataField: 'ExportValue', },
      { dataField: 'TaxPaid' },
      { dataField: 'LogisticsCost' },
    ]
  }).dxDataGrid('instance');

  chartIntegration.activate('chart-popup', 'settings-popover', grid);
  chartIntegration.enableAdaptivity();
});
