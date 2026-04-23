const constants = {
  GRID_ID: 'grid',
  POPUP_SERIES_LIST_ID: 'popup-content-series-list',
  POPUP_CHART_ID: 'popup-content-chart',
  POPUP_EXPORT_TOOLBAR_ID: 'popup-content-toolbar',
  POPUP_ONLY_SELECTED_ID: 'only-selected-box',
  POPUP_CATEGORY_ID: 'category-editor',
  POPUP_SERIES_ID: 'series-editor',
};

const getters = {
  grid: () => $('#' + constants.GRID_ID).dxDataGrid('instance'),
  toolbar: () => $('#' + constants.POPUP_EXPORT_TOOLBAR_ID).dxToolbar('instance'),
  categoryEditor: () => $('#' + constants.POPUP_CATEGORY_ID).dxSelectBox('instance'),
  seriesEditor: () => $('#' + constants.POPUP_SERIES_ID).dxTagBox('instance'),
  seriesListTabs: () => $('#' + constants.POPUP_SERIES_LIST_ID).dxTabs('instance'),
  onlySelectedEditor: () => $('#' + constants.POPUP_ONLY_SELECTED_ID).dxSwitch('instance'),
  currentSeriesType: () => chartData.seriesTypes[getters.seriesListTabs().option('selectedIndex')],
  onlySelectedValue: () => getters.onlySelectedEditor().option('value'),
  hasSelectedRows: () => getters.grid().getSelectedRowsData().length > 0,
};

const helpers = {
  getIcon: function (seriesType, isOutline) {
    const iconName = `data${seriesType}${isOutline ? 'outline' : 'filled'}`;
    return `<svg class="custom-icon ${iconName}"><use xlink:href="#${iconName}"></use></svg>`;
  },
  getIconExt: function (seriesType) {
    return `<svg class="custom-icon">
          <use class='icon-outline' xlink:href="#data${seriesType}outline"></use>
          <use class='icon-filled' xlink:href="#data${seriesType}filled"></use> 
        </svg>`;
  },
  isSmallScreen: function () {
    return document.documentElement.clientWidth < 800;
  },
  isDataGridEmpty: function () {
    const grid = getters.grid();
    return !grid || grid.totalCount() === 0;
  }
};

window.constants = constants;
window.helpers = helpers;
window.getters = getters;
