import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
  ],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <div class="w-full max-w-md">
        <p-card header="Login to Your Account" class="shadow-lg">
          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <!-- Username Field -->
            <div class="field">
              <label
                for="username"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Username <span class="text-red-500">*</span>
              </label>
              <input
                pInputText
                id="username"
                formControlName="username"
                placeholder="Enter your username"
                class="w-full"
                [class.ng-invalid]="
                  loginForm.get('username')?.invalid &&
                  loginForm.get('username')?.touched
                "
              />
              <p-message
                *ngIf="
                  loginForm.get('username')?.invalid &&
                  loginForm.get('username')?.touched
                "
                severity="error"
                text="Username is required"
                class="mt-1 block"
              >
              </p-message>
            </div>

            <!-- Password Field -->
            <div class="field">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Password <span class="text-red-500">*</span>
              </label>
              <p-password
                formControlName="password"
                placeholder="Enter your password"
                [toggleMask]="true"
                [feedback]="false"
                styleClass="w-full"
                inputStyleClass="w-full"
                [class.ng-invalid]="
                  loginForm.get('password')?.invalid &&
                  loginForm.get('password')?.touched
                "
              >
              </p-password>
              <p-message
                *ngIf="
                  loginForm.get('password')?.invalid &&
                  loginForm.get('password')?.touched
                "
                severity="error"
                text="Password is required"
                class="mt-1 block"
              >
              </p-message>
            </div>

            <!-- Remember Username Checkbox -->
            <div class="field">
              <p-checkbox
                formControlName="rememberUsername"
                inputId="rememberUsername"
                label="Remember My Username"
                [binary]="true"
              >
              </p-checkbox>
            </div>

            <!-- Login Button -->
            <div class="field">
              <p-button
                type="submit"
                label="Login"
                icon="pi pi-sign-in"
                styleClass="w-full"
                [disabled]="loginForm.invalid"
                [loading]="isLoading"
              >
              </p-button>
            </div>

            <!-- Forgot Password Link -->
            <div class="text-center">
              <a
                href="#"
                class="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Forgot Password?
              </a>
            </div>

            <!-- Register Link -->
            <div class="text-center border-t pt-4">
              <span class="text-gray-600 text-sm">Don't have an account? </span>
              <a
                routerLink="/register"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                Register here
              </a>
            </div>

            <!-- Error Message -->
            <p-message
              *ngIf="errorMessage"
              severity="error"
              [text]="errorMessage"
              class="mt-4"
            >
            </p-message>
          </form>
        </p-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .p-card {
        border-radius: 0.75rem;
        border: none;
      }

      :host ::ng-deep .p-card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
        font-size: 1.25rem;
        font-weight: 600;
        border-radius: 0.75rem 0.75rem 0 0;
        padding: 1.5rem;
      }

      :host ::ng-deep .p-card-content {
        padding: 2rem;
      }

      :host ::ng-deep .p-password input {
        width: 100%;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberUsername: [false],
    });
  }

  ngOnInit() {
    // Load saved username if exists
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      this.loginForm.patchValue({
        username: savedUsername,
        rememberUsername: true,
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { username, password, rememberUsername } = this.loginForm.value;

      // Simulate API call
      setTimeout(() => {
        // Simple validation - in real app, this would be API call
        if (username && password) {
          // Save username if remember is checked
          if (rememberUsername) {
            localStorage.setItem('rememberedUsername', username);
          } else {
            localStorage.removeItem('rememberedUsername');
          }

          // Save login state
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify({ username }));

          this.router.navigate(['/landing']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
        this.isLoading = false;
      }, 1000);
    }
  }
}
