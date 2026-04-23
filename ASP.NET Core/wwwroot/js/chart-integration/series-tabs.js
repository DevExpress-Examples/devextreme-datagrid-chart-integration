const seriesTabs = (function () {
    function getSeriesTypesData() {
        return chartData.seriesTypes.map(st => ({
            text: st.charAt(0).toUpperCase() + st.slice(1),
            icon: helpers.getIconExt(st)
        }));
    }

    function bindData() {
        const tabs = getters.seriesListTabs();
        if (!tabs) {
            return;
        }

        tabs.option('dataSource', getSeriesTypesData());
        tabs.option('selectedIndex', chartData.defaults.seriesTypeIndex);
    }

    function tabSelectionChanged(e) {
        chartIntegration.createChart(getters.currentSeriesType());
        chartToolbar.updateToolbarTitle(e.addedItems[0].text + ' Chart');
    }

    return {
        getSeriesTypesData,
        bindData,
        tabSelectionChanged
    };
})();

window.seriesTabs = seriesTabs;
