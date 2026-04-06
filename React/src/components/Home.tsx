import React, { useMemo, useCallback } from 'react';

import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  Paging,
  Toolbar,
  Item as ToolbarItem,
} from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';

import ChartPopup from './chart/popup/ChartPopup.tsx';
import { useGridData } from '../hooks/useGridData';
import { getIcon } from '../utils/helpers';

import './Home.css';

export default function Home(): JSX.Element {
  const {
    gridRef,
    gridDataSource,
    chartData,
    chartPopupVisible,
    isDataGridEmpty,
    hasSelectedRows,
    onlySelected,
    showChartPopup,
    handleRowClick,
    handleSelectionChanged,
    handleContextMenuPreparing,
    handleVisibleChange,
    handleOnlySelectedChange,
  } = useGridData();

  const generateChartButtonIcon = useMemo(() => getIcon('pie', false), []);

  const renderChartButton = useCallback(
    () => (
      <Button
        stylingMode="contained"
        type="default"
        text="Generate Chart"
        disabled={isDataGridEmpty}
        onClick={showChartPopup}
        render={() => (
          <React.Fragment>
            <i
              className="dx-icon dx-svg-icon"
              dangerouslySetInnerHTML={{ __html: generateChartButtonIcon }}
            />
            <span className="dx-button-text">Generate Chart</span>
          </React.Fragment>
        )}
      />
    ),
    [isDataGridEmpty, showChartPopup, generateChartButtonIcon],
  );

  return (
    <div className="demo-container">
      <DataGrid
        ref={gridRef}
        id="grid"
        dataSource={gridDataSource}
        showBorders={true}
        columnAutoWidth={true}
        onRowClick={handleRowClick}
        onSelectionChanged={handleSelectionChanged}
        onContextMenuPreparing={handleContextMenuPreparing}
      >
        <Selection mode="multiple" />
        <HeaderFilter visible={true} />
        <FilterRow visible={true} />
        <Paging pageSize={10} />

        <Toolbar visible={true}>
          <ToolbarItem location="after" render={renderChartButton} />
        </Toolbar>

        <Column dataField="Product" width={170} />
        <Column dataField="ExporterRegion" width={170} />
        <Column dataField="ExportCategory" caption="Category" width={170} />
        <Column dataField="ExportValue" />
        <Column dataField="TaxPaid" />
        <Column dataField="LogisticsCost" />
      </DataGrid>

      <ChartPopup
        visible={chartPopupVisible}
        chartData={chartData}
        onlySelected={onlySelected}
        hasSelectedRows={hasSelectedRows}
        onVisibleChange={handleVisibleChange}
        onOnlySelectedChange={handleOnlySelectedChange}
      />
    </div>
  );
}
