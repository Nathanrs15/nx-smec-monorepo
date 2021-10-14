import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('../feature-claims/feature-claims-permissions.module').then(
                (m) => m.FeatureClaimssModule
            ),
        data: { permissions: { only: 'Resources.View', redirectTo: '' } },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: 'add-resource',
        loadChildren: () =>
            import('../feature-claims-edit/feature-claims-edit.module').then(
                (m) => m.FeatureClaimsEditModule
            ),
        data: {
            permissions: { only: 'Resources.Create', redirectTo: '' },
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: 'edit-resource/:id',
        loadChildren: () =>
            import('../feature-claims-edit/feature-claims-edit.module').then(
                (m) => m.FeatureClaimsEditModule
            ),
        data: {
            permissions: { only: 'Resources.Edit', redirectTo: '' },
        },
        canActivate: [NgxPermissionsGuard],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ClaimsShellWebModule {}
