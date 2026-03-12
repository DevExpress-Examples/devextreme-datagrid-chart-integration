import { forwardRef, useRef, useImperativeHandle } from 'react';

import PieChartComponent, { type PieChartRef } from 'devextreme-react/pie-chart';
import {
  CommonSeriesSettings,
  Legend,
  Animation,
  Series,
} from 'devextreme-react/pie-chart';

import type dxPieChart from 'devextreme/viz/pie_chart';

import type { ChartConfig } from '../../../utils/chart-api';

export interface PieChartViewerHandle {
  exportChart: (fileName: string, format: string) => void;
  printChart: () => void;
}

interface PieChartViewerProps {
  config: ChartConfig;
}

const PieChartViewer = forwardRef<PieChartViewerHandle, PieChartViewerProps>(
  function PieChartViewer({ config }, ref) {
    const pieChartRef = useRef<PieChartRef>(null);

    useImperativeHandle(
      ref,
      () => ({
        exportChart(fileName: string, format: string) {
          (pieChartRef.current?.instance() as dxPieChart | undefined)?.exportTo(fileName, format);
        },
        printChart() {
          (pieChartRef.current?.instance() as dxPieChart | undefined)?.print();
        },
      }),
      [],
    );

    return (
      <PieChartComponent
        ref={pieChartRef}
        className="popup-content-chart"
        type={config.type as 'pie' | 'doughnut'}
        dataSource={config.dataSource}
      >
        <CommonSeriesSettings argumentField={config.commonSeriesSettings.argumentField} />
        {config.series.map((s) => (
          <Series key={s.valueField} valueField={s.valueField} name={s.name} />
        ))}
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          columnItemSpacing={24}
          itemTextPosition="right"
        />
        <Animation enabled={false} />
      </PieChartComponent>
    );
  },
);

export default PieChartViewer;
