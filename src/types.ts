/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum NavigationScreen {
  HOME = "home",
  MENU = "menu",
  DETAIL = "detail",
  CHECKOUT = "checkout",
  ORDERS = "orders",
  PROFILE = "profile",
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  ratingCount?: string;
  time?: string;
  isVeg: boolean;
  category: string;
  sizes?: string[];
  sizePrices?: Record<string, number>;
  dietaryTags?: string[];
}

export interface CartItem {
  id: string;
  dish: Dish;
  quantity: number;
  selectedSize?: string;
  selectedAccompaniments?: string[]; // Names of active accompaniments
  addedPrice: number; // Single item price including size + accompaniments
}

export interface DeliveryAddress {
  label: string;
  address: string;
  timeEstimation: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  address: DeliveryAddress;
  paymentMethod: string;
  totalBeforeDiscount: number;
  discount: number;
  taxes: number;
  deliveryFee: number;
  finalPaid: number;
  status: "Placed" | "Preparing" | "Out for Delivery" | "Delivered";
}
