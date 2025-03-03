import { ApiResponse } from '../../../shared/models/api-response';

export interface SignupResponse extends ApiResponse {
  data: SignupResponseData | null;
}

export interface SignupResponseData {
  email: string;
}
