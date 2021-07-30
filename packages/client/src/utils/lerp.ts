export const lerp = (
  num: number | string,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) => {
  if (typeof num === "string") num = parseFloat(num);
  if (!num) return 0;
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
