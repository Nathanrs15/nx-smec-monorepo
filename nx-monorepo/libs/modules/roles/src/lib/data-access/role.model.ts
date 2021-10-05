export interface Resource {
  id?: string;
  name: string;
  apiName: string;
  description: string;
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
