import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavItem } from '@smec-monorepo/shared/models';

import { NavigationService, UtilsService } from '@smec-monorepo/shared/utils';

@Component({
  selector: 'smec-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'adminapp';

  navItems: NavItem[] = [
    {
      displayName: 'Usuarios',
      route: 'users',
      // isChild: false,
      // permission: 'Users.View',
    },
    {
      displayName: 'Roles',
      route: 'roles',
      // permission: 'Roles.View',
      // isChild: false,
    },
    {
      displayName: 'Recursos',
      route: 'api-resources',
      // permission: 'Resources.View',
      // isChild: false,
    },
  ];

  constructor(
    private navService: NavigationService,
    private service: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('Admin APP');
  }

  ngOnInit() {
    this.navService.setNavItems(this.navItems);
    this.service.setCurrentTitle(this.router, this.route);

    // this.navService.navItems$.subscribe((data) => console.log('naitems', data));
  }
}
