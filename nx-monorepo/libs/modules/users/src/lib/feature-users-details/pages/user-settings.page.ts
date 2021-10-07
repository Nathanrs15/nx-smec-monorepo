import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateUserRoles, UserRoles, UserService } from '../../data-access';

import { MatDrawer } from '@angular/material/sidenav';

import { Observable, Subject, Subscription } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { takeUntil } from 'rxjs/operators';

@Component({
  template: `
    <ng-container *ngIf="userRoles$ | async as data; else empty">
      <div
        class="flex flex-col w-full min-w-0 sm:absolute sm:inset-0 sm:overflow-hidden"
      >
        <mat-drawer-container class="flex-auto sm:h-full">
          <!-- Drawer -->
          <mat-drawer
            class="sm:w-96 dark:bg-gray-900"
            [autoFocus]="false"
            [mode]="drawerMode"
            [opened]="drawerOpened"
            #drawer
          >
            <!-- Header -->
            <div class="flex items-center justify-between m-8 mr-6 sm:my-10">
              <!-- Title -->
              <div class="text-4xl font-extrabold tracking-tight leading-none">
                Ajustes
              </div>
              <!-- Close button -->
              <div class="lg:hidden">
                <button mat-icon-button (click)="drawer.close()">
                  <mat-icon [svgIcon]="'heroicons_outline:x'"></mat-icon>
                </button>
              </div>
            </div>
            <!-- Panel links -->
            <div class="flex flex-col divide-y border-t border-b">
              <ng-container *ngFor="let panel of panels; trackBy: trackByFn">
                <div
                  class="flex px-8 py-5 cursor-pointer"
                  [ngClass]="{
                    'hover:bg-gray-100 dark:hover:bg-hover':
                      !selectedPanel || selectedPanel !== panel.id,
                    'bg-primary-50 dark:bg-hover':
                      selectedPanel && selectedPanel === panel.id
                  }"
                  (click)="goToPanel(panel.id)"
                >
                  <mat-icon
                    [ngClass]="{
                      'text-hint': !selectedPanel || selectedPanel !== panel.id,
                      'text-primary dark:text-primary-500':
                        selectedPanel && selectedPanel === panel.id
                    }"
                    [svgIcon]="panel.icon"
                  ></mat-icon>
                  <div class="ml-3">
                    <div
                      class="font-medium leading-6"
                      [ngClass]="{
                        'text-primary dark:text-primary-500':
                          selectedPanel && selectedPanel === panel.id
                      }"
                    >
                      {{ panel.title }}
                    </div>
                    <div class="mt-0.5 text-secondary">
                      {{ panel.description }}
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
          </mat-drawer>

          <!-- Drawer content -->
          <mat-drawer-content class="flex flex-col">
            <!-- Main -->
            <div class="flex-auto px-6 pt-9 pb-12 md:p-8 md:pb-12 lg:p-12">
              <!-- Breadcrumbs -->
              <div class="flex flex-wrap items-center font-medium">
                <div>
                  <a
                    class="whitespace-nowrap text-primary-500"
                    [routerLink]="['/app/users']"
                    >Usuarios</a
                  >
                </div>
                <div class="flex items-center ml-1 whitespace-nowrap">
                  <mat-icon
                    class="icon-size-5 text-secondary"
                    [svgIcon]="'heroicons_solid:chevron-right'"
                  ></mat-icon>
                  <div>Ajustes</div>
                </div>
              </div>

              <!-- Panel header -->
              <div class="flex items-center">
                <!-- Drawer toggle -->
                <button
                  class="lg:hidden -ml-2"
                  mat-icon-button
                  (click)="drawer.toggle()"
                >
                  <mat-icon [svgIcon]="'heroicons_outline:menu'"></mat-icon>
                </button>

                <!-- Panel title -->
                <div
                  class="mt-2 ml-2 lg:ml-0 text-3xl font-bold tracking-tight leading-none"
                >
                  {{ getPanelInfo(selectedPanel).title }}
                </div>
              </div>

              <!-- Load settings panel -->
              <div class="mt-8">
                <ng-container [ngSwitch]="selectedPanel">
                  <!-- Account -->
                  <ng-container *ngSwitchCase="'account'">
                    <app-userinfo [userId]="data.userId"></app-userinfo>
                  </ng-container>
                  <!-- Security -->
                  <ng-container *ngSwitchCase="'security'">
                    <app-reset-password [userId]="userId"></app-reset-password>
                  </ng-container>
                  <!-- Plan & Billing -->
                  <ng-container *ngSwitchCase="'roles'">
                    <app-manage-roles
                      [userRoles]="data"
                      (updateRoles)="updateUserRoles($event)"
                    ></app-manage-roles>
                  </ng-container>
                </ng-container>
              </div>
            </div>
          </mat-drawer-content>
        </mat-drawer-container>
      </div>
    </ng-container>

    <ng-template #empty>NO DATA</ng-template>
  `,
})
export class UserSettingsPage implements OnInit, OnDestroy {
  userRoles$!: Observable<UserRoles | undefined>;
  userId!: string;
  redirectSub!: Subscription;

  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = true;
  panels = [];
  selectedPanel = 'account';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private userRolesService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService
  ) {}

  ngOnInit(): void {
    this.getUserRoles();

    this.panels = [
      {
        id: 'account',
        icon: 'heroicons_outline:user-circle',
        title: 'Cuenta',
        description: 'Visualiza la información básica de la cuenta',
      },
      {
        id: 'security',
        icon: 'heroicons_outline:lock-closed',
        title: 'Seguridad',
        description: 'Administra la contraseña',
      },
      {
        id: 'roles',
        icon: 'heroicons_outline:user-group',
        title: 'Roles',
        description: 'Administrar los roles al que pertenece el usuario',
      },
      // {
      //   id: 'notifications',
      //   icon: 'heroicons_outline:bell',
      //   title: 'Notifications',
      //   description: "Manage when you'll be notified on which channels",
      // },
      // {
      //   id: 'team',
      //   icon: 'heroicons_outline:user-group',
      //   title: 'Team',
      //   description: 'Manage your existing team and change roles/permissions',
      // },
    ];

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        } else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  getUserRoles() {
    this.route.paramMap.subscribe((params) => {
      this.userId = String(params.get('id'));
      this.userRoles$ = this.userRolesService.getUserRoles(this.userId);
    });
  }

  updateUserRoles(data: UpdateUserRoles) {
    this.userRolesService.updateUserRoles(this.userId, data).subscribe(() => {
      this.userRolesService.showUpdatedUserRolesSnackBar();
      this.getUserRoles();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): any {
    return this.panels.find((panel) => panel.id === id);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
