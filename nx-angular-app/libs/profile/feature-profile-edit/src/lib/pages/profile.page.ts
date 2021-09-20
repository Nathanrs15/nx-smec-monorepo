import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '@smec-monorepo/shared/data-access';
import jwt_decode from 'jwt-decode';
import { ProfileService } from '../services';

@Component({
  template: `
    <nav mat-tab-nav-bar [backgroundColor]="background">
      <a
        mat-tab-link
        *ngFor="let item of routes"
        (click)="activeLink = item.route"
        [active]="activeLink === item.route"
        [routerLink]="item.route"
        routerLinkActive
      >
        {{ item.label }}
      </a>
    </nav>
    <mat-card>
      <router-outlet></router-outlet>
    </mat-card>
  `,
  styles: [],
})
export class ProfilePage implements OnInit {
  token: string = jwt_decode(this.authService.getAuth()?.token as string);
  userId = this.token.sub.toString();

  routes = [
    { route: 'profile', label: 'Perfil' },
    { route: 'password', label: 'Cambiar contraseña' },
    { route: 'theme', label: 'Cambiar Temas' },
  ];

  activeLink = this.routes[0]['route'];
  background: ThemePalette = undefined;

  constructor(
    public authService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url.slice(13) ? event.url.slice(13) : 'profile';
        this.activeLink = url;
      }
    });
  }

  ngOnInit(): void {
    this.profileService.setUserId(this.userId);
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }
}
