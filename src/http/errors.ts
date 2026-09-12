export class AppError extends Error {
  public code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends AppError {
  constructor(message: string = 'Request timed out') {
    super(message, 'TIMEOUT_ERROR');
    this.name = 'TimeoutError';
  }
}

export class ProviderError extends AppError {
  constructor(message: string, public providerId: string) {
    super(message, 'PROVIDER_ERROR');
    this.name = 'ProviderError';
  }
}

export class ParseError extends AppError {
  constructor(message: string) {
    super(message, 'PARSE_ERROR');
    this.name = 'ParseError';
  }
}

export class AudioPlaybackError extends AppError {
  constructor(message: string) {
    super(message, 'AUDIO_PLAYBACK_ERROR');
    this.name = 'AudioPlaybackError';
  }
}
