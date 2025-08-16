import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  template: `
    <div class="bg-white shadow-md border-b border-gray-200">
      <div class="container mx-auto px-4">
        <p-menubar [model]="items" class="border-none">
          <ng-template pTemplate="start">
            <div class="text-xl font-bold text-blue-600 mr-4">
              <i class="pi pi-shopping-cart mr-2"></i>
              E-Shop
            </div>
          </ng-template>
        </p-menubar>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .p-menubar {
      border: none;
      border-radius: 0;
      background: transparent;
      padding: 1rem 0;
    }
    
    :host ::ng-deep .p-menubar .p-menubar-root-list {
      gap: 1rem;
    }
    
    :host ::ng-deep .p-menuitem-link {
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s;
    }
    
    :host ::ng-deep .p-menuitem-link:hover {
      background-color: #f3f4f6;
      color: #2563eb;
    }
  `]
})
export class NavigationComponent {
  items: MenuItem[] = [
    {
      label: 'Login',
      icon: 'pi pi-sign-in',
      routerLink: '/login'
    },
    {
      label: 'Register',
      icon: 'pi pi-user-plus',
      routerLink: '/register'
    },
    {
      label: 'Products',
      icon: 'pi pi-shop',
      routerLink: '/landing'
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: '/profile'
    }
  ];
}
