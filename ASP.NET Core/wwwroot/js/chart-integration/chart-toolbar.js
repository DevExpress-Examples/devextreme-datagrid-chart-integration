function toolbarOnInitialized(e) {
    let toolbarItems = e.component.option('items');
    toolbarItems.forEach(item => item.locateInMenu = helpers.isSmallScreen() ? 'always' : 'auto');
    e.component.option('items', toolbarItems);
}

function onExportChart(e) {
    console.log(chartIntegration)
    chartAPI.getCurrentChart().exportTo('Grid Data', e.itemData.text);
}
function onPrintChart(e) {
    chartAPI.getCurrentChart().print();
}

function settingOnClick(e) {
    let settingsPopoverInstance = $(`#settings-popover`).dxPopover('instance');
    if (settingsPopoverInstance.option('visible')) {
        settingsPopoverInstance.hide();
    } else {
        settingsPopoverInstance.show();
    }
}
