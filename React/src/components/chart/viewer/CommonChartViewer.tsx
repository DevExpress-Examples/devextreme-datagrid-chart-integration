import { forwardRef, useRef, useImperativeHandle } from 'react';

import ChartComponent, { type ChartRef } from 'devextreme-react/chart';
import {
  CommonSeriesSettings,
  Legend,
  Animation,
  ArgumentAxis,
  Label,
  ValueAxis,
  Tick,
  Series,
} from 'devextreme-react/chart';

import type dxChart from 'devextreme/viz/chart';
import type { SeriesType as DevExtremeSeriesType } from 'devextreme/common/charts';
import type { CommonChartViewerHandle, CommonChartViewerProps } from './types';

const CommonChartViewer = forwardRef<CommonChartViewerHandle, CommonChartViewerProps>(
  ({ config }, ref) => {
    const chartRef = useRef<ChartRef>(null);

    useImperativeHandle(
      ref,
      () => ({
        exportChart(fileName: string, format: string) {
          (chartRef.current?.instance() as dxChart | undefined)?.exportTo(fileName, format);
        },
        printChart() {
          (chartRef.current?.instance() as dxChart | undefined)?.print();
        },
      }),
      [],
    );

    return (
      <ChartComponent
        ref={chartRef}
        className="popup-content-chart"
        dataSource={config.dataSource}
      >
        <CommonSeriesSettings
          argumentField={config.commonSeriesSettings.argumentField}
          type={config.commonSeriesSettings.type as DevExtremeSeriesType}
        />
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
        <ArgumentAxis>
          <Label displayMode="rotate" rotationAngle={45} />
        </ArgumentAxis>
        <ValueAxis visible={false}>
          <Tick visible={false} />
        </ValueAxis>
      </ChartComponent>
    );
  },
);

CommonChartViewer.displayName = 'CommonChartViewer';

export default CommonChartViewer;
