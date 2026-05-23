/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { ClipboardList, Clock, Sparkles, CheckCircle2, Truck, Star } from "lucide-react";
import { Order } from "../types";

interface OrdersViewProps {
  orders: Order[];
  onReviewRating: (orderId: string, rating: number) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onReviewRating }) => {
  // Simple order status step mappings for UI timeline
  const statuses = ["Placed", "Preparing", "Out for Delivery", "Delivered"];

  // Simulated status update loop to make the trial experience highly engaging!
  const [liveOrders, setLiveOrders] = useState<Order[]>(orders);

  useEffect(() => {
    setLiveOrders(orders);
  }, [orders]);

  // Simulate progress when they have an active pending order
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "Delivered") return order;

          const currentIndex = statuses.indexOf(order.status);
          const nextStatus = statuses[currentIndex + 1];

          if (nextStatus) {
            return {
              ...order,
              status: nextStatus as any,
            };
          }
          return order;
        })
      );
    }, 15000); // Progress steps every 15s

    return () => clearInterval(timer);
  }, [liveOrders]);

  if (liveOrders.length === 0) {
    return (
      <div className="text-center py-16 max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto text-primary shadow-inner">
          <ClipboardList className="w-10 h-10" />
        </div>
        <div>
          <h2 className="font-headline-md text-on-surface">No Orders Placed Yet</h2>
          <p className="font-body-md text-on-surface-variant mt-2">
            You haven't ordered any steaming clay-pot Handi delicacies yet. Once you place an order, it will appear here for you to track real-time!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 pt-4">
      {liveOrders.map((order) => {
        const isCompleted = order.status === "Delivered";

        return (
          <div
            key={order.id}
            className="bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-sm border border-surface-container-highest space-y-6 hover:shadow-md transition-all duration-300"
          >
            {/* ID & Date panel */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-surface-container-highest pb-4 gap-2">
              <div>
                <span className="font-label-sm text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
                  ID: {order.id}
                </span>
                <span className="font-body-md text-on-surface-variant text-xs block sm:inline sm:ml-3">
                  Placed on: {order.date}
                </span>
              </div>
              <div className="font-label-lg text-primary font-bold">
                Total Paid: ₹{order.finalPaid}
              </div>
            </div>

            {/* Stepper tracking Timeline */}
            <div className="py-2">
              <h3 className="font-label-lg text-on-surface mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Order Status: <span className="text-primary font-bold uppercase text-xs">{order.status}</span></span>
              </h3>

              {/* Graphical visual stepper */}
              <div className="relative flex justify-between items-center w-full pt-2">
                {/* Horizontal progress bar */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-surface-container-highest z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-1000"
                  style={{
                    width: `${
                      (statuses.indexOf(order.status) / (statuses.length - 1)) * 100
                    }%`,
                  }}
                />

                {statuses.map((step, idx) => {
                  const stepIndex = statuses.indexOf(order.status);
                  const isDone = idx <= stepIndex;
                  const isCurrent = idx === stepIndex;

                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isDone
                            ? "bg-primary border-primary text-white"
                            : "bg-surface-container-lowest border-surface-container-highest text-on-surface-variant"
                        } ${isCurrent ? "scale-110 shadow-md shadow-primary/20 ring-4 ring-primary/10" : ""}`}
                      >
                        {idx === 0 && <CheckCircle2 className="w-4.5 h-4.5" />}
                        {idx === 1 && <Sparkles className="w-4.5 h-4.5" />}
                        {idx === 2 && <Truck className="w-4.5 h-4.5" />}
                        {idx === 3 && <CheckCircle2 className="w-4.5 h-4.5" />}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-label-sm mt-2 font-semibold text-center leading-tight ${
                          isDone ? "text-primary font-bold" : "text-on-surface-variant"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dishes segment list */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest space-y-3">
              <h4 className="font-label-lg text-on-surface">Dishes Summary</h4>
              <div className="flex flex-col gap-2.5">
                {order.items.map((item, id) => (
                  <div key={id} className="flex justify-between items-center text-sm">
                    <span className="font-body-md text-on-surface">
                      {item.dish.name}
                      {item.selectedSize && ` (${item.selectedSize})`}
                      <span className="text-on-surface-variant font-medium ml-1.5 opacity-80">
                        x{item.quantity}
                      </span>
                    </span>
                    <span className="font-label-lg text-on-surface">
                      ₹{item.addedPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery address footer */}
            <div className="text-xs text-on-surface-variant flex items-center gap-1.5 justify-between flex-wrap">
              <span>
                Delivering to: <span className="font-bold text-on-surface">{order.address.label}</span> ({order.address.address.slice(0, 48)}...)
              </span>
              {isCompleted && (
                <div className="flex items-center gap-1 bg-tertiary/10 text-tertiary px-2.5 py-1 rounded-lg font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Delivered - Enjoy your Handi feast!</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
