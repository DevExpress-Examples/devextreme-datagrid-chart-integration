using System.Collections.Generic;

namespace ASP_NET_Core.Models;

public class ChartConfiguration {
    public static readonly string[] SeriesTypes = ["bar", "line", "area", "spline", "stepline", "stackedbar", "stackedline"];

    public static readonly string[] PieSeriesTypes = ["pie", "doughnut"];

    public static readonly string[] Categories = ["Product", "ExportCategory", "ExporterRegion"];

    public static readonly string[] SeriesFields = ["ExportValue", "TaxPaid", "LogisticsCost"];

    public static readonly string[] SeriesNames = ["Export Value", "Tax Paid", "Logistics Cost"];

    public static class Defaults {
        public const string Category = "Product";
        public const int SeriesTypeIndex = 0;
        public static readonly string[] Series = ["ExportValue", "TaxPaid", "LogisticsCost"];
    }

    public static Dictionary<string, string> SeriesTypeIcons = new()
    {
        { "bar", "chart" },
        { "line", "chartline" },
        { "area", "chartarea" },
        { "spline", "chartspline" },
        { "stepline", "chartstepline" },
        { "stackedbar", "chartstackedbar" },
        { "stackedline", "chartstackedline" },
        { "pie", "chartpie" },
        { "doughnut", "chartdoughnut" }
    };
}
