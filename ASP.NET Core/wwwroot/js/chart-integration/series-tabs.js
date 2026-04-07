function getSeriesTypesData() {
    return chartData.seriesTypes.map((st) => ({
        text: st.charAt(0).toUpperCase() + st.slice(1),
        icon: helpers.getIconExt(st),
    }))
}
function tabSelectionChanged(e) {
    //chartIntegration.createChart(chartContainer, getters.currentSeriesType());
    //updateToolbarTitle(e.addedItems[0].text + ' Chart');
}
