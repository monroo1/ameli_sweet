export interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
  name: string;
  phone: string;
  role: string;
}

export interface UserAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface UserRegisterRequest {
  email: string;
  name: string;
  phone: string;
  password: string;
  role: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
