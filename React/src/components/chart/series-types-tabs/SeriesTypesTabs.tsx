import { useMemo, useCallback } from 'react';
import Tabs from 'devextreme-react/tabs';

import { seriesTypes, defaults } from '../../../utils/chart-data';
import { getIconExt, capitalizeFirst } from '../../../utils/helpers';
import { useChartPopupContext } from '../popup/ChartPopupContext';

import type { onSeriesTypesSelectionChangedEvent, SeriesTypesTabsProps, TabItem } from './types';

import './SeriesTypesTabs.css';

export default function SeriesTypesTabs({ isSmall }: SeriesTypesTabsProps): JSX.Element {
  const { handleSeriesTypeChange: onSeriesTypeChange } = useChartPopupContext();
  const tabItems = useMemo<TabItem[]>(
    () => seriesTypes.map((st) => ({
      text: capitalizeFirst(st),
      icon: getIconExt(st),
    })),
    [],
  );

  const tabWidth = useMemo(() => (isSmall ? 60 : 150), [isSmall]);

  const handleSelectionChanged = useCallback(
    (e: onSeriesTypesSelectionChangedEvent) => {
      const added = e.addedItems?.[0];
      if (!added) return;
      const index = tabItems.findIndex((item) => item.text === added.text);
      if (index !== -1) {
        onSeriesTypeChange(seriesTypes[index]);
      }
    },
    [tabItems, onSeriesTypeChange],
  );

  return (
    <Tabs
      id="popup-content-series-list"
      items={tabItems}
      width={tabWidth}
      orientation="vertical"
      iconPosition="start"
      defaultSelectedIndex={defaults.seriesTypeIndex}
      onSelectionChanged={handleSelectionChanged}
    />
  );
}
