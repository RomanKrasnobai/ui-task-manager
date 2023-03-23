export interface UserModel {
  token: string;
  user: User;
}

export interface User {
  age: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  _v: number;
  _id: string;
}
