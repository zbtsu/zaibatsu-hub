export function hexToRgb<A extends string, T extends boolean>(
  hex: A,
  join?: T
) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/gi.exec(hex);
  if (!result) return [0, 0, 0];
  const hexArr = [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
  return join ? hexArr.join(",") : (hexArr as number[]);
}

export function hexToRGBAString<A extends string, T extends number>(
  hex: A,
  alpha: T
) {
  const rgbString = hexToRgb(hex, true);
  return `rgba(${rgbString},${alpha})`;
}
