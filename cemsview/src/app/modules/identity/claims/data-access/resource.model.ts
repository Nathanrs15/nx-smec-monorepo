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
