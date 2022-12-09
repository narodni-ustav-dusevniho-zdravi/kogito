export const LINK_BASE = 'https://files.kogito.cz/static';

export function toLink(fileName: string): string {
  return `${LINK_BASE}/${fileName}`;
}

export function toDuration(
  hours: number,
  minutes: number,
  seconds: number,
): number {
  return hours * 60 * 60 + minutes * 60 + seconds;
}
