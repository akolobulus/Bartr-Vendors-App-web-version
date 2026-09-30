import React, { useEffect } from 'react';
import { useBartr } from './context/BartrContext';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { JobOffersScreen } from './screens/JobOffersScreen';
import { RequestDetailScreen } from './screens/RequestDetailScreen';
import { ActiveJobScreen } from './screens/ActiveJobScreen';
import { ChatScreen } from './screens/ChatScreen';
import { RatingScreen } from './screens/RatingScreen';
import { EarningsScreen } from './screens/EarningsScreen';
import { MyJobsScreen } from './screens/MyJobsScreen';
import {
  GetHelpScreen,
  FaqJobsScreen,
  FaqPayoutsScreen,
} from './screens/GetHelpAndFaqScreens';
import { AboutScreen } from './screens/AboutScreen';
import { ProfileScreen, EditProfileScreen } from './screens/ProfileScreens';

export const AppContent: React.FC = () => {
  const { currentScreen, resetToHome, alertMessage, clearAlert, goBack, screenStack, isDrawerOpen, setDrawerOpen } =
    useBartr();

  // Keyboard navigation support: Esc key acts like Android Back button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (alertMessage) {
          clearAlert();
        } else if (isDrawerOpen) {
          setDrawerOpen(false);
        } else if (screenStack.length > 1) {
          goBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [alertMessage, isDrawerOpen, screenStack, goBack, clearAlert, setDrawerOpen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH':
        return <SplashScreen onDismiss={resetToHome} />;
      case 'HOME':
        return <HomeScreen />;
      case 'JOB_OFFERS':
        return <JobOffersScreen />;
      case 'REQUEST_DETAIL':
        return <RequestDetailScreen />;
      case 'ACTIVE_JOB':
        return <ActiveJobScreen />;
      case 'CHAT':
        return <ChatScreen />;
      case 'RATING':
        return <RatingScreen />;
      case 'EARNINGS':
        return <EarningsScreen />;
      case 'MY_JOBS':
        return <MyJobsScreen />;
      case 'GET_HELP':
        return <GetHelpScreen />;
      case 'FAQ_JOBS':
        return <FaqJobsScreen />;
      case 'FAQ_PAYOUTS':
        return <FaqPayoutsScreen />;
      case 'ABOUT':
        return <AboutScreen />;
      case 'PROFILE':
        return <ProfileScreen />;
      case 'EDIT_PROFILE':
        return <EditProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#F5F6FA] flex items-center justify-center sm:p-4">
      {/* Mobile App Container matching typical smartphone viewport ratio */}
      <main className="relative w-full h-[100dvh] sm:h-[844px] sm:max-w-[400px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col border sm:border-slate-200">
        {/* Screen Content */}
        <div className="w-full h-full relative overflow-hidden flex flex-col">
          {renderScreen()}
        </div>

        {/* Global Notice Alert Dialog */}
        {alertMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0A2E65]/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-xs bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-bold text-[#0A2E65] mb-2">Notice</h3>
              <p className="text-sm text-[#0A2E65]/90 leading-relaxed mb-6">
                {alertMessage}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={clearAlert}
                  className="px-5 py-2 rounded-xl text-sm font-bold text-[#0067F5] hover:bg-blue-50 active:scale-95 transition cursor-pointer"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
