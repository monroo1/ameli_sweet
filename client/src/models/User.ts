export interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
  name: string;
  phone: string;
}

export interface UserRegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface UserRegisterRequest {
  email: string;
  name: string;
  phone: number;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
