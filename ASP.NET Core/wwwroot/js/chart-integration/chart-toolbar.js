const chartToolbar = (function () {
    function toolbarOnInitialized(e) {
        const toolbarItems = e.component.option('items');

        toolbarItems.forEach(item => {
            item.locateInMenu = helpers.isSmallScreen() ? 'always' : 'auto';
        });

        e.component.option('items', toolbarItems);
    }

    function onExportChart(e) {
        chartAPI.getCurrentChart().exportTo('Grid Data', e.itemData.text);
    }

    function onPrintChart() {
        chartAPI.getCurrentChart().print();
    }

    function settingOnClick() {
        const settingsPopoverInstance = $('#settings-popover').dxPopover('instance');

        if (settingsPopoverInstance.option('visible')) {
            settingsPopoverInstance.hide();
        } else {
            settingsPopoverInstance.show();
        }
    }

    function updateToolbarTitle(newTitle) {
        const toolbarItems = getters.toolbar().option('items');
        const titleItem = toolbarItems.find(i => i.cssClass === 'chart-title');

        titleItem.text = newTitle;
        getters.toolbar().option('items', toolbarItems);
    }

    return {
        toolbarOnInitialized,
        onExportChart,
        onPrintChart,
        settingOnClick,
        updateToolbarTitle
    };
})();

window.chartToolbar = chartToolbar;
