const chartIntegration = (function () {
    let chartInPopup = null;
    let settingsPopoverInstance = null;
    let popupInstance = null;

    function createChart(container, seriesType) {
        let currentChart = chartAPI.getCurrentChart();
        if (currentChart) {
            currentChart.option('dataSource', null);
        }
        chartInPopup = chartAPI.createChart(container, seriesType);
    }

    function showChartPopup() {
        popupInstance.show();
        createChart($('#' + constants.POPUP_CHART_ID), getters.currentSeriesType());
    }
   
    function activate(popupElementId, settingsElementId, grid) {
        getters.grid = () => grid;
        popupInstance = $(`#${popupElementId}`).dxPopup('instance');
    }

    function enableAdaptivity() {
        const mq = window.matchMedia('(max-width: 800px)');
        function onMediaChange(e) {
            popupInstance.option('width', e.matches ? 576 : 800);
            const seriesList = getters.seriesListTabs();
            if (seriesList) {
                seriesList.option('width', e.matches ? 60 : 150);
                createChart($('#' + constants.POPUP_CHART_ID), getters.currentSeriesType());
                const toolbarItems = getters.toolbar().option('items');
                toolbarItems[1].locateInMenu = e.matches ? 'always' : 'auto';
                toolbarItems[2].locateInMenu = e.matches ? 'always' : 'auto';
                getters.toolbar().option('items', toolbarItems);
            }
        }
        onMediaChange(mq);
        mq.addEventListener('change', onMediaChange);
    }

    return {
        activate,
        showChartPopup,
        enableAdaptivity,
        chart: chartInPopup,
        createChart: createChart
    }
})();

window.chartIntegration = chartIntegration;
