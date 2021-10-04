import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NavItem } from '@smec-monorepo/shared/models';

// import { NavigationService, UtilsService } from '@smec-monorepo/shared/utils';

@Component({
  selector: 'smec-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'adminapp';

  // navItems: NavItem[] = [
  //   {
  //     displayName: 'Usuarios',
  //     route: 'users',
  //     // isChild: false,
  //     permission: 'Users.View',
  //   },
  //   {
  //     displayName: 'Roles',
  //     route: 'roles',
  //     permission: 'Roles.View',
  //     // isChild: false,
  //   },
  //   {
  //     displayName: 'Recursos',
  //     route: 'api-resources',
  //     permission: 'Resources.View',
  //     // isChild: false,
  //   },
  // ];

  // storedTheme = localStorage.getItem('theme');
  // isDarkMode = localStorage.getItem('isDarkMode');

  // @HostBinding('class') className = this.storedTheme
  //   ? this.storedTheme
  //   : 'nature-theme';

  constructor(
    // private navService: NavigationService,
    // private service: UtilsService,
    // private overlay: OverlayContainer,
    // private router: Router,
    // private route: ActivatedRoute
  ) {
    console.log('ADMIN APP');
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // this.navService.setNavItems(this.navItems);
    // this.service.setCurrentTitle(this.router, this.route);
    // this.service.setIsDarkMode(this.isDarkMode);
    // this.overlay.getContainerElement().classList.add(this.className);
    // this.service.themeToggle.subscribe((theme) => {
    //   if (theme) {
    //     this.setTheme(theme);
    //   }
    // });
  }

  // setTheme(theme: any) {
  //   this.overlay.getContainerElement().classList.remove(this.className);
  //   this.overlay.getContainerElement().classList.add(theme.value);
  //   this.service.setIsDarkMode(theme.type);

  //   localStorage.setItem('theme', theme.value);
  //   localStorage.setItem('isDarkMode', theme.type);

  //   this.className = theme.value;
  // }
}
