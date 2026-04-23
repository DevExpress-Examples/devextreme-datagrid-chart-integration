const chartData = {
    loadPromise: null,
    seriesTypes: [],
    pieSeriesTypes: [],
    categories: [],
    series: [],
    defaults: {
        seriesTypeIndex: 0,
        category: '',
        series: []
    },

    load() {
        if (this.seriesTypes.length) {
            return Promise.resolve(this);
        }

        if (!this.loadPromise) {
            this.loadPromise = fetch('/api/ChartConfiguration')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load chart configuration: ${response.status}`);
                    }

                    return response.json();
                })
                .then(data => {
                    Object.assign(this, data);
                    return this;
                })
                .catch(error => {
                    this.loadPromise = null;
                    throw error;
                });
        }

        return this.loadPromise;
    }
};

window.chartData = chartData;
