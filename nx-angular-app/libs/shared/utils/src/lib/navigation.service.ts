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

  // private _items: NavItem[] = [
  //   {
  //     displayName: 'Usuarios',
  //     route: 'users',
  //     isChild: true,
  //     permission: 'Users.View',
  //   },
  //   {
  //     displayName: 'Roles',
  //     route: 'roles',
  //     permission: 'Roles.View',
  //     isChild: true,
  //   },
  //   {
  //     displayName: 'Recursos',
  //     route: 'api-resources',
  //     permission: 'Resources.View',
  //     isChild: true,
  //   },
  // ];

  private navItemsSource = new BehaviorSubject<NavItem[]>([]);
  navItems$ = this.navItemsSource.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd)
        this.currentUrl.next(event.urlAfterRedirects);
    });
  }

  setNavItems(items: NavItem[]) {
    this.navItemsSource.next(items);
  }

  closeNav() {
    this.appDrawer.close();
  }

  openNav() {
    this.appDrawer.open();
  }
}
