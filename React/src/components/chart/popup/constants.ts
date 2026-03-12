export const EXPORT_ITEMS = [
  { icon: 'image', text: 'PNG' },
  { icon: 'pdffile', text: 'PDF' },
  { icon: 'jpgfile', text: 'JPEG' },
  { icon: 'svgfile', text: 'SVG' },
];

export const POPOVER_POSITION = {
  at: { x: 'right' as const, y: 'bottom' as const },
  my: { x: 'right' as const, y: 'top' as const },
  offset: { x: 0, y: -8 },
};

export const POPUP_WRAPPER_ATTR = { class: 'chart-popup' };
export const POPOVER_WRAPPER_ATTR = { class: 'dx-dropdownbutton-popup-wrapper' };