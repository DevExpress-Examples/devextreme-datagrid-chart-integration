
//for Chart component
function popupOnShowing(e) {
    getters.onlySelectedEditor().option('value', getters.hasSelectedRows());
    getters.onlySelectedEditor().option('disabled', !getters.hasSelectedRows());
}

//for Popover component
function popoverHideOnOutsideClick(e) {
    return !$("#settings-button").has($(e.target)).length;
}

//for nested Form in Popover component
function onCategoryAxisChanged(e) {
    let chartInstance = chartAPI.getCurrentChart();
    chartInstance.option('commonSeriesSettings.argumentField', e.value)
}
function onSeriesChanged(e) {
     const newSeries = e.value.map(v => ({
         valueField: v, name: v
     }));
    let chartInstance = chartAPI.getCurrentChart();
    chartInstance.option('series', newSeries);
}

function onOnlySelectedChanged(e) {
    let chartInstance = chartAPI.getCurrentChart();
    if (chartInstance) {
        chartInstance.option('dataSource', chartAPI.getDataForChart(e.value));
    } else {
        chartIntegration.createChart($('#' + constants.POPUP_CHART_ID), getters.currentSeriesType());
    }
}
