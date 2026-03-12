import { useMemo, useCallback } from 'react';
import Tabs from 'devextreme-react/tabs';

import { seriesTypes, defaults } from '../../../utils/chart-data';
import { getIconExt, capitalizeFirst } from '../../../utils/helpers';
import type { SeriesType } from '../../../utils/chart-data';

import './SeriesTypesTabs.css';

interface SeriesTypesTabsProps {
  isSmall: boolean;
  onSeriesTypeChange: (seriesType: SeriesType) => void;
}

interface TabItem {
  text: string;
  icon: string;
}

export default function SeriesTypesTabs({
  isSmall,
  onSeriesTypeChange,
}: SeriesTypesTabsProps): JSX.Element {
  const tabItems = useMemo<TabItem[]>(
    () =>
      seriesTypes.map((st) => ({
        text: capitalizeFirst(st),
        icon: getIconExt(st),
      })),
    [],
  );

  const tabWidth = useMemo(() => (isSmall ? 60 : 150), [isSmall]);

  const handleSelectionChanged = useCallback(
    (e: { addedItems?: TabItem[] }) => {
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
