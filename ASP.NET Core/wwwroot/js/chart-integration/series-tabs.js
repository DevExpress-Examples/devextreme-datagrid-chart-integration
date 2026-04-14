function getSeriesTypesData() {
    return chartData.seriesTypes.map((st) => ({
        text: st.charAt(0).toUpperCase() + st.slice(1),
        icon: helpers.getIconExt(st),
    }))
}

function updateToolbarTitle(newTitle) {
    const toolbarItems = getters.toolbar().option('items');
    const titleItem = toolbarItems.find(i => i.cssClass === 'chart-title');
    titleItem.text = newTitle;
    getters.toolbar().option('items', toolbarItems);
}


function tabSelectionChanged(e) {
    chartIntegration.createChart($(`<div id='${constants.POPUP_CHART_ID}' />`), getters.currentSeriesType());
    updateToolbarTitle(e.addedItems[0].text + ' Chart');
}
