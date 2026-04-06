import {
  useRef, useState, useCallback, useMemo,
} from 'react';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import type { DataGridRef } from 'devextreme-react/data-grid';
import type { RowClickEvent, SelectionChangedEvent, ContextMenuPreparingEvent } from 'devextreme/ui/data_grid';

import { gridData } from '../data/grid-data';
import type { GridDataItem } from '../data/grid-data';
import { getIcon } from '../utils/helpers';
import { getDataForChart } from '../utils/chart-api';
import type { ChartDataSource } from '../utils/chart-api';

const dataStore = new ArrayStore<GridDataItem, number>({
  data: gridData,
  key: 'Id',
});

export interface GridDataState {
  gridRef: React.RefObject<DataGridRef<GridDataItem, number>>;
  gridDataSource: DataSource<GridDataItem, number>;
  chartData: ChartDataSource;
  chartPopupVisible: boolean;
  isDataGridEmpty: boolean;
  hasSelectedRows: boolean;
  onlySelected: boolean;
  showChartPopup: () => void;
  handleRowClick: (e: RowClickEvent<GridDataItem, number>) => void;
  handleSelectionChanged: (e: SelectionChangedEvent<GridDataItem, number>) => void;
  handleContextMenuPreparing: (e: ContextMenuPreparingEvent<GridDataItem, number>) => void;
  handleVisibleChange: (visible: boolean) => void;
  handleOnlySelectedChange: (value: boolean) => void;
}

export function useGridData(): GridDataState {
  const gridRef = useRef<DataGridRef>(null) as React.RefObject<DataGridRef<GridDataItem, number>>;

  const [chartPopupVisible, setChartPopupVisible] = useState(false);
  const [isDataGridEmpty, setIsDataGridEmpty] = useState(false);
  const [hasSelectedRows, setHasSelectedRows] = useState(false);
  const [onlySelected, setOnlySelected] = useState(false);
  const [selectedRowsData, setSelectedRowsData] = useState<GridDataItem[]>([]);
  const [chartData, setChartData] = useState<ChartDataSource>({ store: [], paginate: false });

  const updateChartData = useCallback(
    (
      selected: GridDataItem[] = selectedRowsData,
      onlySelectedOverride: boolean = onlySelected,
    ) => {
      const instance = gridRef.current?.instance();
      const filter = instance?.getCombinedFilter(true) ?? null;
      setChartData(getDataForChart(dataStore, filter, selected, onlySelectedOverride));
    },
    [selectedRowsData, onlySelected],
  );

  const gridDataSource = useMemo(() => new DataSource<GridDataItem, number>({
    store: dataStore,
    onChanged: () => {
      const totalCount = gridRef.current?.instance()?.totalCount() ?? 0;
      setIsDataGridEmpty(totalCount === 0);
      updateChartData();
    },
  }), [updateChartData]);

  const showChartPopup = useCallback(() => {
    setChartPopupVisible(true);
  }, []);

  const handleRowClick = useCallback((e: RowClickEvent<GridDataItem, number>) => {
    if (e.component.isRowSelected(e.key)) {
      e.component.deselectRows([e.key]);
    } else {
      e.component.selectRows([e.key], true);
    }
  }, []);

  const handleSelectionChanged = useCallback(
    (e: SelectionChangedEvent<GridDataItem, number>) => {
      const selected = e.component.getSelectedRowsData();
      const hasSelected = selected.length > 0;
      setHasSelectedRows(hasSelected);
      setSelectedRowsData(selected);
      setOnlySelected(hasSelected);

      const instance = gridRef.current?.instance();
      const filter = instance?.getCombinedFilter(true) ?? null;
      setChartData(getDataForChart(dataStore, filter, selected, hasSelected));
    },
    [],
  );

  const handleContextMenuPreparing = useCallback(
    (e: ContextMenuPreparingEvent<GridDataItem, number>) => {
      if (e.target === 'content') {
        e.items = [
          {
            text: 'Generate Chart',
            icon: getIcon('pie', true),
            disabled: isDataGridEmpty,
            onItemClick: () => showChartPopup(),
          },
        ];
      }
    },
    [isDataGridEmpty, showChartPopup],
  );

  const handleVisibleChange = useCallback((visible: boolean) => {
    setChartPopupVisible(visible ?? false);
  }, []);

  const handleOnlySelectedChange = useCallback(
    (value: boolean) => {
      setOnlySelected(value);
      const instance = gridRef.current?.instance();
      const filter = instance?.getCombinedFilter(true) ?? null;
      setChartData(getDataForChart(dataStore, filter, selectedRowsData, value));
    },
    [selectedRowsData],
  );

  return {
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
  };
}
