/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Home, Search, ClipboardList, User } from "lucide-react";
import { NavigationScreen } from "../types";

interface BottomNavProps {
  currentScreen: NavigationScreen;
  onNavigate: (screen: NavigationScreen) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
}) => {
  // Do not show bottom nav on checkout or detail views to keep transactional flows focused and uncluttered, matching specifications
  if (currentScreen === NavigationScreen.CHECKOUT || currentScreen === NavigationScreen.DETAIL) {
    return null;
  }

  const navItems = [
    {
      screen: NavigationScreen.HOME,
      label: "Home",
      icon: Home,
    },
    {
      screen: NavigationScreen.MENU,
      label: "Search & Menu",
      icon: Search,
    },
    {
      screen: NavigationScreen.ORDERS,
      label: "Orders",
      icon: ClipboardList,
    },
    {
      screen: NavigationScreen.PROFILE,
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-safe h-20 shadow-[0_-4px_12px_rgba(108,27,24,0.05)] bg-surface rounded-t-2xl border-t border-surface-container-highest">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;
        const Icon = item.icon;

        return (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center justify-center py-2 px-3 transition-all duration-250 cursor-pointer ${
              isActive
                ? "text-primary font-bold bg-secondary-container/15 rounded-full scale-100 px-5"
                : "text-on-surface-variant hover:text-primary scale-95"
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.screen === NavigationScreen.ORDERS && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-label-sm text-[11px] mt-1">{item.label.split(" ")[0]}</span>
          </button>
        );
      })}
    </nav>
  );
};
