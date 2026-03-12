export interface ChartSettingsProps {
  onlySelected: boolean;
  hasSelectedRows: boolean;
  currentCategory: CategoryField;
  currentSeries: SeriesField[];
  onCategoryChange: (category: CategoryField) => void;
  onSeriesChange: (series: SeriesField[]) => void;
  onOnlySelectedChange: (value: boolean) => void;
}

export enum ChartSettingsField {
  CategoryAxis = 'CategoryAxis',
  Series = 'Series',
  OnlySelected = 'OnlySelected',
}

export interface ChartSettingsFieldDataChangeEvent {
  dataField?: string;
  value?: unknown;
}