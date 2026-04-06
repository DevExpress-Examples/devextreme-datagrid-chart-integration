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

    // Initialize regular chart instance
    function onRegularChartInit(e) {
        regularChartInstance = e.component;
        console.log(regularChartInstance)
        console.log('Regular chart initialized');
    }

    // Initialize pie chart instance
    function onPieChartInit(e) {
        pieChartInstance = e.component;
        console.log('Pie chart initialized');
    }

    // Main createChart function - adapted for pre-rendered charts
    function createChart(container, seriesType) {
        const categoryEditor = getters.categoryEditor();
        const seriesEditor = getters.seriesEditor();
        const chartConfig = getChartConfig(
            getDataForChart(getters.onlySelectedValue()),
            categoryEditor ? categoryEditor.option('value') : defaults.category,
            seriesEditor ? seriesEditor.option('value') : defaults.series,
            seriesType
        );
        //return chartData.pieSeriesTypes.includes(seriesType)
        //    ? container.dxPieChart(chartConfig).dxPieChart('instance')
        //    : container.dxChart(chartConfig).dxChart('instance')
        const isPieChart = chartData.pieSeriesTypes.includes(seriesType);

        // Toggle visibility
        $('#popup-content-chart').toggle(!isPieChart);
        $('#popup-content-chart-pie').toggle(isPieChart);

        // Apply configuration to the appropriate chart instance
        if (isPieChart) {
            if (pieChartInstance) {
                // Apply full configuration
                pieChartInstance.option(chartConfig);
                return pieChartInstance;
            } else {
                console.warn('Pie chart instance not yet initialized');
                return null;
            }
        } else {
            if (regularChartInstance) {
                // Apply full configuration
                regularChartInstance.option(chartConfig);
                return regularChartInstance;
            } else {
                console.warn('Regular chart instance not yet initialized');
                return null;
            }
        }
    }

    // Refresh current chart
    function refreshChart() {
        const currentSeriesType = getters.currentSeriesType();
        return createChart(null, currentSeriesType);
    }

    // Get current active chart instance
    function getCurrentChart() {
        const isPieVisible = $('[data-chart-type="pie"]').is(':visible');
        return isPieVisible ? pieChartInstance : regularChartInstance;
    }

    return {
        createChart,
        refreshChart,
        getDataForChart,
        getCurrentChart,
        onRegularChartInit,
        onPieChartInit
    };
})();

window.chartAPI = chartAPI;

// Expose init functions globally for Razor OnInitialized callbacks
window.onRegularChartInit = (e) => chartAPI.onRegularChartInit(e);
window.onPieChartInit = (e) => chartAPI.onPieChartInit(e);
