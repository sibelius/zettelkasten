/** A round top for the axis, so ticks land on clean numbers: 0 / 5 / 10 / 15 / 20. */
export function niceScale(max: number, ticks = 4): number[] {
  if (max <= 0) {
    return [0, 1];
  }

  const raw = max / ticks;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((n) => n * power).find((n) => n >= raw)!;
  const top = Math.ceil(max / step) * step;

  return Array.from({length: Math.round(top / step) + 1}, (_, i) => Number((i * step).toFixed(6)));
}

/** 1,284 / 12.9K / 1.2M */
export const compact = (value: number) => new Intl.NumberFormat('en-US', {notation: value >= 10000 ? 'compact' : 'standard', maximumFractionDigits: 1}).format(value);
