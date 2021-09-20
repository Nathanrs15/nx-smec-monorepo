import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class CheckPermissionService {
  canCreate = this.permissionService.getPermission('Permissions.Create')
    ? true
    : false;
  canView = this.permissionService.getPermission('Permissions.View')
    ? true
    : false;

  constructor(private permissionService: NgxPermissionsService) {}

  hasPermission(permission: string): boolean {
    return this.permissionService.getPermission(permission) ? true : false;
  }
}
