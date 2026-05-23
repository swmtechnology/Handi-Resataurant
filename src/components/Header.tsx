/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, User, ArrowLeft, Heart, Share2 } from "lucide-react";
import { NavigationScreen } from "../types";

interface HeaderProps {
  currentScreen: NavigationScreen;
  location: string;
  onBack: () => void;
  onNavigate: (screen: NavigationScreen) => void;
  hasBackHistory: boolean;
  onShare: () => void;
  isLiked?: boolean;
  onLikeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  location,
  onBack,
  onNavigate,
  hasBackHistory,
  onShare,
  isLiked = false,
  onLikeToggle,
}) => {
  // Determine header layout based on active view type
  const isDetailView = currentScreen === NavigationScreen.DETAIL;
  const isCheckoutView = currentScreen === NavigationScreen.CHECKOUT;
  const isOrdersView = currentScreen === NavigationScreen.ORDERS;
  const isProfileView = currentScreen === NavigationScreen.PROFILE;

  // Render Back-button enabled transactions (Detail, Checkout, Custom detail sub-pages)
  const isTransactional = isDetailView || isCheckoutView;

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md border-b border-surface-container-highest transition-all duration-300">
      <div className="max-w-[1200px] mx-auto h-16 px-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back button logic */}
          {(isTransactional || (hasBackHistory && currentScreen !== NavigationScreen.HOME)) ? (
            <button
              onClick={onBack}
              aria-label="Back"
              className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : null}

          {/* Location / Page Title Widget */}
          {isCheckoutView ? (
            <h1 className="font-title-lg text-title-lg text-on-surface">Checkout</h1>
          ) : isOrdersView ? (
            <h1 className="font-title-lg text-title-lg text-on-surface">Your Orders</h1>
          ) : isProfileView ? (
            <h1 className="font-title-lg text-title-lg text-on-surface">My Profile</h1>
          ) : (
            <div className="flex items-center gap-2">
              <MapPin className="text-primary w-5 h-5 shrink-0" />
              <span className="font-title-lg text-title-lg text-on-surface line-clamp-1">
                {location}
              </span>
            </div>
          )}
        </div>

        {/* Desktop Header Hub (Mobile nav is docked at the bottom) */}
        <div className="hidden md:flex flex-1 justify-center gap-6 items-center">
          <button
            onClick={() => onNavigate(NavigationScreen.HOME)}
            className={`font-label-lg text-label-lg transition-colors px-4 py-2 rounded-full cursor-pointer ${
              currentScreen === NavigationScreen.HOME
                ? "text-primary font-bold bg-primary-container/10"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate(NavigationScreen.MENU)}
            className={`font-label-lg text-label-lg transition-colors px-4 py-2 rounded-full cursor-pointer ${
              currentScreen === NavigationScreen.MENU
                ? "text-primary font-bold bg-primary-container/10"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => onNavigate(NavigationScreen.ORDERS)}
            className={`font-label-lg text-label-lg transition-colors px-4 py-2 rounded-full cursor-pointer ${
              currentScreen === NavigationScreen.ORDERS
                ? "text-primary font-bold bg-primary-container/10"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => onNavigate(NavigationScreen.PROFILE)}
            className={`font-label-lg text-label-lg transition-colors px-4 py-2 rounded-full cursor-pointer ${
              currentScreen === NavigationScreen.PROFILE
                ? "text-primary font-bold bg-primary-container/10"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            Profile
          </button>
        </div>

        {/* User / Action Buttons */}
        <div className="flex items-center gap-2">
          {isDetailView ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onLikeToggle}
                aria-label="Favorite"
                className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${isLiked ? "fill-primary text-primary" : ""}`}
                />
              </button>
              <button
                onClick={onShare}
                aria-label="Share"
                className="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate(NavigationScreen.PROFILE)}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-outline-variant/30 hover:border-primary cursor-pointer transition-all flex items-center justify-center bg-surface-container-highest"
            >
              <img
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5hTMqx5c-Q6QMxhhCoNWsKXawTdg9oqVyv6-tD9G37WjIcYLLTv5-XYZlo-HHP4LFJP9_gbZ8zgSxG6Cz8pm9_VXS6C4ycYNETjCbzm-U2SAmLdPGr2reyRvhPNv8q_3CqRnLUoOJNCsTlAduvVP0bjOsFz9zQ09DB65hQXyLaIIiPnQBjXqGirdnIuD3ZWTicTVkZ42zd7SoaLdaivs5MHn-ERO6TTPwEG8rFqpyqBOIFTs64unFobyX3jNKbv-PWOYmkAHp4V0"
                onError={(e) => {
                  // Fallback to Lucide User icon if load fails
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <User className="absolute w-4 h-4 text-on-surface-variant" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
