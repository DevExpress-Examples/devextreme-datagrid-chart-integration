const chartIntegration = (function () {
    let chartInPopup = null;
    let settingsPopoverInstance = null;
    let popupInstance = null;

    function createChart(container, seriesType) {
        if (chartInPopup) chartInPopup.dispose();
        chartInPopup = chartAPI.createChart(container, seriesType);
    }

    function showChartPopup() {
        popupInstance.show();
        createChart($('#' + constants.POPUP_CHART_ID), getters.currentSeriesType());
    }

    function updateToolbarTitle(newTitle) {
        const toolbarItems = getters.toolbar().option('items');
        const titleItem = toolbarItems.find(i => i.cssClass === 'chart-title');
        titleItem.text = newTitle;
        getters.toolbar().option('items', toolbarItems);
    }

    function createSeriesListTabs(container, chartContainer) {
        container.dxTabs({
            items: chartData.seriesTypes.map((st) => ({
                text: st.charAt(0).toUpperCase() + st.slice(1),
                icon: helpers.getIconExt(st),
            })),
            width: helpers.isSmallScreen() ? 60 : 150,
            orientation: "vertical",
            iconPosition: 'start',
            selectedIndex: chartData.defaults.seriesTypeIndex,
            onSelectionChanged: function (e) {
                createChart(chartContainer, getters.currentSeriesType());
                updateToolbarTitle(e.addedItems[0].text + ' Chart');
            }
        });
    }

    function createChartPopupToolbar(container) {
        container.dxToolbar({
            items: [{
                location: 'before',
                text: chartData.seriesTypes[chartData.defaults.seriesTypeIndex].charAt(0).toUpperCase() + chartData.seriesTypes[chartData.defaults.seriesTypeIndex].slice(1) + ' Chart',
                cssClass: 'chart-title',
            }, {
                widget: 'dxDropDownButton',
                location: 'after',
                locateInMenu: helpers.isSmallScreen() ? 'always' : 'auto',
                options: {
                    icon: 'export',
                    text: 'Export',
                    items: [
                        { icon: 'image', text: 'PNG' },
                        { icon: 'pdffile', text: 'PDF' },
                        { icon: 'jpgfile', text: 'JPEG' },
                        { icon: 'svgfile', text: 'SVG' },
                    ],
                    onItemClick: (e) => {
                        chartInPopup.exportTo('Grid Data', e.itemData.text);
                    }
                }
            }, {
                widget: 'dxButton',
                location: 'after',
                locateInMenu: helpers.isSmallScreen() ? 'always' : 'auto',
                options: {
                    icon: 'print',
                    text: 'Print',
                    onClick: () => {
                        chartInPopup.print();
                    }
                }
            }, {
                widget: 'dxButton',
                location: 'after',
                options: {
                    elementAttr: { id: 'settings-button' },
                    icon: 'optionsoutline',
                    text: 'Settings',
                    template: (_, container) => {
                        const icon = $('<i class="dx-icon dx-icon-optionsoutline"></i>');
                        const text = $('<span class="dx-button-text">Settings</span>');
                        const chevron = $('<i class="dx-icon dx-icon-spindown"></i>');
                        container.append(icon, text, chevron);
                    },
                    onClick: () => {
                        if (settingsPopoverInstance.option('visible')) {
                            settingsPopoverInstance.hide();
                        } else {
                            settingsPopoverInstance.show();
                        }
                    }
                }
            }],
        });
    }

    function activate(popupElementId, settingsElementId, grid) {
        getters.grid = () => grid;

        popupInstance = $(`#${popupElementId}`).dxPopup('instance');
        //popupInstance = $(`#${popupElementId}`).dxPopup({
        //    showCloseButton: true,
        //    width: 800,
        //    height: 550,
        //    wrapperAttr: { class: 'chart-popup' },
        //    title: "Chart Preview",
        //    onShowing: () => {
        //        getters.onlySelectedEditor().option('value', getters.hasSelectedRows());
        //        getters.onlySelectedEditor().option('disabled', !getters.hasSelectedRows());
        //    },
        //    contentTemplate: () => {
        //        const content = $("<div id='popup-content' />");
        //        const tabsContainer = $(`<div id='${constants.POPUP_SERIES_LIST_ID}' />`);
        //        const dataContainer = $(`<div id='popup-content-data' />`);
        //        const toolbarContainer = $(`<div id='${constants.POPUP_EXPORT_TOOLBAR_ID}' />`);
        //        const chartContainer = $(`<div id='${constants.POPUP_CHART_ID}' />`);
        //        dataContainer.append(toolbarContainer, chartContainer);
        //        content.append(tabsContainer, dataContainer);
        //        createSeriesListTabs(tabsContainer, chartContainer);
        //        createChartPopupToolbar(toolbarContainer);
        //        return content;
        //    },
        //}).dxPopup('instance');


        //Convert to Razor

        //settingsPopoverInstance = $(`#${settingsElementId}`).dxPopover({
        //    deferRendering: false,
        //    showTitle: false,
        //    width: 240,
        //    height: 'auto',
        //    shading: false,
        //    hideOnOutsideClick: (e) => {
        //        return !$("#settings-button").has($(e.target)).length;
        //    },
        //    container: '#popup-content',
        //    wrapperAttr: { class: 'dx-dropdownbutton-popup-wrapper' },
        //    position: {
        //        of: '#settings-button',
        //        at: 'bottom right',
        //        my: 'top right',
        //        offset: { y: -8 },
        //    },
        //    contentTemplate: getSettingsContent,
        //}).dxPopover('instance');
    }

    function getSettingsContent() {
        const formContainer = $('<div id="popup-data-form" />');
        formContainer.dxForm({
            labelMode: 'outside',
            showColonAfterLabel: false,
            items: [{
                dataField: 'CategoryAxis',
                editorType: 'dxSelectBox',
                editorOptions: {
                    elementAttr: { id: constants.POPUP_CATEGORY_ID },
                    items: chartData.categories,
                    value: chartData.defaults.category,
                    onValueChanged: (e) => {
                        chartInPopup.option('commonSeriesSettings.argumentField', e.value);
                    },
                }
            }, {
                dataField: 'Series',
                editorType: 'dxTagBox',
                editorOptions: {
                    elementAttr: { id: constants.POPUP_SERIES_ID },
                    items: chartData.series,
                    value: chartData.defaults.series,
                    onValueChanged: (e) => {
                        const newSeries = e.value.map(v => ({
                            valueField: v, name: v
                        }));
                        chartInPopup.option('series', newSeries);
                    },
                }
            }, {
                dataField: 'OnlySelected',
                editorType: 'dxSwitch',
                cssClass: "label-v-center",
                label: {
                    location: 'left',
                    alignment: 'left',
                },
                editorOptions: {
                    elementAttr: { id: constants.POPUP_ONLY_SELECTED_ID },
                    value: false,
                    disabled: !getters.hasSelectedRows(),
                    onValueChanged: (e) => {
                        if (chartInPopup) {
                            chartInPopup.option('dataSource', chartAPI.getDataForChart(e.value));
                        } else {
                            createChart($('#' + constants.POPUP_CHART_ID), getters.currentSeriesType());
                        }
                    },
                }
            }]
        });
        return $('<div id="popup-content-data-panel" />').append(formContainer);
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
    }
})();

window.chartIntegration = chartIntegration;
