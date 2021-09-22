import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  logo = 'assets/logos/logo_sige.svg';

  navItems: NavItem[] = [
    {
      displayName: 'Usuarios',
      route: 'users',
      // isChild: false,
      permission: 'Users.View',
    },
    {
      displayName: 'Roles',
      route: 'roles',
      permission: 'Roles.View',
      // isChild: false,
    },
    {
      displayName: 'Recursos',
      route: 'api-resources',
      permission: 'Resources.View',
      // isChild: false,
    },
  ];

  storedTheme = localStorage.getItem('theme');
  isDarkMode = localStorage.getItem('isDarkMode');

  trustedUrl!: SafeUrl;

  @HostBinding('class') className = this.storedTheme
    ? this.storedTheme
    : 'nature-theme';

  constructor(
    private navService: NavigationService,
    private service: UtilsService,
    private overlay: OverlayContainer,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('Client APP');
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.logo);
    this.iconRegistry.addSvgIcon('logo-sige', this.trustedUrl);
  }

  ngOnInit() {
    this.navService.setNavItems(this.navItems);

    this.service.setCurrentTitle(this.router, this.route);
    this.service.setIsDarkMode(this.isDarkMode);
    this.overlay.getContainerElement().classList.add(this.className);

    this.service.themeToggle.subscribe((theme) => {
      if (theme) {
        this.setTheme(theme);
      }
    });
  }

  setTheme(theme: any) {
    this.overlay.getContainerElement().classList.remove(this.className);
    this.overlay.getContainerElement().classList.add(theme.value);
    this.service.setIsDarkMode(theme.type);

    localStorage.setItem('theme', theme.value);
    localStorage.setItem('isDarkMode', theme.type);

    this.className = theme.value;
  }
}
