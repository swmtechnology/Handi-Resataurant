/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  MapPin,
  ShoppingBag,
  CreditCard,
  QrCode,
  Banknote,
  Plus,
  Minus,
  Check,
  ChevronRight,
  PlusCircle,
  Ticket,
  ArrowRight,
  Loader,
} from "lucide-react";
import { CartItem, DeliveryAddress, NavigationScreen, Order } from "../types";
import { PRESET_ADDRESSES } from "../data";

interface CheckoutViewProps {
  cart: CartItem[];
  onUpdateCartQuantity: (dishId: string, delta: number, size?: string) => void;
  activeAddress: DeliveryAddress;
  onChangeAddress: (address: DeliveryAddress) => void;
  selectedPaymentMethod: "UPI" | "Credit" | "Cash";
  setPaymentMethod: (pm: "UPI" | "Credit" | "Cash") => void;
  onPlaceOrder: (finalOrder: Order) => void;
  onNavigate: (screen: NavigationScreen) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  onUpdateCartQuantity,
  activeAddress,
  onChangeAddress,
  selectedPaymentMethod,
  setPaymentMethod,
  onPlaceOrder,
  onNavigate,
}) => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("HANDI50");
  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  // Totals calculations
  const itemsTotal = cart.reduce((sum, item) => sum + item.addedPrice * item.quantity, 0);
  const deliveryFee = itemsTotal > 0 ? 45 : 0;
  // Dynamic tax calculation: 5% of items total + 2% service charge
  const taxesAndCharges = itemsTotal > 0 ? Number((itemsTotal * 0.05125).toFixed(2)) : 0;
  const discount = isCouponApplied && itemsTotal >= 400 ? 50 : 0;
  const grandTotal = Math.max(0, itemsTotal + deliveryFee + taxesAndCharges - discount);

  const handleApplyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === "HANDI50") {
      if (itemsTotal < 400) {
        setCouponError("HANDI50 requires a minimum order of ₹400");
        setIsCouponApplied(false);
      } else {
        setIsCouponApplied(true);
        setCouponError("");
      }
    } else {
      setCouponError("Invalid Coupon Code. Try 'HANDI50'.");
      setIsCouponApplied(false);
    }
  };

  const handleOrderSubmission = () => {
    if (cart.length === 0) return;
    setPlacingOrder(true);

    // Simulate order pipeline prep
    setTimeout(() => {
      const generatedOrder: Order = {
        id: "HND-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        items: [...cart],
        address: activeAddress,
        paymentMethod: selectedPaymentMethod,
        totalBeforeDiscount: itemsTotal,
        discount: discount,
        taxes: taxesAndCharges,
        deliveryFee: deliveryFee,
        finalPaid: parseFloat(grandTotal.toFixed(2)),
        status: "Placed",
      };
      setPlacingOrder(false);
      onPlaceOrder(generatedOrder);
    }, 1500);
  };

  // Switch preset address
  const handleToggleAddress = () => {
    const currentIndex = PRESET_ADDRESSES.findIndex((addr) => addr.label === activeAddress.label);
    const nextIndex = (currentIndex + 1) % PRESET_ADDRESSES.length;
    onChangeAddress(PRESET_ADDRESSES[nextIndex]);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16 max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto text-primary shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div>
          <h2 className="font-headline-md text-on-surface">Your Cart is Empty</h2>
          <p className="font-body-md text-on-surface-variant mt-2">
            Add some authentic, simmering stove hot Handi culinary items to get started!
          </p>
        </div>
        <button
          onClick={() => onNavigate(NavigationScreen.MENU)}
          className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-lg hover:bg-primary-container transition-all cursor-pointer shadow-sm"
        >
          Explore Restaurant Menu
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto pt-4 pb-12 flex flex-col md:flex-row gap-6 lg:gap-12 relative">
      {/* Left Column: Details forms */}
      <div className="flex-grow flex flex-col gap-6 w-full md:w-2/3">
        {/* Delivery Address Section */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-[0_4px_12px_rgba(108,27,24,0.02)] border border-surface-container-highest">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-title-lg text-on-surface flex items-center gap-2">
              <MapPin className="text-primary w-5 h-5 shrink-0" />
              <span>Delivery Address</span>
            </h2>
            <button
              onClick={handleToggleAddress}
              className="font-label-lg text-primary font-bold hover:text-primary-container transition-colors cursor-pointer"
            >
              Change
            </button>
          </div>

          <div
            onClick={handleToggleAddress}
            className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low border border-surface-container-highest cursor-pointer hover:border-outline-variant transition-all hover:shadow-sm group"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary/5">
              <span className="font-bold text-xs uppercase text-primary-container font-display">
                {activeAddress.label}
              </span>
            </div>
            <div>
              <p className="font-label-lg text-on-surface mb-1 font-bold group-hover:text-primary transition-colors">
                {activeAddress.label} Profile
              </p>
              <p className="font-body-md text-on-surface-variant">{activeAddress.address}</p>
              <p className="font-label-sm text-on-surface-variant font-medium mt-1">
                Estimated Delivery in <span className="text-primary font-semibold">{activeAddress.timeEstimation}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Your Order Summary section */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-[0_4px_12px_rgba(108,27,24,0.02)] border border-surface-container-highest">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-title-lg text-on-surface flex items-center gap-2">
              <ShoppingBag className="text-primary w-5 h-5 shrink-0" />
              <span>Your Order</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize || ""}`}
                className="flex justify-between items-start md:items-center p-2 border-b border-surface-container-highest pb-4 gap-4"
              >
                <div className="flex gap-4 items-start md:items-center">
                  {/* Indicator badging */}
                  {item.dish.isVeg ? (
                    <div className="w-4 h-4 border border-tertiary rounded flex items-center justify-center p-0.5 mt-1 md:mt-0 bg-surface shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 border border-primary rounded flex items-center justify-center bg-surface shrink-0 mt-1 md:mt-0">
                      <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-primary mt-[2px]"></div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-label-lg text-on-surface font-semibold text-sm md:text-base leading-tight">
                      {item.dish.name}
                      {item.selectedSize && (
                        <span className="ml-1 text-xs text-primary font-bold bg-primary-container/10 px-1.5 py-0.5 rounded">
                          {item.selectedSize}
                        </span>
                      )}
                    </h3>
                    {item.selectedAccompaniments && item.selectedAccompaniments.length > 0 ? (
                      <p className="font-label-sm text-on-surface-variant mt-1 text-xs">
                        {item.selectedAccompaniments.join(" + ")}
                      </p>
                    ) : (
                      <p className="font-label-sm text-on-surface-variant mt-0.5 text-xs">
                        {item.dish.sizes ? "Premium Individual Cut" : "Serves 1-2 • Hand-cooked Clay Pot"}
                      </p>
                    )}
                    <p className="font-label-lg text-on-surface font-bold mt-1 text-xs md:text-sm">
                      ₹{item.addedPrice} <span className="font-normal text-on-surface-variant text-xs">x {item.quantity}</span>
                    </p>
                  </div>
                </div>

                {/* Quantitative adjusted stepper */}
                <div className="flex items-center bg-surface-container-low rounded-full px-2 py-1 shadow-inner border border-surface-container-highest shrink-0 scale-90 md:scale-100">
                  <button
                    onClick={() => onUpdateCartQuantity(item.id, -1, item.selectedSize)}
                    className="w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-label-lg text-on-surface font-bold px-3 select-none">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateCartQuantity(item.id, 1, item.selectedSize)}
                    className="w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => onNavigate(NavigationScreen.MENU)}
              className="flex items-center gap-1.5 text-primary hover:text-primary-container font-label-lg font-bold p-2 hover:bg-surface-container-low rounded-xl transition-all w-fit cursor-pointer text-xs md:text-sm mt-1"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add more items to this order</span>
            </button>
          </div>
        </section>

        {/* Payment Methods selector segment */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-[0_4px_12px_rgba(108,27,24,0.02)] border border-surface-container-highest">
          <h2 className="font-title-lg text-on-surface mb-4 flex items-center gap-2">
            <CreditCard className="text-primary w-5 h-5 shrink-0" />
            <span>Payment Method</span>
          </h2>

          <div className="flex flex-col gap-3">
            {/* UPI selection */}
            <label
              onClick={() => setPaymentMethod("UPI")}
              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPaymentMethod === "UPI"
                  ? "border-primary bg-primary/5"
                  : "border-surface-container-highest hover:bg-surface-container-low"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-label-lg text-on-surface font-bold">UPI</p>
                  <p className="font-label-sm text-on-surface-variant text-xs">Google Pay, PhonePe, Paytm</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedPaymentMethod === "UPI" ? "border-primary" : "border-outline-variant"
                }`}
              >
                {selectedPaymentMethod === "UPI" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
            </label>

            {/* Credit Option */}
            <label
              onClick={() => setPaymentMethod("Credit")}
              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPaymentMethod === "Credit"
                  ? "border-primary bg-primary/5"
                  : "border-surface-container-highest hover:bg-surface-container-low"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0 shadow-sm">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-label-lg text-on-surface font-bold">Credit / Debit Card</p>
                  <p className="font-label-sm text-on-surface-variant text-xs">Visa, MasterCard, RuPay</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedPaymentMethod === "Credit" ? "border-primary" : "border-outline-variant"
                }`}
              >
                {selectedPaymentMethod === "Credit" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
            </label>

            {/* Cash on Delivery */}
            <label
              onClick={() => setPaymentMethod("Cash")}
              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPaymentMethod === "Cash"
                  ? "border-primary bg-primary/5"
                  : "border-surface-container-highest hover:bg-surface-container-low"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0 shadow-sm">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-label-lg text-on-surface font-bold">Cash on Delivery</p>
                  <p className="font-label-sm text-on-surface-variant text-xs">Please keep exact change handy</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedPaymentMethod === "Cash" ? "border-primary" : "border-outline-variant"
                }`}
              >
                {selectedPaymentMethod === "Cash" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
            </label>
          </div>
        </section>
      </div>

      {/* Right Column: Order Pricing calculations (Matches exact screenshots) */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-[0_8px_24px_rgba(108,27,24,0.05)] border border-surface-container-highest md:sticky md:top-24">
          <h2 className="font-title-lg text-on-surface mb-4">Bill Details</h2>

          <div className="flex flex-col gap-3 font-body-md text-on-surface-variant mb-4 border-b border-surface-container-highest pb-4">
            <div className="flex justify-between items-center">
              <span>Item Total</span>
              <span className="font-medium text-on-surface">₹{itemsTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delivery Fee (2.5 km)</span>
              <span className="font-medium text-on-surface">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Taxes & Charges</span>
              <span className="font-medium text-on-surface">₹{taxesAndCharges}</span>
            </div>

            {/* Promos/Coupons box overlay widget (Matches HANDI50 green badge) */}
            <div className="mt-2 space-y-2">
              {isCouponApplied ? (
                <div className="flex items-center justify-between bg-tertiary/5 p-3 rounded-xl border border-tertiary/20">
                  <div className="flex items-center gap-2 text-tertiary">
                    <Ticket className="w-4 h-4 fill-tertiary text-tertiary shrink-0" />
                    <span className="font-label-sm font-bold uppercase">{couponCode} Applied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-tertiary font-bold">-₹{discount}</span>
                    <button
                      onClick={() => setIsCouponApplied(false)}
                      className="text-[10px] text-primary hover:underline uppercase shrink-0 font-bold ml-1 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-low p-2 rounded-xl flex items-center justify-between border border-surface-container-highest">
                  <input
                    placeholder="Enter Coupon (HANDI50)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="bg-transparent text-xs py-1 px-2 border-none outline-none font-label-lg w-full placeholder:text-on-surface-variant/50 focus:ring-0"
                  />
                  <button
                    onClick={() => {
                      if (couponInput) {
                        setCouponCode(couponInput.toUpperCase());
                        handleApplyCoupon(couponInput);
                      } else {
                        setCouponCode("HANDI50");
                        handleApplyCoupon("HANDI50");
                      }
                    }}
                    className="bg-primary text-on-primary text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-primary-container shrink-0 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}

              {couponError && <p className="text-xs text-error font-semibold select-none">{couponError}</p>}
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="font-title-lg text-on-surface font-bold text-lg">To Pay</span>
            <span className="font-title-lg text-primary font-bold text-xl md:text-2xl">
              ₹{grandTotal.toFixed(2)}
            </span>
          </div>

          {/* Place Order CTA handler button */}
          <button
            onClick={handleOrderSubmission}
            disabled={placingOrder}
            className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg font-bold py-4 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-80"
          >
            {placingOrder ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Simulating Pay Corridor...</span>
              </>
            ) : (
              <>
                <span>Place Order</span>
                <ArrowRight className="w-5 h-5 stroke-[2px]" />
              </>
            )}
          </button>

          <p className="font-label-sm text-center text-on-surface-variant mt-4 opacity-80 leading-relaxed text-xs">
            By placing this order, you agree to our Terms & Conditions and refund policies.
          </p>
        </div>
      </div>
    </div>
  );
};
