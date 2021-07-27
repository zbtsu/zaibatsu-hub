export const getPercent = (
  value: number | string | undefined,
  total: number
) => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  if (!total || !value) {
    return 0;
  }
  return (value / total) * 100;
};
