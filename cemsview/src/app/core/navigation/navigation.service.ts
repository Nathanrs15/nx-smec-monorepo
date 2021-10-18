/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { cloneDeep } from 'lodash-es';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    private readonly _compactNavigation: FuseNavigationItem[] =
        compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] =
        defaultNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] =
        futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] =
        horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return of(this.setNavigationItems()).pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }

    setNavigationItems(): Navigation {
        // Fill compact navigation children using the default navigation
        this._compactNavigation.forEach((compactNavItem) => {
            this._defaultNavigation.forEach((defaultNavItem) => {
                if (defaultNavItem.id === compactNavItem.id) {
                    compactNavItem.children = cloneDeep(
                        defaultNavItem.children
                    );
                }
            });
        });

        // Fill futuristic navigation children using the default navigation
        this._futuristicNavigation.forEach((futuristicNavItem) => {
            this._defaultNavigation.forEach((defaultNavItem) => {
                if (defaultNavItem.id === futuristicNavItem.id) {
                    futuristicNavItem.children = cloneDeep(
                        defaultNavItem.children
                    );
                }
            });
        });

        // Fill horizontal navigation children using the default navigation
        this._horizontalNavigation.forEach((horizontalNavItem) => {
            this._defaultNavigation.forEach((defaultNavItem) => {
                if (defaultNavItem.id === horizontalNavItem.id) {
                    horizontalNavItem.children = cloneDeep(
                        defaultNavItem.children
                    );
                }
            });
        });

        const naviation = {
            compact: cloneDeep(this._compactNavigation),
            default: cloneDeep(this._defaultNavigation),
            futuristic: cloneDeep(this._futuristicNavigation),
            horizontal: cloneDeep(this._horizontalNavigation),
        };

        // Return the response
        return naviation;
    }
}

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'smec',
        title: 'CEMS',
        subtitle: 'Control de emisiones',
        type: 'group',
        icon: 'heroicons_outline:menu',
        children: [
            /* { id: 'smec.real-time', title: 'Tiempo real', type: 'basic' },*/
            {
                id: 'smec.graphs',
                title: 'Gráficas',
                type: 'basic',
                link: 'history-graph',
            },
        ],
    },
    {
        id: 'settings',
        title: 'Ajustes',
        subtitle: 'Ajustes del sistema',
        type: 'group',
        icon: 'heroicons_outline:menu',
        meta: ['Users.Edit', 'Roles.Edit', 'Resources.Edit'],
        children: [
            {
                id: 'settings.users',
                title: 'Usuarios',
                type: 'basic',
                link: 'users',
                exactMatch: true,
            },
            {
                id: 'settings.roles',
                title: 'Roles',
                type: 'basic',
                link: 'roles',
            },
            {
                id: 'settings.Permisos',
                title: 'Recursos',
                type: 'basic',
                link: 'resources',
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    { id: 'real-time', title: 'Tiempo real', type: 'basic' },
    {
        id: 'smec',
        title: 'CEMS',
        subtitle: 'Control de emisiones',
        type: 'group',
        icon: 'heroicons_outline:menu',
        children: [],
    },
    {
        id: 'settings',
        title: 'Ajustes',
        tooltip: 'Ajustes del sistema',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        meta: ['Users.Edit', 'Roles.Edit', 'Resources.Edit'],
        children: [],
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'smec',
        title: 'CEMS',
        type: 'group',
        children: [],
    },
    {
        id: 'settings',
        title: 'Ajustes',
        type: 'aside',
        meta: ['Users.Edit', 'Roles.Edit', 'Resources.Edit'],
        children: [],
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'smec',
        title: 'CEMS',
        type: 'group',
        icon: 'heroicons_outline:menu',
        children: [],
    },
    {
        id: 'settings',
        title: 'Ajustes',
        type: 'group',
        icon: 'heroicons_outline:menu',
        meta: ['Users.Edit', 'Roles.Edit', 'Resources.Edit'],
        children: [],
    },
];
