export function getYearRange(startYear: number) {
  const currentYear = new Date().getFullYear();
  return startYear === currentYear
    ? `${startYear}`
    : `${startYear}–${currentYear}`;
}
