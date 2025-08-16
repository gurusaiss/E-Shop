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
    <nav class="modern-navbar">
      <div class="navbar-background"></div>
      <div class="container mx-auto px-6 relative z-10">
        <p-menubar [model]="items" class="border-none">
          <ng-template pTemplate="start">
            <div class="brand-logo">
              <div class="logo-icon">
                <i class="pi pi-shopping-cart"></i>
              </div>
              <span class="brand-text">E-Shop</span>
            </div>
          </ng-template>
        </p-menubar>
      </div>
    </nav>
  `,
  styles: [
    `
      .modern-navbar {
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .navbar-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          135deg,
          #667eea 0%,
          #764ba2 25%,
          #f093fb 50%,
          #f5576c 75%,
          #4facfe 100%
        );
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
      }

      @keyframes gradientShift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .brand-logo {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-right: 2rem;
      }

      .logo-icon {
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 12px;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }

      .logo-icon:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
      }

      .logo-icon i {
        color: white;
        font-size: 1.25rem;
        font-weight: bold;
      }

      .brand-text {
        color: white;
        font-size: 1.75rem;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        letter-spacing: -0.025em;
      }

      :host ::ng-deep .p-menubar {
        border: none;
        border-radius: 0;
        background: transparent;
        padding: 1.25rem 0;
      }

      :host ::ng-deep .p-menubar .p-menubar-root-list {
        gap: 0.5rem;
      }

      :host ::ng-deep .p-menuitem-link {
        padding: 0.875rem 1.5rem;
        border-radius: 25px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: white;
        font-weight: 500;
        position: relative;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
      }

      :host ::ng-deep .p-menuitem-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.2) 0%,
          rgba(255, 255, 255, 0.1) 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      :host ::ng-deep .p-menuitem-link:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      :host ::ng-deep .p-menuitem-link:hover::before {
        opacity: 1;
      }

      :host ::ng-deep .p-menuitem-icon {
        margin-right: 0.5rem;
        font-size: 1rem;
      }

      :host ::ng-deep .p-menuitem-text {
        font-size: 0.95rem;
        letter-spacing: 0.025em;
      }

      :host ::ng-deep .p-menuitem-link.router-link-active {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class NavigationComponent {
  items: MenuItem[] = [
    {
      label: 'Login',
      icon: 'pi pi-sign-in',
      routerLink: '/login',
    },
    {
      label: 'Register',
      icon: 'pi pi-user-plus',
      routerLink: '/register',
    },
    {
      label: 'Products',
      icon: 'pi pi-shop',
      routerLink: '/landing',
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: '/profile',
    },
  ];
}
