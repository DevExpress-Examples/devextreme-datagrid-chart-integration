import { useCallback, useMemo } from 'react';

import Popup from 'devextreme-react/popup';
import Popover from 'devextreme-react/popover';

import useScreenSize from '../../../hooks/useScreenSize';
import { useChartSettings } from '../../../hooks/useChartSettings';
import PopupContent from './PopupContent.tsx';
import ChartSettings from '../settings/ChartSettings.tsx';

import { POPOVER_POSITION, POPOVER_WRAPPER_ATTR, POPUP_WRAPPER_ATTR } from './constants';
import { ChartPopupContext } from './ChartPopupContext';
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

  const contextValue = useMemo(
    () => ({
      chartData,
      currentSeriesType,
      currentCategory,
      currentSeriesFields,
      onlySelected,
      hasSelectedRows,
      handleSeriesTypeChange,
      handleCategoryChange,
      handleSeriesChange,
      onOnlySelectedChange,
    }),
    [
      chartData,
      currentSeriesType,
      currentCategory,
      currentSeriesFields,
      onlySelected,
      hasSelectedRows,
      handleSeriesTypeChange,
      handleCategoryChange,
      handleSeriesChange,
      onOnlySelectedChange,
    ],
  );

  const popupWidth = useMemo(() => (isSmall ? 576 : 800), [isSmall]);

  const handlePopupHiding = useCallback(() => {
    onVisibleChange(false);
    hideSettings();
  }, [onVisibleChange, hideSettings]);

  const renderPopupContent = useCallback(
    () => (
      <PopupContent toggleSettings={toggleSettings} />
    ),
    [toggleSettings],
  );

  return (
     <ChartPopupContext.Provider value={contextValue}>
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
          <ChartSettings />
        </Popover>
     </ChartPopupContext.Provider>
  );
}

export default ChartPopup;
