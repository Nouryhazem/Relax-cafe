import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { UtilityDrawer } from './components/navigation/UtilityDrawer';
import { LevelSevenExperience } from './components/home/LevelSevenExperience';
import { MenuExperience } from './components/menu/MenuExperience';
import { FindYourPauseExperience } from './components/recommendations/FindYourPauseExperience';
import { SplitExperience } from './components/split/SplitExperience';
import { Footer } from './components/navigation/Footer';
import { PageTransition } from './components/motion/PageTransition';
import { ElevatorScrollIndicator } from './components/motion/ElevatorScrollIndicator';
import { AmbientScrollCanvas } from './components/motion/AmbientScrollCanvas';

const AppContent: React.FC = () => {
  const { section, toastMessage } = useApp();
  const isMenu = section === 'menu';

  return (
    <div
      className={`min-h-screen ${
        isMenu ? 'bg-[#FAF7F2] text-[#1B0F0A]' : 'bg-[#1B0F0A] text-[#F3E9DA]'
      } flex flex-col font-messiri antialiased transition-colors duration-500 selection:bg-[#B8924E]/30 selection:text-[#1B0F0A]`}
    >
      {/* Website-Wide Ambient Scroll Motion Canvas */}
      <AmbientScrollCanvas />

      {/* Hairline Scroll Progress & Elevator Gauge */}
      <ElevatorScrollIndicator />

      {/* Global Top & Mobile Bottom Navigation */}
      <Navbar />

      {/* Main Experience View with Transition */}
      <main className="flex-1 flex flex-col">
        <PageTransition>
          {section === 'seven' && <LevelSevenExperience />}
          {section === 'menu' && <MenuExperience />}
          {section === 'find' && <FindYourPauseExperience />}
          {section === 'split' && <SplitExperience />}
        </PageTransition>
      </main>

      {/* Footer */}
      <Footer />

      {/* Compact Utility Drawer */}
      <UtilityDrawer />

      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-live="polite"
          className="fixed bottom-20 md:bottom-8 start-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#3B1F14] border border-[#B8924E]/60 text-xs sm:text-sm text-[#F3E9DA] shadow-2xl flex items-center gap-2 animate-fade-in pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8924E]" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
