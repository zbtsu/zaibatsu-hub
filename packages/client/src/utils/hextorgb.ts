export function hexToRgb<A extends string, T extends boolean>(
  hex: A,
  join?: T
) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const hexArr = result || [0, 0, 0];
  return join ? hexArr.join(",") : (hexArr as number[]);
}
