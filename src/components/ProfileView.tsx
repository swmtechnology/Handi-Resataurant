/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { User, Mail, ShieldAlert, Award, Compass, Heart, Share2 } from "lucide-react";
import { NavigationScreen } from "../types";

interface ProfileViewProps {
  userEmail: string;
  onNavigate: (screen: NavigationScreen) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userEmail,
  onNavigate,
}) => {
  return (
    <div className="max-w-xl mx-auto space-y-6 pt-4 pb-12">
      {/* Top Profile Card */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-highest shadow-sm relative overflow-hidden flex flex-col items-center text-center space-y-4">
        {/* Decorative organic background circle */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full" />

        {/* Big Avatar */}
        <div className="w-24 h-24 rounded-full bg-surface-container-high overflow-hidden border-4 border-surface shadow-md relative group">
          <img
            alt="User Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5hTMqx5c-Q6QMxhhCoNWsKXawTdg9oqVyv6-tD9G37WjIcYLLTv5-XYZlo-HHP4LFJP9_gbZ8zgSxG6Cz8pm9_VXS6C4ycYNETjCbzm-U2SAmLdPGr2reyRvhPNv8q_3CqRnLUoOJNCsTlAduvVP0bjOsFz9zQ09DB65hQXyLaIIiPnQBjXqGirdnIuD3ZWTicTVkZ42zd7SoaLdaivs5MHn-ERO6TTPwEG8rFqpyqBOIFTs64unFobyX3jNKbv-PWOYmkAHp4V0"
          />
        </div>

        <div className="space-y-1">
          <h2 className="font-title-lg text-on-surface font-bold">Patron Member</h2>
          <div className="flex items-center justify-center gap-1.5 text-on-surface-variant font-body-md text-sm">
            <Mail className="w-4 h-4" />
            <span>{userEmail || "sawaimadhopur.help@gmail.com"}</span>
          </div>
        </div>

        {/* Member tags */}
        <div className="flex justify-center gap-2 pt-1 border-t border-surface-container-high w-full">
          <div className="text-center px-4 py-2 bg-surface-container-low rounded-xl flex-1">
            <span className="block font-headline-md text-primary font-bold">HND-Club</span>
            <span className="font-label-sm text-[10px] uppercase text-on-surface-variant">Membership Tier</span>
          </div>
          <div className="text-center px-4 py-2 bg-surface-container-low rounded-xl flex-1">
            <span className="block font-headline-md text-secondary font-bold">500</span>
            <span className="font-label-sm text-[10px] uppercase text-on-surface-variant">Handi Points</span>
          </div>
        </div>
      </section>

      {/* Account Settings List */}
      <section className="bg-surface-container-lowest rounded-2xl border border-surface-container-highest shadow-sm divide-y divide-surface-container-high overflow-hidden">
        <div
          onClick={() => onNavigate(NavigationScreen.HOME)}
          className="p-4 flex items-center gap-4 cursor-pointer hover:bg-surface-container-low transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <h3 className="font-label-lg text-on-surface">Explore Recommendations</h3>
            <p className="font-body-md text-xs text-on-surface-variant">Recommended dishes based on your authentic choices</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate(NavigationScreen.MENU)}
          className="p-4 flex items-center gap-4 cursor-pointer hover:bg-surface-container-low transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
            <Heart className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <h3 className="font-label-lg text-on-surface">My Favorites</h3>
            <p className="font-body-md text-xs text-on-surface-variant">Dishes you've liked and ordered frequently</p>
          </div>
        </div>

        <div className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <h3 className="font-label-lg text-on-surface">Tier Advantages &amp; Badges</h3>
            <p className="font-body-md text-xs text-on-surface-variant">Learn more about points and club advantages</p>
          </div>
        </div>

        <div className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-error-container/25 flex items-center justify-center text-error">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <h3 className="font-label-lg text-on-surface">Privacy &amp; Safety Info</h3>
            <p className="font-body-md text-xs text-on-surface-variant">Manage your connection, address, and email options</p>
          </div>
        </div>
      </section>

      {/* Aesthetic branding footer */}
      <p className="text-center font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant/40 pt-2">
        Modern Heritage Kitchen Applet • Version 1.0.4.ai
      </p>
    </div>
  );
};
