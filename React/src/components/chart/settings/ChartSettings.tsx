import { useCallback, useMemo } from 'react';
import Form, { SimpleItem, Label } from 'devextreme-react/form';

import { useChartPopupContext } from '../popup/ChartPopupContext';
import { categories, seriesFields } from '../../../utils/chart-data';
import type { CategoryField, SeriesField } from '../../../utils/chart-data';
import { ChartSettingsField, type ChartSettingsFieldDataChangeEvent } from './types.d';

import 'devextreme/ui/select_box';
import 'devextreme/ui/tag_box';
import 'devextreme/ui/switch';

import './ChartSettings.css';

export default function ChartSettings(): JSX.Element {
  const {
    onlySelected,
    hasSelectedRows,
    currentCategory,
    currentSeriesFields: currentSeries,
    handleCategoryChange: onCategoryChange,
    handleSeriesChange: onSeriesChange,
    onOnlySelectedChange,
  } = useChartPopupContext();
  const formData = useMemo(
    () => ({
      [ChartSettingsField.CategoryAxis]: currentCategory,
      [ChartSettingsField.Series]: currentSeries,
      [ChartSettingsField.OnlySelected]: onlySelected,
    }),
    [currentCategory, currentSeries, onlySelected],
  );

  const categoryEditorOptions = useMemo(
    () => ({
      items: categories,
      value: currentCategory,
    }),
    [currentCategory],
  );

  const seriesEditorOptions = useMemo(
    () => ({
      items: seriesFields,
      value: currentSeries,
    }),
    [currentSeries],
  );

  const onlySelectedEditorOptions = useMemo(
    () => ({
      elementAttr: { id: 'only-selected-box' },
      value: onlySelected,
      disabled: !hasSelectedRows,
    }),
    [onlySelected, hasSelectedRows],
  );

  const handleFieldDataChanged = useCallback(
    (e: ChartSettingsFieldDataChangeEvent) => {
      const isCategoryChange = e.dataField === ChartSettingsField.CategoryAxis && typeof e.value === 'string';
      const isSeriesChange = e.dataField === ChartSettingsField.Series && Array.isArray(e.value);
      const isOnlySelectedChange = e.dataField === ChartSettingsField.OnlySelected && typeof e.value === 'boolean';

      if (isCategoryChange) {
        onCategoryChange(e.value as CategoryField);
      } else if (isSeriesChange) {
        onSeriesChange(e.value as SeriesField[]);
      } else if (isOnlySelectedChange) {
        onOnlySelectedChange(e.value as boolean);
      }
    },
    [onCategoryChange, onSeriesChange, onOnlySelectedChange],
  );

  return (
    <div id="popup-content-data-panel">
      <Form
        id="popup-data-form"
        formData={formData}
        labelMode="outside"
        showColonAfterLabel={false}
        onFieldDataChanged={handleFieldDataChanged}
      >
        <SimpleItem
          dataField={ChartSettingsField.CategoryAxis}
          editorType="dxSelectBox"
          editorOptions={categoryEditorOptions}
        />
        <SimpleItem
          dataField={ChartSettingsField.Series}
          editorType="dxTagBox"
          editorOptions={seriesEditorOptions}
        />
        <SimpleItem
          dataField={ChartSettingsField.OnlySelected}
          editorType="dxSwitch"
          cssClass="label-v-center"
          editorOptions={onlySelectedEditorOptions}
        >
          <Label location="left" alignment="left" />
        </SimpleItem>
      </Form>
    </div>
  );
}
