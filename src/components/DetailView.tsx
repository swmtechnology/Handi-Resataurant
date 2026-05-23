/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, Clock, Check, Plus, Minus } from "lucide-react";
import { Dish } from "../types";

interface DetailViewProps {
  dish: Dish;
  onAddToCartWithOptions: (
    dish: Dish,
    quantity: number,
    accompaniments: string[],
    totalSingleItemPrice: number
  ) => void;
  onBack: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  dish,
  onAddToCartWithOptions,
  onBack,
}) => {
  // Preset accompaniments matching the screenshot spec
  const initialAccompaniments = [
    { name: "Burrani Raita", price: 60, id: "raita" },
    { name: "Mirchi Ka Salan", price: 45, id: "salan" },
  ];

  // Mirchi Ka Salan starts pre-selected in the screenshot
  const [selectedAccs, setSelectedAccs] = useState<Record<string, boolean>>({
    raita: false,
    salan: true,
  });

  const [quantity, setQuantity] = useState<number>(1);

  const toggleAcc = (id: string) => {
    setSelectedAccs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Compute calculated sub-totals
  const accsPrice = initialAccompaniments.reduce((sum, item) => {
    return sum + (selectedAccs[item.id] ? item.price : 0);
  }, 0);

  const singleItemPrice = dish.price + accsPrice;
  const payTotal = singleItemPrice * quantity;

  const handleAddToCart = () => {
    const chosenAccNames = initialAccompaniments
      .filter((item) => selectedAccs[item.id])
      .map((item) => item.name);

    onAddToCartWithOptions(dish, quantity, chosenAccNames, singleItemPrice);
  };

  return (
    <div className="max-w-[1200px] mx-auto md:px-12 pt-4 pb-28">
      <div className="md:grid md:grid-cols-12 md:gap-8 md:mt-4">
        {/* Hero Image Block */}
        <div className="md:col-span-7">
          <div className="w-full h-[320px] md:h-[480px] relative md:rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
            <img
              alt={dish.name}
              className="w-full h-full object-cover"
              src={dish.image}
            />
            {/* Dark contrast gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Dynamic customized contents block */}
        <div className="px-5 md:px-0 mt-6 md:mt-0 md:col-span-5 flex flex-col gap-6">
          {/* Title and indicators */}
          <section className="space-y-3">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary leading-tight">
                  {dish.name}
                </h1>
                <p className="font-body-md text-on-surface-variant flex items-center gap-1.5 mt-1">
                  <Star className="text-secondary w-4.5 h-4.5 fill-secondary" />
                  <span className="font-bold">{dish.rating}</span>
                  <span>{dish.ratingCount || "(450 Ratings)"}</span>
                  <span className="text-on-surface-variant/40">•</span>
                  <Clock className="w-4 h-4 inline" />
                  <span>{dish.time || "30-40 mins"}</span>
                </p>
              </div>

              {/* Veg Toggle Badge indicator */}
              {dish.isVeg ? (
                <div className="w-6 h-6 border-2 border-tertiary rounded flex items-center justify-center bg-surface p-1 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                </div>
              ) : (
                <div className="w-6 h-6 border-2 border-primary rounded flex items-center justify-center bg-surface p-1 shrink-0">
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6.5px] border-b-primary mt-0.5"></div>
                </div>
              )}
            </div>

            <div className="pt-1">
              <span className="font-headline-md text-on-surface font-bold">₹{dish.price}</span>
            </div>

            <p className="font-body-lg text-on-surface-variant leading-relaxed pt-2">
              {dish.description}
            </p>
          </section>

          <hr className="border-t border-surface-container-highest" />

          {/* Accompaniments addition strip (matches screenshot list exactly) */}
          <section className="space-y-3">
            <h2 className="font-title-lg text-on-surface">Accompaniments</h2>
            <div className="flex flex-col gap-3">
              {initialAccompaniments.map((item) => {
                const checked = selectedAccs[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleAcc(item.id)}
                    className="flex items-center justify-between p-4 rounded-xl border border-surface-container-highest bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(108,27,24,0.01)]"
                  >
                    <div className="flex items-center gap-4">
                      {/* Sub-item Veg Indicator badge */}
                      <div className="w-4.5 h-4.5 border border-tertiary rounded flex items-center justify-center p-[2px] shrink-0 bg-surface">
                        <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                      </div>
                      <div>
                        <p className="font-label-lg text-on-surface font-medium">{item.name}</p>
                        <p className="font-body-md text-on-surface-variant">+₹{item.price}</p>
                      </div>
                    </div>

                    <label className="relative flex items-center cursor-pointer pointer-events-none">
                      <input
                        checked={checked}
                        onChange={() => {}}
                        className="sr-only"
                        type="checkbox"
                      />
                      <div
                        className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all ${
                          checked
                            ? "bg-primary border-primary text-white"
                            : "border-outline"
                        }`}
                      >
                        {checked && <Check className="w-4.5 h-4.5 stroke-[3px]" />}
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </section>

          <hr className="border-t border-surface-container-highest" />

          {/* Dietary Info Tags segment */}
          <section className="space-y-3">
            <h2 className="font-title-lg text-on-surface">Dietary Info</h2>
            <div className="flex flex-wrap gap-2">
              {dish.dietaryTags ? (
                dish.dietaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm rounded-full text-xs shadow-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <>
                  <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm rounded-full text-xs shadow-sm">
                    Naturally Seasoned
                  </span>
                  <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant font-label-sm rounded-full text-xs shadow-sm">
                    Traditional Clay Bake
                  </span>
                </>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Bottom Bar with quantitative controller and CTA order launcher trigger */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-md border-t border-surface-container-highest p-4 md:px-12 md:py-5 shadow-[0_-4px_16px_rgba(108,27,24,0.06)] z-40">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          {/* Quantity selector pill */}
          <div className="flex items-center bg-secondary-container/15 rounded-full h-12 px-2 border border-secondary-container/10">
            <button
              onClick={() => {
                if (quantity > 1) setQuantity((q) => q - 1);
              }}
              className="w-10 h-10 flex items-center justify-center text-primary rounded-full hover:bg-secondary-container/30 transition-all cursor-pointer"
            >
              <Minus className="w-5 h-5 stroke-[2px]" />
            </button>
            <span className="font-title-lg text-primary w-8 text-center select-none font-bold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-primary rounded-full hover:bg-secondary-container/30 transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2px]" />
            </button>
          </div>

          {/* Interactive button trigger with live price calculation */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-on-primary h-12 rounded-xl font-label-lg flex items-center justify-center gap-2 hover:bg-surface-tint active:scale-[0.99] transition-all duration-200 shadow-md shadow-primary/10 cursor-pointer"
          >
            <span>Add to Cart</span>
            <span className="w-1.5 h-1.5 bg-on-primary/60 rounded-full mx-1"></span>
            <span>₹{payTotal}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
