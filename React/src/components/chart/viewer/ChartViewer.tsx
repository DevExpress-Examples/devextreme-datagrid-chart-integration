import {
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { getChartConfig, isPieSeriesType } from '../../../utils/chart-api';
import type { ChartDataSource } from '../../../utils/chart-api';
import type { CategoryField, SeriesField, SeriesType } from '../../../utils/chart-data';
import { defaults, seriesTypes } from '../../../utils/chart-data';

import PieChartViewer from './PieChartViewer';
import type { PieChartViewerHandle } from './PieChartViewer';
import CommonChartViewer from './CommonChartViewer';
import type { CommonChartViewerHandle } from './CommonChartViewer';

import './ChartViewer.css';

export interface ChartViewerHandle {
  exportChart: (fileName: string, format: string) => void;
  printChart: () => void;
}

interface ChartViewerProps {
  dataSource: ChartDataSource;
  seriesType?: SeriesType;
  category?: CategoryField;
  seriesFields?: SeriesField[];
}

const ChartViewer = forwardRef<ChartViewerHandle, ChartViewerProps>(
  function ChartViewer(
    {
      dataSource,
      seriesType = seriesTypes[defaults.seriesTypeIndex],
      category = defaults.category,
      seriesFields = defaults.series,
    },
    ref,
  ) {
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
