interface AuthService {
  loginWithRedirect: Function;
}
export interface User {
  authId: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: "DOCTOR" | "PATIENT" | "ADMIN";

  emailVerified: boolean;
  loginCount: number;
  updatedAt: string;
}

export default interface Auth extends AuthService {
  isAuthenticated: boolean;
  loading: boolean;
  logout: Function;
  user: User;
}
