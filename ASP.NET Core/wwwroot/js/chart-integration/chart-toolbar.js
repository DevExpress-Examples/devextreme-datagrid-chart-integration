function toolbarOnInitialized(e) {
    let toolbarItems = e.component.option('items');
    toolbarItems.forEach(item => item.locateInMenu = helpers.isSmallScreen() ? 'always' : 'auto');
    e.component.option('items', toolbarItems);
}

function onExportChart(e) {
    console.log('onExportChart')
    console.log(chartIntegration.chart);
    chartIntegration.chart.exportTo('Grid Data', e.itemData.text);
}
