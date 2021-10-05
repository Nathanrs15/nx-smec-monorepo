import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div class="flex flex-col flex-auto min-w-0">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row flex-0 sm:items-center sm:justify-between p-6 sm:py-8 sm:px-10 border-b bg-card dark:bg-transparent"
      >
        <div class="flex-1 min-w-0">
          <!-- Breadcrumbs -->
          <div class="flex flex-wrap items-center font-medium">
            <div>
              <a
                class="whitespace-nowrap text-primary-500"
                [routerLink]="['/app/roles']"
                >Roles</a
              >
            </div>
            <div class="flex items-center ml-1 whitespace-nowrap">
              <mat-icon
                class="icon-size-5 text-secondary"
                [svgIcon]="'heroicons_solid:chevron-right'"
              ></mat-icon>
              <div>{{ isAddMode ? 'Añadir' : 'Editar' }} rol</div>
            </div>
          </div>
          <!-- Title -->
          <div class="mt-2">
            <h2
              class="text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate"
            >
              Roles
            </h2>
          </div>
        </div>
      </div>

      <!-- Main -->
      <div class="flex-auto p-6 sm:p-10">
        <div class="max-w-3xl">
          <role-form [id]="id" [isAddMode]="isAddMode"></role-form>
        </div>
      </div>
    </div>
  `,
})
export class RoleAddEditPage implements OnInit {
  id!: string;
  isAddMode!: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }
}
