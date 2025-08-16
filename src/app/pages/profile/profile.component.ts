import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  registeredAt: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    AvatarModule,
    DividerModule
  ],
  template: `
    <div class="profile-container">
      <div class="profile-background">
        <div class="profile-orb orb-1"></div>
        <div class="profile-orb orb-2"></div>
      </div>
      <div class="profile-content py-12">
      <div class="container mx-auto px-4 max-w-4xl">
        
        <!-- Profile Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p class="text-gray-600">Manage your personal information</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Profile Summary Card -->
          <div class="lg:col-span-1">
            <p-card header="Profile Summary" class="h-fit">
              <div class="text-center">
                <p-avatar 
                  [label]="getInitials()" 
                  size="xlarge" 
                  styleClass="bg-blue-500 text-white mb-4">
                </p-avatar>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  {{ userProfile?.fullName || 'Guest User' }}
                </h3>
                <p class="text-gray-600 mb-4">{{ userProfile?.email || 'No email provided' }}</p>
                
                <p-divider></p-divider>
                
                <div class="text-left space-y-3 mt-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="pi pi-phone mr-2 text-blue-500"></i>
                    <span>{{ userProfile?.phoneNumber || 'No phone provided' }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="pi pi-calendar mr-2 text-blue-500"></i>
                    <span>Member since {{ getFormattedDate() }}</span>
                  </div>
                </div>
              </div>
            </p-card>
          </div>

          <!-- Profile Details & Edit Form -->
          <div class="lg:col-span-2">
            <p-card [header]="isEditing ? 'Edit Profile' : 'Profile Information'">
              
              <!-- View Mode -->
              <div *ngIf="!isEditing" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div class="p-3 bg-gray-50 rounded-lg border">
                      {{ userProfile?.fullName || 'Not provided' }}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div class="p-3 bg-gray-50 rounded-lg border">
                      {{ userProfile?.email || 'Not provided' }}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div class="p-3 bg-gray-50 rounded-lg border">
                      {{ userProfile?.phoneNumber || 'Not provided' }}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                    <div class="p-3 bg-gray-50 rounded-lg border">
                      {{ getFormattedDate() }}
                    </div>
                  </div>
                </div>

                <p-divider></p-divider>

                <div class="flex justify-center">
                  <p-button 
                    label="Edit Profile"
                    icon="pi pi-pencil"
                    (onClick)="enableEditing()"
                    styleClass="px-8">
                  </p-button>
                </div>
              </div>

              <!-- Edit Mode -->
              <div *ngIf="isEditing">
                <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="space-y-6">
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <!-- Full Name Field -->
                    <div>
                      <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        pInputText
                        id="fullName"
                        formControlName="fullName"
                        placeholder="Enter your full name"
                        class="w-full modern-input"
                        [class.ng-invalid]="profileForm.get('fullName')?.invalid && profileForm.get('fullName')?.touched"
                      />
                      <p-message
                        *ngIf="profileForm.get('fullName')?.invalid && profileForm.get('fullName')?.touched"
                        severity="error"
                        text="Full name is required"
                        class="mt-1 block">
                      </p-message>
                    </div>

                    <!-- Email Field -->
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span class="text-red-500">*</span>
                      </label>
                      <input
                        pInputText
                        id="email"
                        formControlName="email"
                        placeholder="Enter your email"
                        type="email"
                        class="w-full"
                        [class.ng-invalid]="profileForm.get('email')?.invalid && profileForm.get('email')?.touched"
                      />
                      <p-message
                        *ngIf="profileForm.get('email')?.hasError('required') && profileForm.get('email')?.touched"
                        severity="error"
                        text="Email is required"
                        class="mt-1 block">
                      </p-message>
                      <p-message
                        *ngIf="profileForm.get('email')?.hasError('email') && profileForm.get('email')?.touched"
                        severity="error"
                        text="Please enter a valid email address"
                        class="mt-1 block">
                      </p-message>
                    </div>

                    <!-- Phone Number Field -->
                    <div class="md:col-span-2">
                      <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span class="text-red-500">*</span>
                      </label>
                      <input
                        pInputText
                        id="phoneNumber"
                        formControlName="phoneNumber"
                        placeholder="Enter your phone number"
                        class="w-full"
                        [class.ng-invalid]="profileForm.get('phoneNumber')?.invalid && profileForm.get('phoneNumber')?.touched"
                      />
                      <p-message
                        *ngIf="profileForm.get('phoneNumber')?.hasError('required') && profileForm.get('phoneNumber')?.touched"
                        severity="error"
                        text="Phone number is required"
                        class="mt-1 block">
                      </p-message>
                      <p-message
                        *ngIf="profileForm.get('phoneNumber')?.hasError('pattern') && profileForm.get('phoneNumber')?.touched"
                        severity="error"
                        text="Phone number should contain only digits"
                        class="mt-1 block">
                      </p-message>
                    </div>
                  </div>

                  <p-divider></p-divider>

                  <!-- Action Buttons -->
                  <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <p-button 
                      type="submit"
                      label="Save Changes"
                      icon="pi pi-check"
                      [disabled]="profileForm.invalid"
                      [loading]="isSaving"
                      styleClass="px-8">
                    </p-button>
                    
                    <p-button 
                      type="button"
                      label="Cancel"
                      icon="pi pi-times"
                      severity="secondary"
                      (onClick)="cancelEditing()"
                      styleClass="px-8">
                    </p-button>
                  </div>

                  <!-- Success Message -->
                  <p-message
                    *ngIf="successMessage"
                    severity="success"
                    [text]="successMessage"
                    class="mt-4">
                  </p-message>

                </form>
              </div>
            </p-card>
          </div>
        </div>

        <!-- No Profile Data Message -->
        <div *ngIf="!userProfile" class="text-center py-16">
          <i class="pi pi-user text-6xl text-gray-400 mb-4"></i>
          <h3 class="text-2xl font-semibold text-gray-700 mb-2">No Profile Information</h3>
          <p class="text-gray-500 mb-6">Please register or login to view your profile</p>
          <p-button 
            label="Go to Register"
            icon="pi pi-user-plus"
            routerLink="/register">
          </p-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .profile-background {
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

    .profile-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.5;
      animation: float 25s ease-in-out infinite;
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
      width: 250px;
      height: 250px;
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      bottom: -125px;
      right: -125px;
      animation-delay: -10s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-30px) rotate(120deg); }
      66% { transform: translateY(20px) rotate(240deg); }
    }

    .profile-content {
      position: relative;
      z-index: 10;
    }

    :host ::ng-deep .p-card {
      border-radius: 20px;
      border: none;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    :host ::ng-deep .p-card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      padding: 2rem;
      border-radius: 20px 20px 0 0;
      text-align: center;
    }

    :host ::ng-deep .p-card-content {
      padding: 2rem;
    }

    :host ::ng-deep .p-avatar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    :host ::ng-deep .modern-input {
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 1rem;
      transition: all 0.3s ease;
      background: white;
    }

    :host ::ng-deep .modern-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    :host ::ng-deep .p-button {
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .p-button:hover:not(:disabled) {
      transform: translateY(-2px);
    }
  `]
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  profileForm: FormGroup;
  isEditing = false;
  isSaving = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.userProfile = JSON.parse(savedProfile);
    }
  }

  getInitials(): string {
    if (!this.userProfile?.fullName) return 'GU';
    
    const names = this.userProfile.fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0]?.toUpperCase() || 'GU';
  }

  getFormattedDate(): string {
    if (!this.userProfile?.registeredAt) return 'N/A';
    
    const date = new Date(this.userProfile.registeredAt);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  enableEditing(): void {
    this.isEditing = true;
    this.successMessage = '';
    
    if (this.userProfile) {
      this.profileForm.patchValue({
        fullName: this.userProfile.fullName,
        email: this.userProfile.email,
        phoneNumber: this.userProfile.phoneNumber
      });
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.successMessage = '';
    this.profileForm.reset();
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.successMessage = '';

      const formData = this.profileForm.value;

      // Simulate API call
      setTimeout(() => {
        // Update the user profile
        const updatedProfile: UserProfile = {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          registeredAt: this.userProfile?.registeredAt || new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        
        // Update current user info
        localStorage.setItem('currentUser', JSON.stringify({ username: formData.email }));

        // Update local state
        this.userProfile = updatedProfile;
        
        this.successMessage = 'Profile updated successfully!';
        this.isSaving = false;
        
        // Exit edit mode after 2 seconds
        setTimeout(() => {
          this.isEditing = false;
          this.successMessage = '';
        }, 2000);
      }, 1000);
    }
  }
}
