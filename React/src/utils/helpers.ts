import type { SeriesType } from './chart-data';

export function getIcon(seriesType: SeriesType, isOutline: boolean): string {
  const iconName = `data${seriesType}${isOutline ? 'outline' : 'filled'}`;
  return `<svg class="custom-icon ${iconName}"><use xlink:href="#${iconName}"></use></svg>`;
}

export function getIconExt(seriesType: SeriesType): string {
  return `<svg class="custom-icon">
    <use class='icon-outline' xlink:href="#data${seriesType}outline"></use>
    <use class='icon-filled' xlink:href="#data${seriesType}filled"></use>
  </svg>`;
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
