import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  OnDestroy,
  Input,
} from '@angular/core';
import { SnackbarService } from '@smec-monorepo/shared/utils';
import { AuthenticationService } from '@smec-monorepo/shared/data-access';
import { NavItem } from '@smec-monorepo/shared/models';

import { Subject } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  ngUnsubscribe = new Subject<void>();
  className = '';

  logo = 'assets/logos/logo_sige.svg';

  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: '/',
    },
    {
      displayName: 'Historicos',
      iconName: 'assignment_ind',
      route: '',
    },
    {
      displayName: 'Tipos de residuos',
      iconName: 'assignment_ind',
      route: '',
    },
    {
      displayName: 'cusum',
      iconName: 'assignment_ind',
      route: '',
    },
    {
      displayName: 'Calibración',
      iconName: 'assignment_ind',
      route: '',
    },
    {
      displayName: 'Tratamiento',
      iconName: 'assignment_ind',
      route: '',
    },
    {
      displayName: 'Limites',
      iconName: 'assignment_ind',
      route: '',
    },
    {
      displayName: 'Informes',
      iconName: 'assignment_ind',
      route: '',
    },
    {
      displayName: 'Ajustes',
      iconName: 'admin_panel_settings',
      route: '',
      permission: ['Users.View', 'Roles.View', 'Resources.View'],
      children: [
        {
          displayName: 'Usuarios',
          iconName: 'assignment_ind',
          route: 'users',
          isChild: true,
          permission: 'Users.View',
        },
        {
          displayName: 'Roles',
          iconName: 'assignment',
          route: 'roles',
          permission: 'Roles.View',
          isChild: true,
        },
        {
          displayName: 'Recursos',
          iconName: 'assignment',
          route: 'api-resources',
          permission: 'Resources.View',
          isChild: true,
        },
      ],
    },
  ];

  @Input() title: string | null = '';

  constructor(
    private authService: AuthenticationService,
    // private snackbarService: SnackbarService
  ) {}

  // ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  openSnackbar() {
    // this.snackbarService.openSnackBar(
    //   'Usuario XXXX creado correctamente',
    //   'Aceptar'
    // );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
