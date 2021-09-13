import { Component, OnInit } from '@angular/core';
// import { GridBreakpointService, UIStatus, UtilsService } from '@core/services';
// import { User } from '@shared/models';
import { Observable } from 'rxjs';
// import { UserService } from '../services';

@Component({
  template: `
    USERS PAGE
    <smec-monorepo-user-list></smec-monorepo-user-list>
    <!-- <ng-container *ngIf="UIState$ | async as state">
      <ng-container *ngIf="state === UIStates.empty">
        <div class="wrapper">
          <div class="inner">
            <app-custom-empty-state
              [title]="emptyEstate.title"
              [description]="emptyEstate.description"
            >
              <button mat-flat-button color="primary" routerLink="add-user">
                Añadir nuevo usuario
              </button>
            </app-custom-empty-state>
          </div>
        </div>
      </ng-container>

      <ng-container *ngIf="state === UIStates.loading">
        <div class="wrapper">
          <div class="inner">
            <mat-spinner></mat-spinner>
          </div>
        </div>
      </ng-container>

      <ng-container *ngIf="users$ | async as users">
        <ng-container *ngIf="state === UIStates.loaded">
          <mat-drawer-container>
            <mat-drawer #drawer mode="side" position="end" opened>
              <div
                fxLayout="row"
                fxLayoutAlign="start center"
                style="margin: 10px;"
              >
                <h2 style="margin: 0;">Filtros</h2>
                <div fxFlex fxLayoutAlign="flex-end">
                  <button mat-icon-button (click)="drawer.close()">
                    <mat-icon>close</mat-icon>
                  </button>
                </div>
              </div>

              <mat-selection-list>
                <div mat-subheader>Roles</div>
                <mat-list-option> Administrador </mat-list-option>
                <mat-list-option> Configurador </mat-list-option>
                <mat-list-option> Visualizador </mat-list-option>
              </mat-selection-list>
            </mat-drawer>
            <mat-drawer-content>
              <div class="grid-container">
                <h2 class="view-title">Administración de usuarios</h2>
                <button (click)="drawer.toggle()">asdfs</button>

                <ng-container *ngIf="breakpoint$ | async; else card">
                  <mat-form-field
                    appearance="standard"
                    class="mobile-form-field"
                  >
                    <mat-label>Buscar</mat-label>
                    <input matInput placeholder="Ej. Administrador" #input />
                  </mat-form-field>
                  <smec-monorepo-user-list [users]="users"></smec-monorepo-user-list>

                  <div class="fab-container">
                    <button
                      class="fab-toggler"
                      mat-fab
                      color="accent"
                      aria-label="Añadir usuario nuevo"
                      routerLink="./add-user"
                    >
                      <mat-icon>person_add</mat-icon>
                    </button>
                  </div>
                </ng-container>

                <ng-template #card>
                  <mat-card class="filter-card">
                    <div
                      fxLayout="row"
                      fxLayoutAlign="start center"
                      fxLayoutGap="20px"
                    >
                      <mat-form-field appearance="outline">
                        <mat-label>Buscar</mat-label>
                        <input
                          matInput
                          placeholder="Ej. Administrador"
                          #input
                        />
                      </mat-form-field>
                      <div fxFlex fxLayoutAlign="flex-end">
                        <button
                          mat-flat-button
                          color="primary"
                          routerLink="./add-user"
                        >
                          <mat-icon>add</mat-icon>
                          Añadir usuario
                        </button>
                      </div>
                    </div>
                  </mat-card>
                  <mat-card class="table-card">
                    <smec-monorepo-user-list [users]="users"></smec-monorepo-user-list>
                  </mat-card>
                </ng-template>
              </div>
            </mat-drawer-content>
          </mat-drawer-container>
        </ng-container>
      </ng-container>
    </ng-container> -->
  `,
  styles: [
    `
      .mat-form-field {
        width: 30%;
      }

      .mobile-form-field {
        font-size: 14px;
        width: 100%;
      }
    `,
  ],
})
export class UsersPage implements OnInit {
  // users$!: Observable<User[]>;
  // UIState$!: Observable<UIStatus>;

  // UIStates = UIStatus;

  // emptyEstate = {
  //   title: 'No se han encontrado usuarios',
  //   description: 'Puedes añadir nuevos usuarios a continuación.',
  // };
  // breakpoint$ = this.gridService.mobileBreakpoint$;
  // private toggleService: UtilsService // private gridService: GridBreakpointService, // private userService: UserService,
  // constructor() {}

  ngOnInit(): void {
    console.log('UsersPage');
  }

  toggle() {
    // this.toggleService.toggleFilter();
  }
}

// CREAR SERVICIOS COMPARTIDOS, CLASES Y METODOS DE UTILIDAD
