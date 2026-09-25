// Small formatting helpers shared across page templates.

export function formatInches(value: number | null): string | null {
  if (value === null) return null;
  return `${value}"`;
}

export function formatNumber(value: number | null): string | null {
  if (value === null) return null;
  return value.toLocaleString("en-US");
}

export function cityStateLabel(cityName: string, stateAbbr: string): string {
  return `${cityName}, ${stateAbbr}`;
}
