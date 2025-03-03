export interface ApiResponse {
  isSuccessful: boolean;
  error: Error;
}

export interface Error {
  errors: string[];
  errorCode: number;
}

export interface ApiMessage {
  showMessage: boolean;
  message: string;
}
