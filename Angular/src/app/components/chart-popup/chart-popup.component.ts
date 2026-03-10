import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    OnDestroy,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ChartViewerComponent } from '../chart-viewer/chart-viewer.component';
import { seriesTypes, pieSeriesTypes, defaults } from '../../utils/chart-data';
import { capitalizeFirst } from '../../utils/helpers';
import { ScreenService } from '../../services/screen.service';
import { getDataForChart } from '../../utils/chart-api';

import type { CategoryField, SeriesField, SeriesType } from '../../utils/chart-data';
import type { ChartDataSource } from '../../utils/chart-api';
import type { GridDataItem } from '../../data/grid-data';

import type { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import type { PositionConfig } from 'devextreme-angular/common/core/animation';
import type dxDataGrid from 'devextreme/ui/data_grid';

@Component({
    selector: 'app-chart-popup',
    standalone: false,
    templateUrl: './chart-popup.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./chart-popup.component.scss']
})
export class ChartPopupComponent implements OnDestroy {

    @Input() visible = false;
    @Input() gridInstance?: dxDataGrid<GridDataItem, number>;
    @Input() onlySelected = false;
    @Input() selectedRowsData: GridDataItem[] = [];

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onlySelectedChange = new EventEmitter<boolean>();

    @ViewChild('chartViewerRef') chartViewerRef?: ChartViewerComponent;

    currentSeriesType: SeriesType = seriesTypes[defaults.seriesTypeIndex];
    currentCategory: CategoryField = defaults.category;
    currentSeriesFields: SeriesField[] = [...defaults.series];
    settingsVisible = false;
    isSmall = false;
    printButtonSettings = { icon: 'print', text: 'Print', stylingMode: 'text', onClick: this.onPrintClick.bind(this) }
    private readonly screenSubscription: Subscription;
    readonly wrapperAttr = { class: 'chart-popup' };
    readonly popoverPosition: PositionConfig = {
        at: { x: 'right', y: 'bottom' },
        my: { x: 'right', y: 'top' },
        offset: { y: -8 },
    };
    readonly exportItems = [
        { icon: 'image', text: 'PNG' },
        { icon: 'pdffile', text: 'PDF' },
        { icon: 'jpgfile', text: 'JPEG' },
        { icon: 'svgfile', text: 'SVG' },
    ];

    get popupWidth(): number {
        return this.isSmall ? 576 : 800;
    }

    get chartTitle(): string {
        return `${capitalizeFirst(this.currentSeriesType)} Chart`;
    }

    get chartDataSource(): ChartDataSource {
        console.log('get_data_source')
        if (!this.gridInstance) {
            return { store: [], paginate: false };
        }
        const result = getDataForChart(this.gridInstance, this.onlySelected);
        return result;
    }

    get isPieSeriesType(): boolean {
        return pieSeriesTypes.includes(this.currentSeriesType);
    }

    constructor(private readonly screenService: ScreenService) {
        this.isSmall = screenService.isSmall();
        this.screenSubscription = screenService.changed.subscribe(() => {
            this.isSmall = screenService.isSmall();
        });
    }

    ngOnDestroy(): void {
        this.screenSubscription.unsubscribe();
    }

    onSeriesTypeChange(newType: SeriesType): void {
        this.currentSeriesType = newType;
    }

    onCategoryChange(newCategory: CategoryField): void {
        this.currentCategory = newCategory;
    }

    onSeriesChange(newSeries: SeriesField[]): void {
        this.currentSeriesFields = newSeries;
    }

    onOnlySelectedChange(value: boolean): void {
        this.onlySelectedChange.emit(value);
    }

    onExportItemClick(e: DxDropDownButtonTypes.ItemClickEvent): void {
        this.chartViewerRef?.exportChart('Grid Data', (e.itemData as { text: string }).text);
    }

    onPrintClick(): void {
        this.chartViewerRef?.printChart();
    }

    toggleSettings(): void {
        this.settingsVisible = !this.settingsVisible;
    }

    onSettingsHiding(): void {
        this.settingsVisible = false;
    }

    onPopupHiding(): void {
        this.visibleChange.emit(false);
        this.settingsVisible = false;
    }
}
