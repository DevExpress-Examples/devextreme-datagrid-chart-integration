
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
    chartIntegration.chartInPopup.option('commonSeriesSettings.argumentField', e.value)
}
function onSeriesChanged(e) {
     const newSeries = e.value.map(v => ({
         valueField: v, name: v
     }));
    chartIntegration.chartInPopup.option('series', newSeries);
}

function onOnlySelectedChanged(e) {
    if (chartIntegration.chartInPopup) {
        chartIntegration.chartInPopup.option('dataSource', chartAPI.getDataForChart(e.value));
    } else {
        chartIntegration.createChart($('#' + constants.POPUP_CHART_ID), getters.currentSeriesType());
    }
}
