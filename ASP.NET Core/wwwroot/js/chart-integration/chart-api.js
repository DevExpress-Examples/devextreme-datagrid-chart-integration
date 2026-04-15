const chartAPI = (function () {
    let regularChartInstance = null;
    let pieChartInstance = null;
    function getDataForChart(onlySelected) {
        const grid = getters.grid();
        return {
            store: onlySelected ? grid.getSelectedRowsData() : grid.getDataSource().store(),
            filter: onlySelected ? null : grid.getCombinedFilter(true),
            paginate: false,
        };
    }
    function getChartConfig(dataSource, argument, values, seriesType) {
        const commonConfig = {
            dataSource,
            commonSeriesSettings: {
                argumentField: argument,
            },
            series: values.map(v => ({
                valueField: v, name: v
            })),
            legend: {
                verticalAlignment: 'bottom',
                horizontalAlignment: 'center',
                columnItemSpacing: 24,
                itemTextPosition: 'right',
            },
            animation: { enabled: false }
        };
        return chartData.pieSeriesTypes.includes(seriesType) ? extendPieChartConfig(commonConfig, seriesType) : extendChartConfig(commonConfig, seriesType);
    }

    function extendChartConfig(config, seriesType) {
        config.commonSeriesSettings = {
            ...config.commonSeriesSettings,
            type: seriesType,
        };
        return {
            ...config,
            argumentAxis: {
                label: {
                    displayMode: 'rotate',
                    rotationAngle: 45,
                },
            },
            valueAxis: {
                visible: false,
                tick: { visible: false }
            },
        };
    }
    function extendPieChartConfig(config, seriesType) {
        config.type = seriesType;
        return config;
    }
    function onRegularChartInit(e) {
        regularChartInstance = e.component;
    }

    function onPieChartInit(e) {
        pieChartInstance = e.component;
    }

    function createChart(seriesType) {
        const categoryEditor = getters.categoryEditor();
        const seriesEditor = getters.seriesEditor();
        const chartConfig = getChartConfig(
            getDataForChart(getters.onlySelectedValue()),
            categoryEditor ? categoryEditor.option('value') : defaults.category,
            seriesEditor ? seriesEditor.option('value') : defaults.series,
            seriesType
        );
        
        const isPieChart = chartData.pieSeriesTypes.includes(seriesType);

        if (isPieChart) {
            $('#popup-content-chart').hide();
            $('#popup-content-chart-pie').show();
        } else {
            $('#popup-content-chart-pie').hide();
            $('#popup-content-chart').show();
        }
 
        setTimeout(() => {
            if (isPieChart) {
                if (pieChartInstance) {
                    pieChartInstance.option(chartConfig);
                    return pieChartInstance;
                } else {
                    return null;
                }
            } else {
                if (regularChartInstance) {
                    regularChartInstance.option(chartConfig);
                    return regularChartInstance;
                } else {
                    return null;
                }
            }
        }, 150)
    }

    function getCurrentChart() {
        const isPieVisible = $('#popup-content-chart-pie').is(':visible');
        return isPieVisible ? pieChartInstance : regularChartInstance;
    }

    return {
        createChart,
        getDataForChart,
        getCurrentChart,
        onRegularChartInit,
        onPieChartInit
    };
})();

window.chartAPI = chartAPI;
