import { Injectable } from '@angular/core';

export interface GridDataItem {
  Id: number;
  Product: string;
  ExportCategory: string;
  ExportValue: number;
  TaxPaid: number;
  LogisticsCost: number;
  ExporterRegion: string;
}

const gridData: GridDataItem[] = [
  { Id: 1, Product: 'Wheat', ExportCategory: 'Agriculture', ExportValue: 1250000, TaxPaid: 95000, LogisticsCost: 140000, ExporterRegion: 'North Region' },
  { Id: 2, Product: 'Corn', ExportCategory: 'Agriculture', ExportValue: 980000, TaxPaid: 72000, LogisticsCost: 110000, ExporterRegion: 'Valley District' },
  { Id: 3, Product: 'Fresh Apples', ExportCategory: 'Agriculture', ExportValue: 740000, TaxPaid: 52000, LogisticsCost: 98000, ExporterRegion: 'Orchard Belt' },

  { Id: 4, Product: 'Textile Fabric', ExportCategory: 'Manufacturing', ExportValue: 980000, TaxPaid: 74000, LogisticsCost: 90000, ExporterRegion: 'Central Industrial Area' },
  { Id: 5, Product: 'Furniture', ExportCategory: 'Manufacturing', ExportValue: 860000, TaxPaid: 68000, LogisticsCost: 105000, ExporterRegion: 'Forest Industrial Area' },
  { Id: 6, Product: 'Plastic Packaging', ExportCategory: 'Manufacturing', ExportValue: 930000, TaxPaid: 71000, LogisticsCost: 88000, ExporterRegion: 'Polymer Cluster' },
  { Id: 7, Product: 'Glass Bottles', ExportCategory: 'Manufacturing', ExportValue: 770000, TaxPaid: 59000, LogisticsCost: 82000, ExporterRegion: 'Glassworks Zone' },

  { Id: 8, Product: 'Refined Oil', ExportCategory: 'Energy', ExportValue: 2890000, TaxPaid: 320000, LogisticsCost: 260000, ExporterRegion: 'Coastal Zone' },
  { Id: 9, Product: 'Natural Gas', ExportCategory: 'Energy', ExportValue: 3340000, TaxPaid: 410000, LogisticsCost: 310000, ExporterRegion: 'Offshore Fields' },
  { Id: 10, Product: 'Coal', ExportCategory: 'Energy', ExportValue: 2100000, TaxPaid: 245000, LogisticsCost: 230000, ExporterRegion: 'Eastern Basin' },

  { Id: 11, Product: 'Solar Panels', ExportCategory: 'Technology', ExportValue: 3150000, TaxPaid: 255000, LogisticsCost: 190000, ExporterRegion: 'Green Energy Zone' },
  { Id: 12, Product: 'Electronic Components', ExportCategory: 'Technology', ExportValue: 4250000, TaxPaid: 360000, LogisticsCost: 220000, ExporterRegion: 'Tech Assembly Park' },
  { Id: 13, Product: 'Industrial Sensors', ExportCategory: 'Technology', ExportValue: 1980000, TaxPaid: 164000, LogisticsCost: 145000, ExporterRegion: 'Innovation Hub' },

  { Id: 14, Product: 'Steel Sheets', ExportCategory: 'Metallurgy', ExportValue: 2650000, TaxPaid: 210000, LogisticsCost: 240000, ExporterRegion: 'Heavy Industry Belt' },
  { Id: 15, Product: 'Aluminum Ingots', ExportCategory: 'Metallurgy', ExportValue: 3720000, TaxPaid: 310000, LogisticsCost: 280000, ExporterRegion: 'Smelting District' },
  { Id: 16, Product: 'Copper Ore', ExportCategory: 'Metallurgy', ExportValue: 3400000, TaxPaid: 285000, LogisticsCost: 300000, ExporterRegion: 'Mining Zone' },

  { Id: 17, Product: 'Fertilizers', ExportCategory: 'Chemicals', ExportValue: 2480000, TaxPaid: 205000, LogisticsCost: 185000, ExporterRegion: 'Chemical Valley' },
  { Id: 18, Product: 'Industrial Plastics', ExportCategory: 'Chemicals', ExportValue: 1890000, TaxPaid: 152000, LogisticsCost: 165000, ExporterRegion: 'Polymer Hub' },
  { Id: 19, Product: 'Paint Additives', ExportCategory: 'Chemicals', ExportValue: 1320000, TaxPaid: 98000, LogisticsCost: 120000, ExporterRegion: 'Coating Cluster' },

  { Id: 20, Product: 'Wine', ExportCategory: 'Food & Beverages', ExportValue: 1120000, TaxPaid: 86000, LogisticsCost: 90000, ExporterRegion: 'Highland Zone' },
  { Id: 21, Product: 'Cheese', ExportCategory: 'Food & Beverages', ExportValue: 1040000, TaxPaid: 79000, LogisticsCost: 85000, ExporterRegion: 'Mountain Farms' },
  { Id: 22, Product: 'Meat', ExportCategory: 'Food & Beverages', ExportValue: 1560000, TaxPaid: 118000, LogisticsCost: 130000, ExporterRegion: 'Southern Plains' },
  { Id: 23, Product: 'Water', ExportCategory: 'Food & Beverages', ExportValue: 610000, TaxPaid: 47000, LogisticsCost: 65000, ExporterRegion: 'Spring Source Area' },
];

@Injectable({
  providedIn: 'root',
})
export class GridDataService {
  getData(): GridDataItem[] {
    return gridData;
  }
}
