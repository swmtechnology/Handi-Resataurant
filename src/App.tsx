/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { HomeView } from "./components/HomeView";
import { MenuView } from "./components/MenuView";
import { DetailView } from "./components/DetailView";
import { CheckoutView } from "./components/CheckoutView";
import { OrdersView } from "./components/OrdersView";
import { ProfileView } from "./components/ProfileView";
import { NavigationScreen, CartItem, Order, DeliveryAddress, Dish } from "./types";
import { DISHES, PRESET_ADDRESSES } from "./data";
import { ShoppingBag, CheckCircle, ArrowRight, X, ChefHat } from "lucide-react";

export default function App() {
  // Navigation stack state for rich back history tracing
  const [navHistory, setNavHistory] = useState<NavigationScreen[]>([NavigationScreen.HOME]);
  const currentScreen = navHistory[navHistory.length - 1] || NavigationScreen.HOME;

  // Search and categories filter states (synchronized globally for easy crossview navigation)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);

  // Focus view entities
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [activeAddress, setActiveAddress] = useState<DeliveryAddress>(PRESET_ADDRESSES[0]);
  const [selectedPaymentMethod, setPaymentMethod] = useState<"UPI" | "Credit" | "Cash">("UPI");

  // State of liked item ids
  const [likedDishIds, setLikedDishIds] = useState<Record<string, boolean>>({
    "biryani-1": true,
  });

  // Celeb popup flags for order placements
  const [showPlacedSplash, setShowPlacedSplash] = useState(false);
  const [latestPlacedOrderId, setLatestPlacedOrderId] = useState("");

  // Seed default items in cart to match exact user screens/screenshots out of the box!
  // Paneer Tikka Masala Handi (serves 2, rich tomato gravy, ₹450 x 1)
  // Mutton Dum Biryani (serves 1, extra raita, ₹580 x 2)
  // Sum = 1160 + 450 = 1610.
  const [cart, setCart] = useState<CartItem[]>(() => {
    const paneerDish = DISHES.find((d) => d.id === "chicken-tikka") || DISHES[2]; // fallback to paneer khas
    const muttonDish = DISHES.find((d) => d.id === "mutton-dum-biryani") || DISHES[5];

    return [
      {
        id: "paneer-masala-initial",
        dish: {
          ...paneerDish,
          name: "Paneer Tikka Masala Handi",
          price: 450,
          isVeg: true,
        },
        quantity: 1,
        addedPrice: 450,
        selectedAccompaniments: ["Serves 2 • Rich Tomato Gravy"],
      },
      {
        id: "mutton-biryani-initial",
        dish: {
          ...muttonDish,
          name: "Mutton Dum Biryani",
          price: 580,
          isVeg: false,
        },
        quantity: 2,
        addedPrice: 580,
        selectedAccompaniments: ["Serves 1 • Extra Raita"],
      },
    ];
  });

  // Placed Order collection list
  const [orders, setOrders] = useState<Order[]>([]);

  // Navigation handlers
  const handleNavigate = (screen: NavigationScreen) => {
    // Prevent duplicate entries on stack peak
    if (currentScreen === screen) return;
    setNavHistory((prev) => [...prev, screen]);
  };

  const handleBack = () => {
    if (navHistory.length > 1) {
      setNavHistory((prev) => prev.slice(0, -1));
    } else {
      // Always fallback to Home safely
      setNavHistory([NavigationScreen.HOME]);
    }
  };

  // Immediate simple add item to cart (defaults to single count)
  const handleAddToCart = (dish: Dish) => {
    setCart((prevCart) => {
      // Match ID and ensure standard items aren't overwritten
      const existing = prevCart.find((c) => c.id === dish.id && !c.selectedSize);
      if (existing) {
        return prevCart.map((c) =>
          c.id === dish.id && !c.selectedSize ? { ...c, quantity: c.quantity + 1 } : c
        );
      }

      return [
        ...prevCart,
        {
          id: dish.id,
          dish,
          quantity: 1,
          addedPrice: dish.price,
        },
      ];
    });
  };

  // Add customized meals to cart (accompaniments & sizes)
  const handleAddToCartWithOptions = (
    dish: Dish,
    quantity: number,
    accompaniments: string[],
    totalSingleItemPrice: number
  ) => {
    setCart((prevCart) => {
      // Add as unique based on selected additions
      const isInitialPlaceholder = dish.id.includes("initial");
      const accompanimentsJoined = accompaniments.join(",");

      const existing = prevCart.find(
        (c) =>
          c.id === dish.id &&
          (c.selectedAccompaniments || []).join(",") === accompanimentsJoined
      );

      if (existing) {
        return prevCart.map((c) =>
          c.id === dish.id && (c.selectedAccompaniments || []).join(",") === accompanimentsJoined
            ? { ...c, quantity: c.quantity + quantity }
            : c
        );
      }

      return [
        ...prevCart,
        {
          id: dish.id,
          dish,
          quantity,
          addedPrice: totalSingleItemPrice,
          selectedAccompaniments: accompaniments,
        },
      ];
    });

    // Go back to previous screen (either Home or Menu)
    handleBack();
  };

  // Dynamic cart quantity adjustment triggers
  const handleUpdateCartQuantity = (dishId: string, delta: number, size?: string) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          const isMatch = item.id === dishId && item.selectedSize === size;
          if (isMatch) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Direct checkout order submit handler
  const handlePlaceOrderSubmit = (finalOrder: Order) => {
    setOrders((prev) => [finalOrder, ...prev]);
    setLatestPlacedOrderId(finalOrder.id);
    setCart([]); // Reset Cart
    setShowPlacedSplash(true); // Open celebration screen
  };

  const handleSelectDishDetails = (dish: Dish) => {
    setSelectedDish(dish);
    handleNavigate(NavigationScreen.DETAIL);
  };

  const handleLikeToggle = (dishId: string) => {
    setLikedDishIds((prev) => ({ ...prev, [dishId]: !prev[dishId] }));
  };

  // Active sub-total calculations for float summary drawer
  const cartPriceTotal = cart.reduce((sum, item) => sum + item.addedPrice * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-surface text-on-surface min-h-[100dvh] font-sans antialiased flex flex-col transition-colors duration-300">
      {/* Dynamic Shell Navigation header bar */}
      <Header
        currentScreen={currentScreen}
        location={activeAddress.address}
        onBack={handleBack}
        onNavigate={handleNavigate}
        hasBackHistory={navHistory.length > 1}
        onShare={() => {
          alert(`🔗 Sharing authentic Handi culinary link with your friends! https://handirestaurant.in/dish/${selectedDish?.id || "biryani"}`);
        }}
        isLiked={selectedDish ? !!likedDishIds[selectedDish.id] : false}
        onLikeToggle={() => {
          if (selectedDish) handleLikeToggle(selectedDish.id);
        }}
      />

      {/* Main Container Canvas */}
      <main className="flex-grow pt-20 pb-32 px-4 md:px-12 max-w-[1200px] mx-auto w-full">
        {currentScreen === NavigationScreen.HOME && (
          <HomeView
            onSelectDish={handleSelectDishDetails}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            setVegOnly={setVegOnly}
            setNonVegOnly={setNonVegOnly}
          />
        )}

        {currentScreen === NavigationScreen.MENU && (
          <MenuView
            onSelectDish={handleSelectDishDetails}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            vegOnly={vegOnly}
            setVegOnly={setVegOnly}
            nonVegOnly={nonVegOnly}
            setNonVegOnly={setNonVegOnly}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentScreen === NavigationScreen.DETAIL && selectedDish && (
          <DetailView
            dish={selectedDish}
            onAddToCartWithOptions={handleAddToCartWithOptions}
            onBack={handleBack}
          />
        )}

        {currentScreen === NavigationScreen.CHECKOUT && (
          <CheckoutView
            cart={cart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            activeAddress={activeAddress}
            onChangeAddress={setActiveAddress}
            selectedPaymentMethod={selectedPaymentMethod}
            setPaymentMethod={setPaymentMethod}
            onPlaceOrder={handlePlaceOrderSubmit}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === NavigationScreen.ORDERS && (
          <OrdersView
            orders={orders}
            onReviewRating={(id, r) => console.log(`Rated order ${id}: ${r}`)}
          />
        )}

        {currentScreen === NavigationScreen.PROFILE && (
          <ProfileView
            userEmail="sawaimadhopur.help@gmail.com"
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Dynamic Floating persistent Cart strip (Desktop bottom slider / Mobile floating footer) */}
      {cartItemCount > 0 &&
        currentScreen !== NavigationScreen.CHECKOUT &&
        currentScreen !== NavigationScreen.DETAIL && (
          <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-primary text-on-primary rounded-2xl p-4 shadow-xl z-30 ring-4 ring-primary-container/10 flex items-center justify-between transition-transform duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-on-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-on-primary" />
              </div>
              <div>
                <p className="font-label-lg font-bold">
                  {cartItemCount} item{cartItemCount > 1 && "s"} in Cart
                </p>
                <p className="font-label-sm text-xs opacity-90 text-on-primary-container">
                  Sub-total: ₹{cartPriceTotal} • Connaught Place
                </p>
              </div>
            </div>

            <button
              onClick={() => handleNavigate(NavigationScreen.CHECKOUT)}
              className="bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container px-5 py-2.5 rounded-xl font-label-lg flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98] transition-all"
            >
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </div>
        )}

      {/* Persistent Sticky Mobile navigation tab bar dock */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={cartItemCount}
      />

      {/* Celebratory custom order splash check modal */}
      {showPlacedSplash && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface-container-lowest border border-surface-container-highest max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
              <ChefHat className="w-8 h-8 animate-pulse text-primary" />
              <div className="absolute top-0 right-0 bg-tertiary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                ✓
              </div>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-headline-lg-mobile text-primary font-bold text-xl md:text-2xl">
                Order Placed Successfully!
              </h2>
              <p className="font-label-sm text-xs text-secondary font-bold">
                MEMBER TOKEN ID: {latestPlacedOrderId}
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Your hot clay pots are steaming and ready to be dispatched from our Connaught Place kitchen! We are prepping the heritage spices.
              </p>
            </div>

            <div className="pt-2 w-full flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowPlacedSplash(false);
                  handleNavigate(NavigationScreen.ORDERS);
                }}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-lg shadow-md hover:bg-primary-container cursor-pointer transition-all"
              >
                Track Live Order Progress
              </button>
              <button
                onClick={() => {
                  setShowPlacedSplash(false);
                  handleNavigate(NavigationScreen.HOME);
                }}
                className="w-full border border-outline-variant bg-surface-container-lowest text-on-surface py-3 rounded-xl font-label-lg hover:bg-surface-container-low cursor-pointer transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
