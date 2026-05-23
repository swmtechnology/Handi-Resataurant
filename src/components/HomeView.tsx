/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, Star, Utensils, Award, Leaf, Flame } from "lucide-react";
import { Dish, NavigationScreen } from "../types";
import { DISHES } from "../data";

interface HomeViewProps {
  onSelectDish: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
  onNavigate: (screen: NavigationScreen) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setVegOnly: (veg: boolean) => void;
  setNonVegOnly: (nonVeg: boolean) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectDish,
  onAddToCart,
  onNavigate,
  setSearchQuery,
  setSelectedCategory,
  setVegOnly,
  setNonVegOnly,
}) => {
  // We'll show must-try specials here
  const specialDishes = DISHES.filter((d) => d.category === "Handi Specials").slice(0, 3);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (categoryName.toLowerCase() === "veg") {
      setVegOnly(true);
      setNonVegOnly(false);
    } else if (categoryName.toLowerCase() === "non-veg") {
      setVegOnly(false);
      setNonVegOnly(true);
    } else {
      setVegOnly(false);
      setNonVegOnly(false);
    }
    onNavigate(NavigationScreen.MENU);
  };

  const handleSearchFocus = () => {
    onNavigate(NavigationScreen.MENU);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-primary mb-1 hidden md:block leading-tight text-4xl lg:text-5xl">
            Handi Restaurant
          </h1>
          <p className="font-body-lg text-on-surface-variant">Authentic flavors, delivered.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 pointer-events-none" />
          <input
            onClick={handleSearchFocus}
            onFocus={handleSearchFocus}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary shadow-sm outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/70 transition-all cursor-pointer"
            placeholder="Search for Handi specialities..."
            type="text"
            readOnly
          />
        </div>
      </div>

      {/* Featured Offers Carousel */}
      <section
        onClick={() => {
          // Biryani spec page
          const biryani = DISHES.find((d) => d.id === "biryani-1");
          if (biryani) onSelectDish(biryani);
        }}
        className="relative rounded-2xl overflow-hidden shadow-lg h-48 md:h-64 bg-surface-container-high group cursor-pointer hover:shadow-xl transition-all duration-300"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrLvCHgLrRJgdTuCUGdC5sELFkiIXH_WIFh2tOFj8G-IifoqB8Fp3xYAfyoSveNoBaOLhuWm7LL9bm3Ee-P5VdF8ulUJpIrKFq-Xzs0l9XueIKC7BA3MVEUg_g3dW2vpcELkDcY-mPZaxTSUkf3PWH8nSAlvYlljG14u9mKqg4HNjkXUN4dfE0hcQeZXJHF_9nrSAvT-piay9AsA63qlV-5_hpCdx_bR65sRVqbiHdV-flKpQ0ApYERSe5agAFTZWvxDI0ZXmUWGU')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm rounded-full mb-3 w-max shadow-sm">
            Offer of the Day
          </span>
          <h2 className="font-headline-lg text-white mb-2 max-w-[80%] md:max-w-[65%] text-2xl md:text-3xl lg:text-4xl leading-tight">
            50% Off on First Order
          </h2>
          <p className="font-body-md text-white/90">Experience the magic of authentic Handi Biryani.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-2">
        <h3 className="font-title-lg text-on-surface mb-3">Categories</h3>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 scroll-smooth">
          {/* Biryani Circle */}
          <div
            onClick={() => handleCategoryClick("Biryani")}
            className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Utensils className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <span className="font-label-sm text-center text-on-surface group-hover:text-primary transition-colors">
              Biryani
            </span>
          </div>

          {/* North Indian Circle */}
          <div
            onClick={() => handleCategoryClick("North Indian")}
            className="flex flex-col items-center gap-2 min-w-[90px] cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Award className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <span className="font-label-sm text-center text-on-surface group-hover:text-primary transition-colors">
              North Indian
            </span>
          </div>

          {/* Veg Circle with badge overlay */}
          <div
            onClick={() => handleCategoryClick("Veg")}
            className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative">
              <Leaf className="w-6 h-6 text-tertiary group-hover:text-white" />
              <div className="absolute -top-1 -right-0.5 w-4.5 h-4.5 bg-tertiary rounded flex items-center justify-center border border-surface">
                <div className="w-1.5 h-1.5 bg-surface rounded-full"></div>
              </div>
            </div>
            <span className="font-label-sm text-center text-on-surface group-hover:text-tertiary transition-colors">
              Veg
            </span>
          </div>

          {/* Non Veg Circle with badge overlay */}
          <div
            onClick={() => handleCategoryClick("Non-Veg")}
            className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative">
              <Flame className="w-6 h-6 text-primary group-hover:text-white" />
              <div className="absolute -top-1 -right-0.5 w-4.5 h-4.5 border border-primary rounded flex items-center justify-center bg-surface">
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-primary mt-0.5"></div>
              </div>
            </div>
            <span className="font-label-sm text-center text-on-surface group-hover:text-primary transition-colors">
              Non-Veg
            </span>
          </div>
        </div>
      </section>

      {/* Must Try Specials Grid */}
      <section className="pb-10">
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-title-lg text-on-surface">Must Try Handi Specials</h3>
          <button
            onClick={() => handleCategoryClick("Handi Specials")}
            className="font-label-sm text-primary hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_12px_rgba(108,27,24,0.03)] border border-outline-variant/40 overflow-hidden hover:shadow-[0_10px_24px_rgba(108,27,24,0.07)] transition-all duration-300 flex flex-col"
            >
              <div
                onClick={() => onSelectDish(dish)}
                className="h-48 bg-surface-variant relative cursor-pointer overflow-hidden group"
              >
                <img
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={dish.image}
                />
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                  <span className="font-label-sm text-on-surface">{dish.rating}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h4
                    onClick={() => onSelectDish(dish)}
                    className="font-title-lg text-on-surface line-clamp-1 hover:text-primary cursor-pointer"
                  >
                    {dish.name}
                  </h4>
                  {dish.isVeg ? (
                    <div className="w-4 h-4 border-2 border-tertiary rounded flex items-center justify-center bg-surface shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 bg-tertiary rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 border-2 border-primary rounded flex items-center justify-center bg-surface shrink-0 mt-1">
                      <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[5px] border-b-primary mt-0.5"></div>
                    </div>
                  )}
                </div>

                <p className="font-body-md text-on-surface-variant mb-4 line-clamp-2 leading-relaxed flex-1">
                  {dish.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <span className="font-headline-md text-primary font-bold">₹{dish.price}</span>
                  <button
                    onClick={() => onAddToCart(dish)}
                    className="bg-primary text-on-primary px-5 py-2 rounded-full font-label-lg hover:bg-primary-container transition-colors shadow-sm cursor-pointer hover:shadow"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
