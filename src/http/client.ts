import { NetworkError, TimeoutError } from './errors';

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export async function fetchWithTimeout(url: string, options: RequestOptions = {}): Promise<Response> {
  const { timeoutMs = 10000, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  
  const signal = options.signal || controller.signal;
    
  if (options.signal) {
    options.signal.addEventListener('abort', () => controller.abort());
  }
  
  try {
    const response = await fetch(url, { ...fetchOptions, signal });
    clearTimeout(id);
    if (!response.ok) {
      throw new NetworkError(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new TimeoutError(`Request timed out after ${timeoutMs}ms`);
    }
    throw new NetworkError(error.message || 'Unknown network error');
  }
}
