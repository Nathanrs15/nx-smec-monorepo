import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Permission, Resource } from './resource.model';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ResourcesApiService {
    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    getResources(): Observable<Resource[]> {
        return this.http.get<Resource[]>(this.baseUrl + '/resources');
    }

    getResourceById(resourceId: string): Observable<Resource> {
        return this.http.get<Resource>(
            this.baseUrl + '/resources/' + resourceId
        );
    }

    getResourcePermissions(resourceId: string): Observable<Permission[]> {
        return this.http.get<Permission[]>(
            `${this.baseUrl}/resources/${resourceId}/permissions`
        );
    }

    updateResource(id: string, resource: Resource) {
        const updateResource = this.http.put<Resource>(
            this.baseUrl + '/resources/' + id,
            resource
        );
        const updatePermissions = this.http.put<Resource>(
            this.baseUrl + '/resources/' + id + '/permissions',
            resource
        );
        return updateResource.pipe(switchMap(() => updatePermissions));
    }

    createResource(resource: Resource) {
        const resources = this.http.post<Resource>(
            this.baseUrl + '/resources/create',
            resource
        );
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const permissions = (resource: Resource) =>
            this.http.post(this.baseUrl + '/resources/permissions', resource);

        return resources.pipe(switchMap((result) => permissions(result)));
    }
}
