import type { ChartConfig } from '../../../utils/chart-api';

export interface ChartViewerHandle {
  exportChart: (fileName: string, format: string) => void;
  printChart: () => void;
}

export interface CommonChartViewerHandle {
  exportChart: (fileName: string, format: string) => void;
  printChart: () => void;
}

export interface CommonChartViewerProps {
  config: ChartConfig;
}

export interface PieChartViewerHandle {
  exportChart: (fileName: string, format: string) => void;
  printChart: () => void;
}

export interface PieChartViewerProps {
  config: ChartConfig;
}
