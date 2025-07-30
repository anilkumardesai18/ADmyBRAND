"use client";

import { useState } from "react";
import { EnhancedDashboardLayout } from "./EnhancedDashboardLayout";
import { HamburgerDashboardLayout } from "./HamburgerDashboardLayout";

interface LayoutSwitcherProps {
  children: React.ReactNode;
}

export function LayoutSwitcher({ children }: LayoutSwitcherProps) {
  const [useHamburger, setUseHamburger] = useState(true);

  // Layout toggle button (for development/testing)
  const LayoutToggle = () => (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setUseHamburger(!useHamburger)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Switch to {useHamburger ? 'Collapse' : 'Hamburger'} Layout
      </button>
    </div>
  );

  if (useHamburger) {
    return (
      <>
        <HamburgerDashboardLayout>{children}</HamburgerDashboardLayout>
        <LayoutToggle />
      </>
    );
  }

  return (
    <>
      <EnhancedDashboardLayout>{children}</EnhancedDashboardLayout>
      <LayoutToggle />
    </>
  );
}