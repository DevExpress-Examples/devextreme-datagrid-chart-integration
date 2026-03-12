using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models;

public class ProductExport {
    public int Id { get; set; }
    public string Product { get; set; }
    public string ExportCategory { get; set; }
    public int ExportValue { get; set; }
    public int TaxPaid { get; set; }
    public int LogisticsCost { get; set; }
    public string ExporterRegion { get; set; }
}
