import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    MessageModule
  ],
  template: `
    <div class="auth-container">
      <div class="auth-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="auth-content">
        <div class="auth-card-wrapper">
          <div class="welcome-header">
            <div class="welcome-icon">
              <i class="pi pi-shopping-cart"></i>
            </div>
            <h1 class="welcome-title">Welcome to E-Shop</h1>
            <p class="welcome-subtitle">Your premium shopping destination</p>
          </div>
          
          <div class="auth-card">
            <p-tabView [activeIndex]="activeTabIndex" (activeIndexChange)="onTabChange($event)">
              
              <!-- Login Tab -->
              <p-tabPanel header="Sign In" leftIcon="pi pi-sign-in">
                <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="auth-form">
                  
                  <!-- Username Field -->
                  <div class="input-group">
                    <label for="username" class="input-label">
                      <i class="pi pi-user label-icon"></i>
                      Username
                    </label>
                    <div class="input-wrapper">
                      <input
                        pInputText
                        id="username"
                        formControlName="username"
                        placeholder="Enter your username"
                        class="modern-input"
                        [class.error]="loginForm.get('username')?.invalid && loginForm.get('username')?.touched"
                      />
                    </div>
                    <p-message
                      *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched"
                      severity="error"
                      text="Username is required"
                      class="field-error">
                    </p-message>
                  </div>

                  <!-- Password Field -->
                  <div class="input-group">
                    <label for="loginPassword" class="input-label">
                      <i class="pi pi-lock label-icon"></i>
                      Password
                    </label>
                    <div class="input-wrapper">
                      <p-password
                        formControlName="password"
                        placeholder="Enter your password"
                        [toggleMask]="true"
                        [feedback]="false"
                        styleClass="modern-password"
                        inputStyleClass="modern-input"
                        [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                      </p-password>
                    </div>
                    <p-message
                      *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                      severity="error"
                      text="Password is required"
                      class="field-error">
                    </p-message>
                  </div>

                  <!-- Remember Me -->
                  <div class="checkbox-group">
                    <p-checkbox
                      formControlName="rememberUsername"
                      inputId="rememberUsername"
                      label="Remember my username"
                      [binary]="true">
                    </p-checkbox>
                  </div>

                  <!-- Login Button -->
                  <p-button
                    type="submit"
                    label="Sign In"
                    icon="pi pi-sign-in"
                    styleClass="auth-button primary-button"
                    [disabled]="loginForm.invalid"
                    [loading]="isLoginLoading">
                  </p-button>

                  <!-- Forgot Password -->
                  <div class="forgot-password">
                    <a href="#" class="forgot-link">Forgot your password?</a>
                  </div>

                  <!-- Error Message -->
                  <p-message
                    *ngIf="loginErrorMessage"
                    severity="error"
                    [text]="loginErrorMessage"
                    class="form-error">
                  </p-message>

                </form>
              </p-tabPanel>

              <!-- Register Tab -->
              <p-tabPanel header="Sign Up" leftIcon="pi pi-user-plus">
                <form [formGroup]="registerForm" (ngSubmit)="onRegister()" class="auth-form">
                  
                  <!-- Full Name Field -->
                  <div class="input-group">
                    <label for="fullName" class="input-label">
                      <i class="pi pi-user label-icon"></i>
                      Full Name
                    </label>
                    <div class="input-wrapper">
                      <input
                        pInputText
                        id="fullName"
                        formControlName="fullName"
                        placeholder="Enter your full name"
                        class="modern-input"
                        [class.error]="registerForm.get('fullName')?.invalid && registerForm.get('fullName')?.touched"
                      />
                    </div>
                    <p-message
                      *ngIf="registerForm.get('fullName')?.invalid && registerForm.get('fullName')?.touched"
                      severity="error"
                      text="Full name is required"
                      class="field-error">
                    </p-message>
                  </div>

                  <!-- Email Field -->
                  <div class="input-group">
                    <label for="email" class="input-label">
                      <i class="pi pi-envelope label-icon"></i>
                      Email Address
                    </label>
                    <div class="input-wrapper">
                      <input
                        pInputText
                        id="email"
                        formControlName="email"
                        placeholder="Enter your email address"
                        type="email"
                        class="modern-input"
                        [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                      />
                    </div>
                    <p-message
                      *ngIf="registerForm.get('email')?.hasError('required') && registerForm.get('email')?.touched"
                      severity="error"
                      text="Email is required"
                      class="field-error">
                    </p-message>
                    <p-message
                      *ngIf="registerForm.get('email')?.hasError('email') && registerForm.get('email')?.touched"
                      severity="error"
                      text="Please enter a valid email address"
                      class="field-error">
                    </p-message>
                  </div>

                  <!-- Phone Number Field -->
                  <div class="input-group">
                    <label for="phoneNumber" class="input-label">
                      <i class="pi pi-phone label-icon"></i>
                      Phone Number
                    </label>
                    <div class="input-wrapper">
                      <input
                        pInputText
                        id="phoneNumber"
                        formControlName="phoneNumber"
                        placeholder="Enter your phone number"
                        class="modern-input"
                        [class.error]="registerForm.get('phoneNumber')?.invalid && registerForm.get('phoneNumber')?.touched"
                      />
                    </div>
                    <p-message
                      *ngIf="registerForm.get('phoneNumber')?.hasError('required') && registerForm.get('phoneNumber')?.touched"
                      severity="error"
                      text="Phone number is required"
                      class="field-error">
                    </p-message>
                    <p-message
                      *ngIf="registerForm.get('phoneNumber')?.hasError('pattern') && registerForm.get('phoneNumber')?.touched"
                      severity="error"
                      text="Phone number should contain only digits"
                      class="field-error">
                    </p-message>
                  </div>

                  <!-- Password Field -->
                  <div class="input-group">
                    <label for="registerPassword" class="input-label">
                      <i class="pi pi-lock label-icon"></i>
                      Password
                    </label>
                    <div class="input-wrapper">
                      <p-password
                        formControlName="password"
                        placeholder="Enter your password"
                        [toggleMask]="true"
                        [feedback]="true"
                        styleClass="modern-password"
                        inputStyleClass="modern-input"
                        [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
                      </p-password>
                    </div>
                    <p-message
                      *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                      severity="error"
                      text="Password is required"
                      class="field-error">
                    </p-message>
                  </div>

                  <!-- Confirm Password Field -->
                  <div class="input-group">
                    <label for="confirmPassword" class="input-label">
                      <i class="pi pi-lock label-icon"></i>
                      Confirm Password
                    </label>
                    <div class="input-wrapper">
                      <p-password
                        formControlName="confirmPassword"
                        placeholder="Confirm your password"
                        [toggleMask]="true"
                        [feedback]="false"
                        styleClass="modern-password"
                        inputStyleClass="modern-input"
                        [class.error]="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
                      </p-password>
                    </div>
                    <p-message
                      *ngIf="registerForm.get('confirmPassword')?.hasError('required') && registerForm.get('confirmPassword')?.touched"
                      severity="error"
                      text="Please confirm your password"
                      class="field-error">
                    </p-message>
                    <p-message
                      *ngIf="registerForm.get('confirmPassword')?.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched"
                      severity="error"
                      text="Passwords do not match"
                      class="field-error">
                    </p-message>
                  </div>

                  <!-- Register Button -->
                  <p-button
                    type="submit"
                    label="Create Account"
                    icon="pi pi-user-plus"
                    styleClass="auth-button secondary-button"
                    [disabled]="registerForm.invalid"
                    [loading]="isRegisterLoading">
                  </p-button>

                  <!-- Success Message -->
                  <p-message
                    *ngIf="registerSuccessMessage"
                    severity="success"
                    [text]="registerSuccessMessage"
                    class="form-success">
                  </p-message>

                </form>
              </p-tabPanel>
              
            </p-tabView>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .auth-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
      background-size: 400% 400%;
      animation: gradientShift 20s ease infinite;
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.7;
      animation: float 20s ease-in-out infinite;
    }
    
    .orb-1 {
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, #ff6b6b, #ffa500);
      top: -150px;
      left: -150px;
      animation-delay: 0s;
    }
    
    .orb-2 {
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      bottom: -100px;
      right: -100px;
      animation-delay: -7s;
    }
    
    .orb-3 {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #b06ab3, #4568dc);
      top: 20%;
      right: 20%;
      animation-delay: -14s;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-30px) rotate(120deg); }
      66% { transform: translateY(20px) rotate(240deg); }
    }
    
    .auth-content {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 600px;
      padding: 2rem;
    }
    
    .auth-card-wrapper {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 24px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
    }
    
    .welcome-header {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      padding: 2.5rem 2rem;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .welcome-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }
    
    .welcome-icon i {
      font-size: 2rem;
      color: white;
    }
    
    .welcome-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .welcome-subtitle {
      color: #718096;
      font-size: 1.1rem;
      margin: 0;
    }
    
    .auth-card {
      padding: 0;
    }
    
    .auth-form {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .input-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      color: #4a5568;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    
    .label-icon {
      color: #667eea;
      font-size: 0.875rem;
    }
    
    .input-wrapper {
      position: relative;
    }
    
    :host ::ng-deep .modern-input {
      width: 100%;
      padding: 1rem 1.25rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      background: white;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    }
    
    :host ::ng-deep .modern-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      outline: none;
    }
    
    :host ::ng-deep .modern-input.error {
      border-color: #e53e3e;
      box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
    
    :host ::ng-deep .modern-password {
      width: 100%;
    }
    
    :host ::ng-deep .modern-password .p-password-input {
      padding: 1rem 1.25rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      background: white;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    }
    
    :host ::ng-deep .modern-password .p-password-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    :host ::ng-deep .modern-password.error .p-password-input {
      border-color: #e53e3e;
      box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
    
    :host ::ng-deep .modern-password .p-password-toggle-mask-icon {
      color: #718096;
      transition: color 0.2s ease;
    }
    
    :host ::ng-deep .modern-password .p-password-toggle-mask-icon:hover {
      color: #667eea;
    }
    
    .checkbox-group {
      margin: 0.5rem 0;
    }
    
    :host ::ng-deep .p-checkbox {
      margin-right: 0.5rem;
    }
    
    :host ::ng-deep .p-checkbox-box {
      border-radius: 6px;
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;
    }
    
    :host ::ng-deep .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
      border-color: #667eea;
    }
    
    :host ::ng-deep .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight {
      background: #667eea;
      border-color: #667eea;
    }
    
    :host ::ng-deep .auth-button {
      width: 100%;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      margin-top: 1rem;
      transition: all 0.3s ease;
      border: none;
    }
    
    :host ::ng-deep .primary-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    :host ::ng-deep .primary-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
    
    :host ::ng-deep .secondary-button {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
    }
    
    :host ::ng-deep .secondary-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
    }
    
    .forgot-password {
      text-align: center;
      margin-top: 1rem;
    }
    
    .forgot-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .forgot-link:hover {
      color: #764ba2;
      text-decoration: underline;
    }
    
    :host ::ng-deep .field-error,
    :host ::ng-deep .form-error,
    :host ::ng-deep .form-success {
      margin-top: 0.5rem;
    }
    
    :host ::ng-deep .p-tabview .p-tabview-nav {
      background: transparent;
      border: none;
      padding: 0 2rem;
    }
    
    :host ::ng-deep .p-tabview .p-tabview-nav li {
      margin-right: 0;
    }
    
    :host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link {
      background: transparent;
      border: none;
      padding: 1.5rem 2rem;
      color: #718096;
      font-weight: 600;
      border-radius: 0;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
    }
    
    :host ::ng-deep .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
      background: transparent;
      color: #667eea;
      border-bottom-color: #667eea;
    }
    
    :host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link:hover {
      background: rgba(102, 126, 234, 0.05);
      color: #667eea;
    }
    
    :host ::ng-deep .p-tabview .p-tabview-panels {
      background: transparent;
      border: none;
      padding: 0;
    }
    
    :host ::ng-deep .p-tabview .p-tabview-panel {
      background: transparent;
      padding: 0;
    }
    
    @media (max-width: 640px) {
      .auth-content {
        padding: 1rem;
      }
      
      .welcome-header {
        padding: 2rem 1.5rem;
      }
      
      .auth-form {
        padding: 1.5rem;
      }
      
      :host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link {
        padding: 1.25rem 1rem;
        font-size: 0.875rem;
      }
    }
  `]
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  activeTabIndex = 0;
  isLoginLoading = false;
  isRegisterLoading = false;
  loginErrorMessage = '';
  registerSuccessMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberUsername: [false]
    });

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Set active tab based on route
    const currentPath = this.router.url;
    this.activeTabIndex = currentPath.includes('register') ? 1 : 0;
    
    // Load saved username if exists
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      this.loginForm.patchValue({
        username: savedUsername,
        rememberUsername: true
      });
    }
  }

  onTabChange(index: number) {
    this.activeTabIndex = index;
    // Update URL without navigation
    const newPath = index === 1 ? '/register' : '/login';
    this.router.navigateByUrl(newPath, { replaceUrl: true });
  }

  passwordMatchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    
    return null;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoginLoading = true;
      this.loginErrorMessage = '';

      const { username, password, rememberUsername } = this.loginForm.value;

      // Simulate API call
      setTimeout(() => {
        if (username && password) {
          if (rememberUsername) {
            localStorage.setItem('rememberedUsername', username);
          } else {
            localStorage.removeItem('rememberedUsername');
          }

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify({ username }));

          this.router.navigate(['/landing']);
        } else {
          this.loginErrorMessage = 'Invalid username or password';
        }
        this.isLoginLoading = false;
      }, 1000);
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.isRegisterLoading = true;
      this.registerSuccessMessage = '';

      const formData = this.registerForm.value;

      // Simulate API call
      setTimeout(() => {
        const userData = {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          registeredAt: new Date().toISOString()
        };

        localStorage.setItem('userProfile', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({ username: formData.email }));

        this.registerSuccessMessage = 'Account created successfully! Redirecting to products...';
        
        setTimeout(() => {
          this.router.navigate(['/landing']);
        }, 2000);

        this.isRegisterLoading = false;
      }, 1000);
    }
  }
}
