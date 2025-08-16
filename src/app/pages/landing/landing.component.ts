import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    RatingModule,
    FormsModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to E-Shop</h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">Discover amazing products at unbeatable prices</p>
          <div class="flex justify-center space-x-4">
            <i class="pi pi-shopping-cart text-3xl"></i>
            <i class="pi pi-heart text-3xl"></i>
            <i class="pi pi-star text-3xl"></i>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="container mx-auto px-4 py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p class="text-lg text-gray-600">Browse our amazing collection of products</p>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div *ngFor="let product of products" class="product-card">
            <p-card styleClass="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
              <!-- Product Image -->
              <ng-template pTemplate="header">
                <div class="relative">
                  <img 
                    [src]="product.image" 
                    [alt]="product.name"
                    class="w-full h-48 object-cover"
                  />
                  <p-tag 
                    *ngIf="!product.inStock"
                    value="Out of Stock"
                    severity="danger"
                    class="absolute top-2 right-2">
                  </p-tag>
                  <p-tag 
                    *ngIf="product.inStock"
                    [value]="product.category"
                    severity="info"
                    class="absolute top-2 right-2">
                  </p-tag>
                </div>
              </ng-template>

              <!-- Product Content -->
              <div class="flex flex-col h-full">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
                <p class="text-gray-600 text-sm mb-3 flex-grow">{{ product.description }}</p>
                
                <!-- Rating -->
                <div class="flex items-center mb-3">
                  <p-rating
                    [(ngModel)]="product.rating"
                    [readonly]="true"
                    styleClass="text-sm">
                  </p-rating>
                  <span class="ml-2 text-sm text-gray-500">({{ product.rating }}/5)</span>
                </div>

                <!-- Price -->
                <div class="flex items-center justify-between mb-4">
                  <span class="text-2xl font-bold text-blue-600">\${{ product.price }}</span>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-2 mt-auto">
                  <p-button 
                    label="View Details"
                    icon="pi pi-eye"
                    styleClass="flex-1"
                    severity="secondary"
                    size="small"
                    (onClick)="viewDetails(product)">
                  </p-button>
                  <p-button 
                    label="Add to Cart"
                    icon="pi pi-shopping-cart"
                    styleClass="flex-1"
                    size="small"
                    [disabled]="!product.inStock"
                    (onClick)="addToCart(product)">
                  </p-button>
                </div>
              </div>
            </p-card>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="products.length === 0" class="text-center py-16">
          <i class="pi pi-shopping-bag text-6xl text-gray-400 mb-4"></i>
          <h3 class="text-2xl font-semibold text-gray-700 mb-2">No Products Available</h3>
          <p class="text-gray-500">Check back later for amazing deals!</p>
        </div>
      </div>

      <!-- Features Section -->
      <div class="bg-white py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div class="feature-item">
              <i class="pi pi-truck text-4xl text-blue-600 mb-4"></i>
              <h3 class="text-xl font-semibold mb-2">Free Shipping</h3>
              <p class="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div class="feature-item">
              <i class="pi pi-shield text-4xl text-green-600 mb-4"></i>
              <h3 class="text-xl font-semibold mb-2">Secure Payment</h3>
              <p class="text-gray-600">Your payment information is safe with us</p>
            </div>
            <div class="feature-item">
              <i class="pi pi-refresh text-4xl text-purple-600 mb-4"></i>
              <h3 class="text-xl font-semibold mb-2">Easy Returns</h3>
              <p class="text-gray-600">30-day return policy on all items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      transition: transform 0.2s ease-in-out;
    }
    
    .product-card:hover {
      transform: translateY(-4px);
    }
    
    :host ::ng-deep .p-card {
      border-radius: 0.75rem;
      border: none;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    :host ::ng-deep .p-card-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    
    :host ::ng-deep .p-rating .p-rating-icon {
      color: #fbbf24;
    }
    
    .feature-item {
      padding: 2rem;
      border-radius: 0.75rem;
      transition: background-color 0.2s;
    }
    
    .feature-item:hover {
      background-color: #f9fafb;
    }
  `]
})
export class LandingComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      rating: 4.5,
      category: 'Electronics',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      rating: 4.2,
      category: 'Wearables',
      inStock: true
    },
    {
      id: 3,
      name: 'Premium Coffee Maker',
      description: 'Brew the perfect cup of coffee every morning with this programmable coffee maker.',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=300&fit=crop',
      rating: 4.8,
      category: 'Kitchen',
      inStock: false
    },
    {
      id: 4,
      name: 'Ergonomic Office Chair',
      description: 'Comfortable and supportive office chair designed for long working hours.',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      rating: 4.6,
      category: 'Furniture',
      inStock: true
    },
    {
      id: 5,
      name: 'Portable Bluetooth Speaker',
      description: 'Compact and powerful speaker with crystal clear sound and waterproof design.',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      rating: 4.3,
      category: 'Audio',
      inStock: true
    },
    {
      id: 6,
      name: 'Gaming Mechanical Keyboard',
      description: 'Professional gaming keyboard with RGB backlighting and mechanical switches.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
      rating: 4.7,
      category: 'Gaming',
      inStock: true
    },
    {
      id: 7,
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop',
      rating: 4.1,
      category: 'Accessories',
      inStock: true
    },
    {
      id: 8,
      name: 'Ultra HD Web Camera',
      description: '4K webcam perfect for video conferencing and content creation.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop',
      rating: 4.4,
      category: 'Electronics',
      inStock: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  viewDetails(product: Product): void {
    alert(`Viewing details for: ${product.name}\nPrice: $${product.price}\nCategory: ${product.category}`);
  }

  addToCart(product: Product): void {
    if (product.inStock) {
      alert(`${product.name} has been added to your cart!`);
      // In a real app, this would add to cart service/state
    }
  }
}
