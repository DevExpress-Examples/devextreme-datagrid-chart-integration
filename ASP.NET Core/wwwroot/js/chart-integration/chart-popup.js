const chartPopup = (function () {
    function bindEditors() {
        const categoryEditor = getters.categoryEditor();
        const seriesEditor = getters.seriesEditor();

        if (categoryEditor) {
            categoryEditor.option('dataSource', chartData.categories);
            categoryEditor.option('value', chartData.defaults.category);
        }

        if (seriesEditor) {
            seriesEditor.option('dataSource', chartData.series);
            seriesEditor.option('value', chartData.defaults.series);
        }
    }

    function popupOnShowing() {
        getters.onlySelectedEditor().option('value', getters.hasSelectedRows());
        getters.onlySelectedEditor().option('disabled', !getters.hasSelectedRows());
    }

    function popoverHideOnOutsideClick(e) {
        return !$('#settings-button').has($(e.target)).length;
    }

    function onCategoryAxisChanged(e) {
        const chartInstance = chartAPI.getCurrentChart();

        chartInstance.option('commonSeriesSettings.argumentField', e.value);
    }

    function onSeriesChanged(e) {
        const newSeries = e.value.map(v => ({
            valueField: v,
            name: v
        }));
        const chartInstance = chartAPI.getCurrentChart();

        chartInstance.option('series', newSeries);
    }

    function onOnlySelectedChanged(e) {
        const chartInstance = chartAPI.getCurrentChart();

        if (chartInstance) {
            chartInstance.option('dataSource', chartAPI.getDataForChart(e.value));
        } else {
            chartIntegration.createChart(getters.currentSeriesType());
        }
    }

    return {
        bindEditors,
        popupOnShowing,
        popoverHideOnOutsideClick,
        onCategoryAxisChanged,
        onSeriesChanged,
        onOnlySelectedChanged
    };
})();

window.chartPopup = chartPopup;
