import { ApiResponse } from '../../../shared/models/api-response';

export interface LoginResponse extends ApiResponse {
  data: LoginResponseData | null;
}

interface LoginResponseData {
  role: Role;
  token: string;
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  email: string;
}

interface Role {
  id: number;
  name: string;
}
