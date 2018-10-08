export interface UserResponse {
  status: number;
  userModel: UserModel;
}

export interface UserModel {
  id: number;
  avatar: string;
  phone: string;
  nickname: string;
  role: string[];
  details: string;
}
