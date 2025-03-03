import { ApiResponse } from '../../../shared/models/api-response';

export interface UserByIdResponse extends ApiResponse {
  data: UserByIdResponseData | null;
}

interface UserByIdResponseData {
  role: Role;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
}

interface Role {
  id: number;
  name: string;
}
