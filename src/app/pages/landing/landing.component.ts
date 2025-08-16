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
    <div class="min-h-screen">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-background">
          <div class="hero-orb orb-1"></div>
          <div class="hero-orb orb-2"></div>
          <div class="hero-orb orb-3"></div>
        </div>
        <div class="container mx-auto px-6 relative z-10 text-center py-20">
          <div class="hero-content">
            <div class="hero-badge">
              <i class="pi pi-star-fill"></i>
              <span>Premium Shopping Experience</span>
            </div>
            <h1 class="hero-title">
              Welcome to
              <span class="hero-brand">E-Shop</span>
            </h1>
            <p class="hero-subtitle">
              Discover amazing products at unbeatable prices with our curated collection of premium items
            </p>
            <div class="hero-features">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="pi pi-shopping-cart"></i>
                </div>
                <span>Easy Shopping</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="pi pi-heart"></i>
                </div>
                <span>Quality Products</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="pi pi-star"></i>
                </div>
                <span>Best Prices</span>
              </div>
            </div>
            <div class="hero-cta">
              <p-button
                label="Shop Now"
                icon="pi pi-arrow-down"
                styleClass="hero-button"
                (onClick)="scrollToProducts()">
              </p-button>
            </div>
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
    .hero-section {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }

    .hero-background {
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

    .hero-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.6;
      animation: float 25s ease-in-out infinite;
    }

    .orb-1 {
      width: 400px;
      height: 400px;
      background: linear-gradient(135deg, #ff6b6b, #ffa500);
      top: -200px;
      left: -200px;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      bottom: -150px;
      right: -150px;
      animation-delay: -8s;
    }

    .orb-3 {
      width: 250px;
      height: 250px;
      background: linear-gradient(135deg, #b06ab3, #4568dc);
      top: 30%;
      right: 30%;
      animation-delay: -16s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-40px) rotate(120deg); }
      66% { transform: translateY(30px) rotate(240deg); }
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50px;
      padding: 0.75rem 1.5rem;
      color: white;
      font-weight: 600;
      margin-bottom: 2rem;
      animation: fadeInUp 1s ease 0.2s both;
    }

    .hero-title {
      font-size: 4rem;
      font-weight: 700;
      color: white;
      margin-bottom: 1.5rem;
      line-height: 1.1;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      animation: fadeInUp 1s ease 0.4s both;
    }

    .hero-brand {
      background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: none;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 3rem;
      line-height: 1.6;
      animation: fadeInUp 1s ease 0.6s both;
    }

    .hero-features {
      display: flex;
      justify-content: center;
      gap: 3rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
      animation: fadeInUp 1s ease 0.8s both;
    }

    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      color: white;
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .feature-icon:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    .feature-icon i {
      font-size: 1.5rem;
    }

    .hero-cta {
      animation: fadeInUp 1s ease 1s both;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :host ::ng-deep .hero-button {
      background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
      border: none;
      border-radius: 50px;
      padding: 1rem 2.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      color: white;
      box-shadow: 0 8px 30px rgba(255, 107, 107, 0.3);
      transition: all 0.3s ease;
    }

    :host ::ng-deep .hero-button:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
    }

    .product-card {
      transition: all 0.3s ease;
      border-radius: 20px;
      overflow: hidden;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    :host ::ng-deep .p-card {
      border-radius: 20px;
      border: none;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }

    :host ::ng-deep .p-card:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }

    :host ::ng-deep .p-card-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    :host ::ng-deep .p-rating .p-rating-icon {
      color: #fbbf24;
    }

    .bottom-features {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .bottom-features .feature-item {
      padding: 3rem 2rem;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      text-align: center;
      color: white;
    }

    .bottom-features .feature-item:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-5px);
    }

    .bottom-features .feature-item i {
      display: block;
      margin-bottom: 1.5rem;
    }

    .bottom-features .feature-item h3 {
      color: white;
      margin-bottom: 1rem;
    }

    .bottom-features .feature-item p {
      color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.25rem;
      }

      .hero-features {
        gap: 2rem;
      }

      .feature-icon {
        width: 50px;
        height: 50px;
      }

      .feature-icon i {
        font-size: 1.25rem;
      }
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
