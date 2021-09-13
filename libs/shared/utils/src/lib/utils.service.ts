import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '@smec-monorepo/shared/environments';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private themeSource = new BehaviorSubject<any>('');
  private baseUrl = environment.apiUrl;
  themeToggle = this.themeSource.asObservable();

  isDarkModeSource$ = new BehaviorSubject<any>(null);

  isDarkMode$ = this.isDarkModeSource$.pipe(
    map((themeType) => (themeType === 'darkMode' ? true : false))
  );

  private titleSource$ = new BehaviorSubject<string>('');
  title$ = this.titleSource$.asObservable();

  private toggleFilterSidenavSource = new BehaviorSubject<any>(null);
  togglerfilterSidenav$ = this.toggleFilterSidenavSource.asObservable();

  constructor(private http: HttpClient, private titleService: Title) {}

  toggleFilter() {
    return this.toggleFilterSidenavSource.next('toggle Drawer');
  }

  setCurrentTitle(router: Router, route: ActivatedRoute) {
    const appTitle = this.titleService.getTitle();
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = route.firstChild;
          if (!child) return;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      )
      .subscribe((ttl: string) => {
        console.log();

        if (ttl !== 'SMEC') {
          this.titleService.setTitle(ttl);
          this.titleSource$.next(ttl);
        }
      });
  }

  setTheme(theme: any) {
    this.themeSource.next(theme);
  }

  setIsDarkMode(theme: any) {
    this.isDarkModeSource$.next(theme);
  }

  getWeatherForecast(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/weatherforecast');
  }
}
