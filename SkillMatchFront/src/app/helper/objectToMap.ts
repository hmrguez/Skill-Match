export function objectToMap(obj: Record<string, any>): Map<string, number> {
  const map = new Map<string, number>();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      map.set(key, obj[key]);
    }
  }

  return map;
}
