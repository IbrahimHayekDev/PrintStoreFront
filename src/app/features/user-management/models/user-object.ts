export interface UserObject {
  role: Role | null;
  userName: string;
  mobileNumber: string;
  email: string;
}

interface Role {
  id: number;
  name: string;
}
