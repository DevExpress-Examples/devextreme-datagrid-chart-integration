import type { ChartDataSource } from "../../../utils/chart-api";

interface ChartPopupProps {
  visible: boolean;
  chartData: ChartDataSource;
  onlySelected: boolean;
  hasSelectedRows: boolean;
  onVisibleChange: (visible: boolean) => void;
  onOnlySelectedChange: (onlySelected: boolean) => void;
}
