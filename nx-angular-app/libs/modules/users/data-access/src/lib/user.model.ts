export interface User {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  roles: string[];
}

export interface UserCreate {
  userName: string;
  email: string;
  password: string;
  confirmedPassword: string;
  role: any[];
}

export interface UserInfo {
  user: User;
  roles: string[];
}

export interface UserRoles {
  userId: string;
  userName: string;
  userRoles: [{ roleName: string; selected: boolean }];
}

export interface UpdateUserRoles {
  names: string[];
  formValues: any;
  userRoles: [{ roleName: string; selected: boolean }];
}

export interface Role {
  id: string;
  name: string;
  concurrencyStamp: string;
  normalizedName: string;
  selected?: boolean;
}
