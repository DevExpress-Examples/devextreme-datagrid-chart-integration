import { useState, useCallback } from 'react';

import { seriesTypes, defaults } from '../utils/chart-data';
import type { CategoryField, SeriesField, SeriesType } from '../utils/chart-data';

export interface ChartSettingsState {
  currentSeriesType: SeriesType;
  currentCategory: CategoryField;
  currentSeriesFields: SeriesField[];
  settingsVisible: boolean;
  handleSeriesTypeChange: (newType: SeriesType) => void;
  handleCategoryChange: (newCategory: CategoryField) => void;
  handleSeriesChange: (newSeries: SeriesField[]) => void;
  toggleSettings: () => void;
  hideSettings: () => void;
}

export function useChartSettings(): ChartSettingsState {
  const [currentSeriesType, setCurrentSeriesType] = useState<SeriesType>(
    seriesTypes[defaults.seriesTypeIndex],
  );
  const [currentCategory, setCurrentCategory] = useState<CategoryField>(defaults.category);
  const [currentSeriesFields, setCurrentSeriesFields] = useState<SeriesField[]>([
    ...defaults.series,
  ]);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleSeriesTypeChange = useCallback((newType: SeriesType) => {
    setCurrentSeriesType(newType);
  }, []);

  const handleCategoryChange = useCallback((newCategory: CategoryField) => {
    setCurrentCategory(newCategory);
  }, []);

  const handleSeriesChange = useCallback((newSeries: SeriesField[]) => {
    setCurrentSeriesFields(newSeries);
  }, []);

  const toggleSettings = useCallback(() => {
    setSettingsVisible((prev) => !prev);
  }, []);

  const hideSettings = useCallback(() => {
    setSettingsVisible(false);
  }, []);

  return {
    currentSeriesType,
    currentCategory,
    currentSeriesFields,
    settingsVisible,
    handleSeriesTypeChange,
    handleCategoryChange,
    handleSeriesChange,
    toggleSettings,
    hideSettings,
  };
}
