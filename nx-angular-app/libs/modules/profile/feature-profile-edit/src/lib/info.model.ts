export interface UserInfo {
  user: User;
  roles: string[];
}

export interface User {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  roles: string[];
}
