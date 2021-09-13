import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NavItem } from '@smec-monorepo/shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  appDrawer: any;
  currentUrl = new BehaviorSubject<string>('');

  navItems: NavItem[] = [
    {
      displayName: 'Tiempo real',
      route: 'tiempo-real',
    },
    {
      displayName: 'Históricos',
      route: '',
      children: [
        {
          displayName: '10 minutales',
          route: 'historicos/10-minutal',
          isChild: true,
        },
        {
          displayName: 'Semi horarios',
          route: 'historicos/semi-horios',
          isChild: true,
        },
        {
          displayName: 'Horario',
          route: 'historicos/horario',
          isChild: true,
        },
        {
          displayName: '8 horario',
          route: 'historicos/8-horario',
          isChild: true,
        },
        {
          displayName: 'Diario',
          route: 'historicos/diario',
          isChild: true,
        },
      ],
    },

    {
      displayName: 'Redundancia',
      route: 'redundancia',
    },
    {
      displayName: 'Gráficas',
      route: 'graficas',
    },
    {
      displayName: 'CUSUM',
      route: 'cusum',
    },
    {
      displayName: 'Calibración',
      route: 'calibracion',
    },
    {
      displayName: 'Tipos de residuos',
      route: 'tipos-residuos',
      isChild: true,
    },
    {
      displayName: 'Correciones',
      route: 'correcciones',
      isChild: true,
    },
    {
      displayName: 'Límites',
      route: 'limites',
      isChild: true,
    },
    {
      displayName: 'Informes',
      route: 'informes',
      isChild: true,
    },
    {
      displayName: 'Estado del foco',
      route: 'estado-foco',
      isChild: true,
    },
    {
      displayName: 'Alarmas',
      route: 'alarmas',
      isChild: true,
    },

    {
      displayName: 'Ajustes',
      // iconName: 'settings',
      route: '',
      permission: ['Users.View', 'Roles.View', 'Resources.View'],
      children: [
        {
          displayName: 'Usuarios',
          route: 'users',
          isChild: true,
          permission: 'Users.View',
        },
        {
          displayName: 'Roles',
          route: 'roles',
          permission: 'Roles.View',
          isChild: true,
        },
        {
          displayName: 'Recursos',
          route: 'api-resources',
          permission: 'Resources.View',
          isChild: true,
        },
      ],
    },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd)
        this.currentUrl.next(event.urlAfterRedirects);
    });
  }

  closeNav() {
    this.appDrawer.close();
  }

  openNav() {
    this.appDrawer.open();
  }
}
