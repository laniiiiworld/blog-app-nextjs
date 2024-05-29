export function mapToJSON<V>(mapData: Map<string, V>): { [key: string]: V } {
  const obj: { [key: string]: V } = {};
  for (const [key, value] of mapData) {
    obj[key] = value;
  }
  return obj;
}

export function jsonToMap<V>(jsonData: { [key: string]: V }) {
  const map = new Map<string, V>();
  for (const key in jsonData) {
    map.set(key, jsonData[key]);
  }
  return map;
}
