import React, { useRef, useCallback, useMemo } from 'react';

import Toolbar, { Item as ToolbarItem } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';

import useScreenSize from '../../../hooks/useScreenSize';
import { useChartPopupContext } from './ChartPopupContext';
import SeriesTypesTabs from '../series-types-tabs/SeriesTypesTabs.tsx';
import ChartViewer from '../viewer/ChartViewer.tsx';

import { capitalizeFirst } from '../../../utils/helpers';
import { EXPORT_ITEMS } from './constants';
import type { ChartViewerHandle } from '../viewer/types';

interface PopupContentProps {
  toggleSettings: () => void;
}

function ChartTitle({ title }: { title: string }) {
  return <div className="chart-title">{title}</div>;
}

function SettingsButtonContent() {
  return (
    <React.Fragment>
      <i className="dx-icon dx-icon-optionsoutline" />
      <span className="dx-button-text">Settings</span>
      <i className="dx-icon dx-icon-spindown" />
    </React.Fragment>
  );
}

function PopupContent({ toggleSettings }: PopupContentProps) {
  const chartViewerRef = useRef<ChartViewerHandle>(null);
  const { isSmall } = useScreenSize();
  const { currentSeriesType } = useChartPopupContext();

  const chartTitle = useMemo(
    () => `${capitalizeFirst(currentSeriesType)} Chart`,
    [currentSeriesType],
  );

  const locateInMenu = isSmall ? 'always' : 'auto';

  const handleExportItemClick = useCallback(
    (e: { itemData?: { text: string } }) => {
      if (e.itemData) {
        chartViewerRef.current?.exportChart('Grid Data', e.itemData.text);
      }
    },
    [],
  );

  const handlePrintClick = useCallback(() => {
    chartViewerRef.current?.printChart();
  }, []);

  const printButtonOptions = useMemo(
    () => ({
      icon: 'print',
      text: 'Print',
      stylingMode: 'text' as const,
      onClick: handlePrintClick,
    }),
    [handlePrintClick],
  );

  const renderChartTitle = useCallback(
    () => <ChartTitle title={chartTitle} />,
    [chartTitle],
  );

  const exportButtonOptions = useMemo(
    () => ({
      stylingMode: 'text' as const,
      icon: 'export',
      text: 'Export',
      displayExpr: 'text',
      keyExpr: 'text',
      items: EXPORT_ITEMS,
      onItemClick: handleExportItemClick,
    }),
    [handleExportItemClick],
  );

  const settingsButtonOptions = useMemo(
    () => ({
      id: 'settings-button',
      stylingMode: 'text' as const,
      icon: 'optionsoutline',
      text: 'Settings',
      onClick: toggleSettings,
      render: SettingsButtonContent,
    }),
    [toggleSettings],
  );

  const renderSettingsButton = useCallback(
    () => <Button {...settingsButtonOptions} />,
    [settingsButtonOptions],
  );

  return (
    <div id="popup-content">
      <SeriesTypesTabs isSmall={isSmall} />

      <div id="popup-content-data">
        <Toolbar id="popup-content-toolbar" key={locateInMenu}>
          <ToolbarItem location="before" render={renderChartTitle} />

          <ToolbarItem location="after" locateInMenu={locateInMenu} widget="dxDropDownButton" options={exportButtonOptions} />

          <ToolbarItem location="after" locateInMenu={locateInMenu} widget="dxButton" options={printButtonOptions} />

          <ToolbarItem location="after" render={renderSettingsButton} />
        </Toolbar>

        <ChartViewer ref={chartViewerRef} />
      </div>
    </div>
  );
}

export default PopupContent;
