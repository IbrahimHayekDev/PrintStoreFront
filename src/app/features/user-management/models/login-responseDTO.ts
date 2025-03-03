import { ApiResponse } from '../../../shared/models/api-response';

export interface loginResponseDTO extends ApiResponse {
  data: {
    role: Role;
    token: string;
    FirstName: string;
    LastName: string;
    MobileNumber: string;
    email: string;
  };
}

interface Role {
  id: number;
  name: string;
}
