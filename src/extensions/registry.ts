import { RegistryEntry } from './types';

const REGISTRY_URL = 'https://raw.githubusercontent.com/zarzet/SpotiFLAC-Extension/main/registry.json';

export async function fetchRegistry(): Promise<RegistryEntry[]> {
  const response = await fetch(REGISTRY_URL);
  if (!response.ok) {
    throw new Error(`Registry fetch failed: HTTP ${response.status}`);
  }
  const data = await response.json();

  if (!Array.isArray(data.extensions)) {
    throw new Error('Registry payload is not in the expected format');
  }

  return data.extensions;
}
