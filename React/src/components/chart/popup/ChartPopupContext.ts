import { createContext, useContext } from 'react';

import type { CategoryField, SeriesField, SeriesType } from '../../../utils/chart-data';
import type { ChartDataSource } from '../../../utils/chart-api';

export interface ChartPopupContextValue {
  chartData: ChartDataSource;

  currentSeriesType: SeriesType;
  currentCategory: CategoryField;
  currentSeriesFields: SeriesField[];

  onlySelected: boolean;
  hasSelectedRows: boolean;

  handleSeriesTypeChange: (newType: SeriesType) => void;
  handleCategoryChange: (newCategory: CategoryField) => void;
  handleSeriesChange: (newSeries: SeriesField[]) => void;
  onOnlySelectedChange: (value: boolean) => void;
}

export const ChartPopupContext = createContext<ChartPopupContextValue | null>(null);

export function useChartPopupContext(): ChartPopupContextValue {
  const context = useContext(ChartPopupContext);
  if (!context) {
    throw new Error('useChartPopupContext must be used within a ChartPopupContext.Provider');
  }
  return context;
}
