const chartAPI = (function() {
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

    function createChart(container, seriesType) {
        const categoryEditor = getters.categoryEditor();
        const seriesEditor = getters.seriesEditor();
        const chartConfig = getChartConfig(
            getDataForChart(getters.onlySelectedValue()),
            categoryEditor ? categoryEditor.option('value') : defaults.category,
            seriesEditor ? seriesEditor.option('value') : defaults.series,
            seriesType
        );
        return chartData.pieSeriesTypes.includes(seriesType)
            ? container.dxPieChart(chartConfig).dxPieChart('instance')
            : container.dxChart(chartConfig).dxChart('instance')
    }


    return {
        createChart,
        getDataForChart,
    };
})();

window.chartAPI = chartAPI;
