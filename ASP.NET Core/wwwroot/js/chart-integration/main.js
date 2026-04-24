const chartIntegration = (function () {
    let popupInstance = null;

    function createChart(seriesType) {
        let currentChart = chartAPI.getCurrentChart();
        if (currentChart) {
            currentChart.option('dataSource', null);
        }
        chartAPI.createChart(seriesType);
    }

    function showChartPopup() {
        popupInstance.show();
        createChart(getters.currentSeriesType());
    }
   
    async function activate(popupElementId) {
        await chartData.load();

        seriesTabs.bindData();
        chartPopup.bindEditors();
        chartToolbar.bindTitle();

        popupInstance = $(`#${popupElementId}`).dxPopup('instance');
       
    }

    function enableAdaptivity() {
        const mq = window.matchMedia('(max-width: 800px)');
        function onMediaChange(e) {
            popupInstance.option('width', e.matches ? 576 : 800);
            const seriesList = getters.seriesListTabs();
            if (seriesList) {
                seriesList.option('width', e.matches ? 60 : 150);
                createChart(getters.currentSeriesType());
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
        createChart: createChart
    };
})();

window.chartIntegration = chartIntegration;
