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

export interface RoleCreate {
  name: string;
}

export interface RolePermissions {
  roleId: string;
  roleClaims: RoleClaimsRequest[];
}

export interface PermissionGroupByType {
  type: string;
}

export interface RolePermissionsByType {
  roleId: string;
  roleName: string;
  roleClaims: RoleClaimsRequest[];
}

export interface RoleClaimsRequest {
  type: string;
  value: string;
  description: string;
  selected: boolean;
}

export interface Resource {
  id?: string;
  name: string;
  apiName: string;
  description: string;
}

export interface Permission {
  id: string;
  type: string;
  value: string;
  description: string;
  resourceId: number;
  requestTypeId: number;
}
