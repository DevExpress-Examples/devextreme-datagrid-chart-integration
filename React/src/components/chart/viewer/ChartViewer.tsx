import {
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';

import PieChartViewer from './PieChartViewer';
import CommonChartViewer from './CommonChartViewer';

import { getChartConfig, isPieSeriesType } from '../../../utils/chart-api';
import { useChartPopupContext } from '../popup/ChartPopupContext';

import type { ChartViewerHandle, CommonChartViewerHandle, PieChartViewerHandle } from './types';

import './ChartViewer.css';

const ChartViewer = forwardRef<ChartViewerHandle>(
  function ChartViewer(_props, ref) {
    const {
      chartData: dataSource,
      currentSeriesType: seriesType,
      currentCategory: category,
      currentSeriesFields: seriesFields,
    } = useChartPopupContext();

    const commonChartRef = useRef<CommonChartViewerHandle>(null);
    const pieChartRef = useRef<PieChartViewerHandle>(null);

    const isPie = useMemo(() => isPieSeriesType(seriesType), [seriesType]);

    const config = useMemo(
      () => getChartConfig(dataSource, category, seriesFields, seriesType, isPie),
      [dataSource, category, seriesFields, seriesType, isPie],
    );

    useImperativeHandle(
      ref,
      () => ({
        exportChart(fileName: string, format: string) {
          if (isPie) {
            pieChartRef.current?.exportChart(fileName, format);
          } else {
            commonChartRef.current?.exportChart(fileName, format);
          }
        },
        printChart() {
          if (isPie) {
            pieChartRef.current?.printChart();
          } else {
            commonChartRef.current?.printChart();
          }
        },
      }),
      [isPie],
    );

    if(!seriesType) return null;

    return isPie
      ? <PieChartViewer ref={pieChartRef} config={config} />
      : <CommonChartViewer ref={commonChartRef} config={config} />;
  },
);

export default ChartViewer;
