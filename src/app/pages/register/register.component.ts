import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
  ],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4"
    >
      <div class="w-full max-w-lg">
        <p-card header="Create Your Account" class="shadow-lg">
          <form
            [formGroup]="registerForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <!-- Full Name Field -->
            <div class="field">
              <label
                for="fullName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name <span class="text-red-500">*</span>
              </label>
              <input
                pInputText
                id="fullName"
                formControlName="fullName"
                placeholder="Enter your full name"
                class="w-full"
                [class.ng-invalid]="
                  registerForm.get('fullName')?.invalid &&
                  registerForm.get('fullName')?.touched
                "
              />
              <p-message
                *ngIf="
                  registerForm.get('fullName')?.invalid &&
                  registerForm.get('fullName')?.touched
                "
                severity="error"
                text="Full name is required"
                class="mt-1 block"
              >
              </p-message>
            </div>

            <!-- Email Field -->
            <div class="field">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address <span class="text-red-500">*</span>
              </label>
              <input
                pInputText
                id="email"
                formControlName="email"
                placeholder="Enter your email address"
                type="email"
                class="w-full"
                [class.ng-invalid]="
                  registerForm.get('email')?.invalid &&
                  registerForm.get('email')?.touched
                "
              />
              <p-message
                *ngIf="
                  registerForm.get('email')?.hasError('required') &&
                  registerForm.get('email')?.touched
                "
                severity="error"
                text="Email is required"
                class="mt-1 block"
              >
              </p-message>
              <p-message
                *ngIf="
                  registerForm.get('email')?.hasError('email') &&
                  registerForm.get('email')?.touched
                "
                severity="error"
                text="Please enter a valid email address"
                class="mt-1 block"
              >
              </p-message>
            </div>

            <!-- Phone Number Field -->
            <div class="field">
              <label
                for="phoneNumber"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input
                pInputText
                id="phoneNumber"
                formControlName="phoneNumber"
                placeholder="Enter your phone number"
                class="w-full"
                [class.ng-invalid]="
                  registerForm.get('phoneNumber')?.invalid &&
                  registerForm.get('phoneNumber')?.touched
                "
              />
              <p-message
                *ngIf="
                  registerForm.get('phoneNumber')?.hasError('required') &&
                  registerForm.get('phoneNumber')?.touched
                "
                severity="error"
                text="Phone number is required"
                class="mt-1 block"
              >
              </p-message>
              <p-message
                *ngIf="
                  registerForm.get('phoneNumber')?.hasError('pattern') &&
                  registerForm.get('phoneNumber')?.touched
                "
                severity="error"
                text="Phone number should contain only digits"
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
                [feedback]="true"
                styleClass="w-full"
                inputStyleClass="w-full"
                [class.ng-invalid]="
                  registerForm.get('password')?.invalid &&
                  registerForm.get('password')?.touched
                "
              >
              </p-password>
              <p-message
                *ngIf="
                  registerForm.get('password')?.invalid &&
                  registerForm.get('password')?.touched
                "
                severity="error"
                text="Password is required"
                class="mt-1 block"
              >
              </p-message>
            </div>

            <!-- Confirm Password Field -->
            <div class="field">
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password <span class="text-red-500">*</span>
              </label>
              <p-password
                formControlName="confirmPassword"
                placeholder="Confirm your password"
                [toggleMask]="true"
                [feedback]="false"
                styleClass="w-full"
                inputStyleClass="w-full"
                [class.ng-invalid]="
                  registerForm.get('confirmPassword')?.invalid &&
                  registerForm.get('confirmPassword')?.touched
                "
              >
              </p-password>
              <p-message
                *ngIf="
                  registerForm.get('confirmPassword')?.hasError('required') &&
                  registerForm.get('confirmPassword')?.touched
                "
                severity="error"
                text="Please confirm your password"
                class="mt-1 block"
              >
              </p-message>
              <p-message
                *ngIf="
                  registerForm
                    .get('confirmPassword')
                    ?.hasError('passwordMismatch') &&
                  registerForm.get('confirmPassword')?.touched
                "
                severity="error"
                text="Passwords do not match"
                class="mt-1 block"
              >
              </p-message>
            </div>

            <!-- Register Button -->
            <div class="field">
              <p-button
                type="submit"
                label="Create Account"
                icon="pi pi-user-plus"
                styleClass="w-full"
                [disabled]="registerForm.invalid"
                [loading]="isLoading"
              >
              </p-button>
            </div>

            <!-- Login Link -->
            <div class="text-center border-t pt-4">
              <span class="text-gray-600 text-sm"
                >Already have an account?
              </span>
              <a
                routerLink="/login"
                class="text-green-600 hover:text-green-800 font-medium"
              >
                Login here
              </a>
            </div>

            <!-- Success Message -->
            <p-message
              *ngIf="successMessage"
              severity="success"
              [text]="successMessage"
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
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(
    control: AbstractControl,
  ): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.successMessage = '';

      const formData = this.registerForm.value;

      // Simulate API call
      setTimeout(() => {
        // Save user data to localStorage (in real app, would be API call)
        const userData = {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          registeredAt: new Date().toISOString(),
        };

        localStorage.setItem('userProfile', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ username: formData.email }),
        );

        this.successMessage =
          'Account created successfully! Redirecting to products...';

        // Redirect to landing page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/landing']);
        }, 2000);

        this.isLoading = false;
      }, 1000);
    }
  }
}
