import { Component, OnInit, ViewChild } from '@angular/core';

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
                [routerLink]="['/app/users']"
                >Usuarios</a
              >
            </div>
            <div class="flex items-center ml-1 whitespace-nowrap">
              <mat-icon
                class="icon-size-5 text-secondary"
                [svgIcon]="'heroicons_solid:chevron-right'"
              ></mat-icon>
              <div>Añadir usuarios</div>
            </div>
          </div>
          <!-- Title -->
          <div class="mt-2">
            <h2
              class="text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate"
            >
              Usuarios
            </h2>
          </div>
        </div>
      </div>

      <!-- Main -->
      <div class="flex-auto p-6 sm:p-10">
        <div class="max-w-3xl">
          <user-form></user-form>
        </div>
      </div>
    </div>
  `,
})
export class UserAddPage {}
