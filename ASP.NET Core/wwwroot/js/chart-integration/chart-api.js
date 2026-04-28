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

    function toggleChartVisibility(isPieChart) {
        $('#popup-content-chart').toggle(!isPieChart);
        $('#popup-content-chart-pie').toggle(isPieChart);
    }

    function createChart(seriesType) {
        const categoryValue =
            getters.categoryEditor()?.option('value') ?? chartData.defaults.category;

        const seriesValue =
            getters.seriesEditor()?.option('value') ?? chartData.defaults.series;

        const isPieChart = chartData.pieSeriesTypes.includes(seriesType);

        const chartConfig = getChartConfig(
            getDataForChart(getters.onlySelectedValue()),
            categoryValue,
            seriesValue,
            seriesType
        );

        toggleChartVisibility(isPieChart);

        if (isPieChart && pieChartInstance) {
            pieChartInstance.option(chartConfig);
            pieChartInstance.render();
        }

        if (!isPieChart && regularChartInstance) {
            regularChartInstance.option(chartConfig);
            regularChartInstance.render();
        }       
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
