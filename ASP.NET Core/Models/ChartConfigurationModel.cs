using System.Collections.Generic;
namespace ASP_NET_Core.Models;

public sealed class ChartConfigurationModel
{
    public required IReadOnlyList<string> SeriesTypes { get; init; }
    public required IReadOnlyList<string> PieSeriesTypes { get; init; }
    public required IReadOnlyList<string> Categories { get; init; }
    public required IReadOnlyList<string> Series { get; init; }
    public required ChartDefaultsModel Defaults { get; init; }

    public static ChartConfigurationModel Default => new()
    {
        SeriesTypes =
        [
            "line",
            "area",
            "bar",
            "stackedbar",
            "pie",
            "doughnut"
        ],
        PieSeriesTypes =
        [
            "pie",
            "doughnut"
        ],
        Categories =
        [
            "Product",
            "ExporterRegion"
        ],
        Series =
        [
            "ExportValue",
            "TaxPaid",
            "LogisticsCost"
        ],
        Defaults = new ChartDefaultsModel
        {
            SeriesTypeIndex = 0,
            Category = "Product",
            Series =
            [
                "ExportValue",
                "TaxPaid",
                "LogisticsCost"
            ]
        }
    };
}

public sealed class ChartDefaultsModel
{
    public required int SeriesTypeIndex { get; init; }
    public required string Category { get; init; }
    public required IReadOnlyList<string> Series { get; init; }
}
