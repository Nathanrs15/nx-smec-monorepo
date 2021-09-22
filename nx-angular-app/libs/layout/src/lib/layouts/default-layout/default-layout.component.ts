import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

import { MatDrawer } from '@angular/material/sidenav';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';

import { Observable } from 'rxjs';

import { map, shareReplay, skip } from 'rxjs/operators';

import {
  GridBreakpointService,
  LoaderService,
  NavigationService,
  UtilsService,
} from '@smec-monorepo/shared/utils';

import { NavItem } from '@smec-monorepo/shared/models';

@Component({
  selector: 'smec-monorepo-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayoutComponent implements AfterViewInit, OnDestroy {
  sideBarOpen = true;
  @ViewChild('drawer') appDrawer!: ElementRef;
  @ViewChild('filter', { static: true }) appFilter!: MatDrawer;

  loader$ = this.loaderService.isLoading;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;

  navItems$!: Observable<NavItem[]>;
  title$ = this.titleService.title$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loaderService: LoaderService,
    private titleService: UtilsService,
    private navService: NavigationService,
    public breakpointService: GridBreakpointService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // ngOnInit() {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.titleService.togglerfilterSidenav$.pipe(skip(1)).subscribe((res) => {
      console.log(res, this.appDrawer);
      this.appFilter.toggle();
    });

    console.log('Loading navItems ...');

    this.navItems$ = this.navService.navItems$;

    this.navItems$.subscribe((data) => console.log(data));
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
