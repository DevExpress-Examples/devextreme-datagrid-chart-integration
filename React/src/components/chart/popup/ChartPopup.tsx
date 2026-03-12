import { useRef, useCallback, useMemo } from 'react';

import Popup from 'devextreme-react/popup';
import Toolbar, { Item as ToolbarItem } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import Popover from 'devextreme-react/popover';
import DropDownButton from 'devextreme-react/drop-down-button';

import { useScreenSize } from '../../../hooks/useScreenSize';
import { useChartSettings } from '../../../hooks/useChartSettings';
import SeriesTypesTabs from '../series-types-tabs/SeriesTypesTabs';
import ChartViewer from '../viewer/ChartViewer';
import ChartSettings from '../settings/ChartSettings';

import { capitalizeFirst } from '../../../utils/helpers';
import { EXPORT_ITEMS, POPOVER_POSITION, POPOVER_WRAPPER_ATTR, POPUP_WRAPPER_ATTR } from './constants';
import type { ChartViewerHandle } from '../viewer/ChartViewer';
import type { ChartPopupProps } from './types';

import './ChartPopup.css';

function ChartPopup({
  visible,
  chartData,
  onlySelected,
  hasSelectedRows,
  onVisibleChange,
  onOnlySelectedChange,
}: ChartPopupProps) {
  const chartViewerRef = useRef<ChartViewerHandle>(null);
  const { isSmall } = useScreenSize();

  const {
    currentSeriesType,
    currentCategory,
    currentSeriesFields,
    settingsVisible,
    handleSeriesTypeChange,
    handleCategoryChange,
    handleSeriesChange,
    toggleSettings,
    hideSettings,
  } = useChartSettings();

  const popupWidth = useMemo(() => (isSmall ? 576 : 800), [isSmall]);
  const chartTitle = useMemo(
    () => `${capitalizeFirst(currentSeriesType)} Chart`,
    [currentSeriesType],
  );

  const handlePopupHiding = useCallback(() => {
    onVisibleChange(false);
    hideSettings();
  }, [onVisibleChange, hideSettings]);

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

  const renderPopupContent = useCallback(
    () => (
      <div id="popup-content">
        <SeriesTypesTabs isSmall={isSmall} onSeriesTypeChange={handleSeriesTypeChange} />

        <div id="popup-content-data">
          <Toolbar id="popup-content-toolbar">
            <ToolbarItem location="before" render={() => <div className="chart-title">{chartTitle}</div>} />

            <ToolbarItem
              location="after"
              locateInMenu={isSmall ? 'always' : 'auto'}
              render={() => (
                <DropDownButton
                  stylingMode="text"
                  icon="export"
                  text="Export"
                  displayExpr="text"
                  keyExpr="text"
                  items={EXPORT_ITEMS}
                  onItemClick={handleExportItemClick}
                />
              )}
            />

            <ToolbarItem
              location="after"
              locateInMenu={isSmall ? 'always' : 'auto'}
              widget="dxButton"
              options={printButtonOptions}
            />

            <ToolbarItem
              location="after"
              render={() => (
                <Button
                  id="settings-button"
                  stylingMode="text"
                  icon="optionsoutline"
                  text="Settings"
                  onClick={toggleSettings}
                  render={() => (
                    <>
                      <i className="dx-icon dx-icon-optionsoutline" />
                      <span className="dx-button-text">Settings</span>
                      <i className="dx-icon dx-icon-spindown" />
                    </>
                  )}
                />
              )}
            />
          </Toolbar>

          <ChartViewer
            ref={chartViewerRef}
            dataSource={chartData}
            seriesType={currentSeriesType}
            category={currentCategory}
            seriesFields={currentSeriesFields}
          />
        </div>
      </div>
    ),
    [
      isSmall,
      chartTitle,
      chartData,
      currentSeriesType,
      currentCategory,
      currentSeriesFields,
      handleSeriesTypeChange,
      handleExportItemClick,
      printButtonOptions,
      toggleSettings,
    ],
  );

  return (
    <>
      <Popup
        visible={visible}
        width={popupWidth}
        height={550}
        wrapperAttr={POPUP_WRAPPER_ATTR}
        title="Chart Preview"
        onHiding={handlePopupHiding}
        contentRender={renderPopupContent}
      />

      <Popover
        visible={settingsVisible}
        deferRendering={false}
        showTitle={false}
        width={240}
        height="auto"
        shading={false}
        target="#settings-button"
        position={POPOVER_POSITION}
        wrapperAttr={POPOVER_WRAPPER_ATTR}
        onHiding={hideSettings}
      >
        <ChartSettings
          onlySelected={onlySelected}
          hasSelectedRows={hasSelectedRows}
          currentCategory={currentCategory}
          currentSeries={currentSeriesFields}
          onCategoryChange={handleCategoryChange}
          onSeriesChange={handleSeriesChange}
          onOnlySelectedChange={onOnlySelectedChange}
        />
      </Popover>
    </>
  );
}

export default ChartPopup;