export interface SeriesTypesTabsProps {
  isSmall: boolean;
}

export interface TabItem {
  text: string;
  icon: string;
}

export interface onSeriesTypesSelectionChangedEvent { addedItems?: TabItem[] }