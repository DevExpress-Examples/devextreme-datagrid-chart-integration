const chartToolbar = (function () {
    function getTitle(seriesType) {
        return seriesType.charAt(0).toUpperCase() + seriesType.slice(1) + ' Chart';
    }

    function bindTitle() {
        const initialSeriesType = chartData.seriesTypes[chartData.defaults.seriesTypeIndex];
        updateToolbarTitle(getTitle(initialSeriesType));
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
        bindTitle,
        onExportChart,
        onPrintChart,
        settingOnClick,
        updateToolbarTitle
    };
})();

window.chartToolbar = chartToolbar;
