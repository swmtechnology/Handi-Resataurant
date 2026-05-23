/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Search, Plus, Minus, Star, ChevronRight } from "lucide-react";
import { Dish, CartItem } from "../types";
import { DISHES } from "../data";

interface MenuViewProps {
  onSelectDish: (dish: Dish) => void;
  cart: CartItem[];
  onAddToCart: (dish: Dish, quantity: number, size?: string) => void;
  onUpdateCartQuantity: (dishId: string, delta: number, size?: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  vegOnly: boolean;
  setVegOnly: (veg: boolean) => void;
  nonVegOnly: boolean;
  setNonVegOnly: (nonVeg: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  onSelectDish,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  selectedCategory,
  setSelectedCategory,
  vegOnly,
  setVegOnly,
  nonVegOnly,
  setNonVegOnly,
  searchQuery,
  setSearchQuery,
}) => {
  // Map categorized lists
  const categories = [
    "Handi Specials",
    "Soups",
    "Starters & Snacks",
    "Main Course",
    "Breads",
    "Biryani",
  ];

  // Keep track of the selected size for dishes that have size options
  // e.g. { "mutton-rogan": "Half", "main-butter-chicken": "Half" }
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "mutton-rogan": "Half",
    "main-butter-chicken": "Half",
    "main-kadhai-paneer": "Half",
  });

  const handleSizeChange = (dishId: string, sizeName: string) => {
    setSelectedSizes((prev) => ({ ...prev, [dishId]: sizeName }));
  };

  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // 1. Category search
      if (
        selectedCategory !== "all" &&
        selectedCategory !== "" &&
        dish.category.toLowerCase() !== selectedCategory.toLowerCase() &&
        // map biryani circle clicks
        !(selectedCategory.toLowerCase() === "biryani" && dish.category === "Biryani") &&
        !(selectedCategory.toLowerCase() === "north indian" && (dish.category === "Handi Specials" || dish.category === "Main Course"))
      ) {
        return false;
      }

      // 2. Veg search
      if (vegOnly && !dish.isVeg) {
        return false;
      }

      // 3. Non-veg search
      if (nonVegOnly && dish.isVeg) {
        return false;
      }

      // 4. Text search matching
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return (
          dish.name.toLowerCase().includes(query) ||
          dish.description.toLowerCase().includes(query) ||
          dish.category.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedCategory, vegOnly, nonVegOnly, searchQuery]);

  // Group filtered results by category for nice menu sectioning
  const groupedDishes = useMemo(() => {
    const groups: Record<string, Dish[]> = {};
    filteredDishes.forEach((dish) => {
      const cat = dish.category;
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(dish);
    });
    return groups;
  }, [filteredDishes]);

  // Find quantity in cart for specific size/item
  const getCartItemQuantity = (dishId: string, size?: string) => {
    const item = cart.find(
      (c) => c.id === dishId && (!size || c.selectedSize === size)
    );
    return item ? item.quantity : 0;
  };

  return (
    <div className="space-y-6">
      {/* Search & Mode Filters Area */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Main search bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-full border border-outline-variant bg-surface-container-lowest font-body-md text-on-surface placeholder:text-on-surface-variant/80 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none shadow-sm transition-all"
              placeholder="Search for Handi specialities..."
              type="text"
            />
          </div>

          {/* Filtering pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto hide-scrollbar">
            <button
              onClick={() => {
                setVegOnly(false);
                setNonVegOnly(false);
              }}
              className={`px-5 py-2.5 rounded-full border text-sm font-label-lg whitespace-nowrap cursor-pointer transition-all duration-200 ${
                !vegOnly && !nonVegOnly
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => {
                setVegOnly(true);
                setNonVegOnly(false);
              }}
              className={`px-5 py-2.5 rounded-full border text-sm font-label-lg whitespace-nowrap cursor-pointer transition-all duration-200 ${
                vegOnly
                  ? "border-tertiary bg-tertiary text-white shadow-sm"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
              }`}
            >
              Veg Only
            </button>
            <button
              onClick={() => {
                setNonVegOnly(true);
                setVegOnly(false);
              }}
              className={`px-5 py-2.5 rounded-full border text-sm font-label-lg whitespace-nowrap cursor-pointer transition-all duration-200 ${
                nonVegOnly
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
              }`}
            >
              Non-Veg Only
            </button>
          </div>
        </div>
      </div>

      {/* Primary Grid Layout. Sidebar on desktop / full-span main list */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Desktop Sidebar menu categories */}
        <aside className="hidden md:block md:col-span-3">
          <nav className="sticky top-24 flex flex-col gap-1.5 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full text-left px-4 py-3 rounded-xl font-label-lg transition-all ${
                selectedCategory === "all"
                  ? "bg-primary-container/10 text-primary font-bold border-l-4 border-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Explore All Category Dishes
            </button>
            {categories.map((catKey) => (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`w-full text-left px-4 py-3 rounded-xl font-label-lg transition-all ${
                  selectedCategory.toLowerCase() === catKey.toLowerCase()
                    ? "bg-primary-container/10 text-primary font-bold border-l-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                {catKey}
              </button>
            ))}
          </nav>
        </aside>

        {/* Master Culinary dish list */}
        <div className="col-span-1 md:col-span-9 space-y-8 pb-10">
          {Object.keys(groupedDishes).length === 0 ? (
            <div className="text-center py-12 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/60">
              <p className="font-body-lg text-on-surface-variant">No Indian delicacies match your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setVegOnly(false);
                  setNonVegOnly(false);
                }}
                className="mt-3 text-primary font-bold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            // Show grouped divisions
            Object.entries(groupedDishes).map(([catName, listVal]) => {
              const list = listVal as Dish[];
              return (
                <section key={catName} className="scroll-mt-24 space-y-4">
                  <h2 className="font-headline-md text-on-surface flex items-center gap-2">
                    <span>{catName}</span>
                    <span className="h-[1px] bg-outline-variant/40 flex-1 ml-4 hidden md:block" />
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {list.map((dish) => {
                      const hasSizes = !!dish.sizes;
                      const activeSize = selectedSizes[dish.id] || "Half";
                      const displayPrice = hasSizes
                        ? dish.sizePrices?.[activeSize] || dish.price
                        : dish.price;
                      const qInCart = getCartItemQuantity(dish.id, hasSizes ? activeSize : undefined);

                      return (
                        <div
                          key={dish.id}
                          className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 hover:border-outline-variant/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
                        >
                          {/* Food Image Container */}
                          <div className="h-44 relative overflow-hidden shrink-0">
                            <img
                              onClick={() => onSelectDish(dish)}
                              alt={dish.name}
                              className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-102"
                              src={dish.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm font-label-sm text-[11px] text-on-surface">
                              <Star className="w-3 h-3 text-secondary fill-secondary" />
                              <span>{dish.rating}</span>
                            </div>
                          </div>

                          {/* Text and Actions */}
                          <div className="p-4 flex flex-col flex-1">
                            <div className="flex justify-between items-start gap-2 mb-1">
                              <div>
                                <div className="flex items-center gap-2">
                                  {/* Indicator badging */}
                                  {dish.isVeg ? (
                                    <div className="w-4.5 h-4.5 border-2 border-tertiary rounded flex items-center justify-center p-0.5 bg-surface shrink-0">
                                      <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                                    </div>
                                  ) : (
                                    <div className="w-4.5 h-4.5 border-2 border-primary rounded flex items-center justify-center bg-surface shrink-0">
                                      <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[5.5px] border-b-primary mt-0.5"></div>
                                    </div>
                                  )}
                                  <h3
                                    onClick={() => onSelectDish(dish)}
                                    className="font-title-lg text-on-surface hover:text-primary cursor-pointer line-clamp-1 text-base md:text-lg"
                                  >
                                    {dish.name}
                                  </h3>
                                </div>
                                <p className="font-title-lg text-primary font-bold mt-1">₹{displayPrice}</p>
                              </div>

                              {/* Sticky stateful add/quantity trigger button */}
                              {qInCart > 0 ? (
                                <div className="flex items-center bg-secondary-fixed text-primary rounded-full px-2 py-1 border border-secondary-fixed-dim/50 shadow-sm shrink-0">
                                  <button
                                    onClick={() => onUpdateCartQuantity(dish.id, -1, hasSizes ? activeSize : undefined)}
                                    className="w-7 h-7 flex items-center justify-center text-primary rounded-full hover:bg-secondary-fixed-dim/40 transition-colors"
                                  >
                                    <Minus className="w-4.5 h-4.5" />
                                  </button>
                                  <span className="font-label-lg text-on-secondary-container px-3 text-center min-w-[24px]">
                                    {qInCart}
                                  </span>
                                  <button
                                    onClick={() => onUpdateCartQuantity(dish.id, 1, hasSizes ? activeSize : undefined)}
                                    className="w-7 h-7 flex items-center justify-center text-primary rounded-full hover:bg-secondary-fixed-dim/40 transition-colors"
                                  >
                                    <Plus className="w-4.5 h-4.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => onAddToCart(dish, 1, hasSizes ? activeSize : undefined)}
                                  className="bg-primary text-on-primary font-label-lg px-6 py-2 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer"
                                >
                                  ADD
                                </button>
                              )}
                            </div>

                            <p className="font-body-md text-on-surface-variant line-clamp-2 mt-2 leading-relaxed flex-1">
                              {dish.description}
                            </p>

                            {/* Dynamic Sizes drop downs */}
                            {hasSizes && (
                              <div className="mt-4 pt-3 border-t border-dashed border-outline-variant/30 flex items-center justify-between gap-2">
                                <span className="font-label-sm text-on-surface-variant text-[11px]">Choose Size:</span>
                                <select
                                  value={activeSize}
                                  onChange={(e) => handleSizeChange(dish.id, e.target.value)}
                                  className="rounded-xl border border-outline-variant bg-surface-container-lowest py-1.5 pl-3 pr-8 text-xs font-label-lg text-on-surface focus:border-primary focus:ring-1 focus:ring-primary shadow-sm outline-none cursor-pointer"
                                >
                                  {dish.sizes?.map((sz) => (
                                    <option key={sz} value={sz}>
                                      {sz} - ₹{dish.sizePrices?.[sz] || dish.price}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
