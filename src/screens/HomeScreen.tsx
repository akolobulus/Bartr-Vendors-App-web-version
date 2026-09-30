import React from 'react';
import {
  Menu,
  Eye,
  EyeOff,
  Briefcase,
  ChevronRight,
  Wallet,
  Clock,
  HelpCircle,
  Info,
  Wrench,
  X,
} from 'lucide-react';
import { useBartr } from '../context/BartrContext';
import { BartrMapCanvas } from '../components/BartrMapCanvas';

export const HomeScreen: React.FC = () => {
  const {
    incomingRequests,
    todayEarnings,
    todayJobs,
    balanceHidden,
    isDrawerOpen,
    vendorProfile,
    toggleBalanceVisibility,
    setDrawerOpen,
    navigateTo,
    openRequestDetail,
    showAlert,
  } = useBartr();

  const openOffersCount = incomingRequests.filter((o) => !o.isTaken).length;
  const offersLabel =
    openOffersCount === 0
      ? 'No job offers right now'
      : `${openOffersCount} new job offer${openOffersCount === 1 ? '' : 's'}`;

  const displayTodayAmount = balanceHidden ? '₦••••' : `₦${todayEarnings.toLocaleString()}`;

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-hidden">
      {/* 1. Map container (top ~42% of viewport) */}
      <div className="relative w-full h-[42%] min-h-[220px]">
        <BartrMapCanvas
          requests={incomingRequests}
          onPinClick={(id) => openRequestDetail(id)}
        />

        {/* Floating Menu Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          data-testid="menu_button"
          className="absolute top-4 left-5 z-20 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-[#0A2E65] hover:bg-slate-50 active:scale-95 transition"
          title="Open Menu"
        >
          <Menu className="w-5 h-5 text-[#0A2E65]" />
        </button>
      </div>

      {/* 2. Sheet Card (bottom ~58% of viewport) */}
      <div className="flex-1 w-full bg-white rounded-t-[26px] shadow-2xl z-10 -mt-4 flex flex-col p-5 overflow-y-auto">
        {/* Drag handle pill */}
        <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-4" />

        {/* Today earnings mini bar */}
        <div className="w-full bg-[#ECFBEC] rounded-2xl px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#0A2E65]">
            Today · {displayTodayAmount} · {todayJobs} jobs
          </span>
          <button
            onClick={toggleBalanceVisibility}
            className="p-1 text-[#5B6472] hover:text-[#0A2E65] transition"
            title="Toggle balance visibility"
          >
            {balanceHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-5">
          <p className="text-[12px] font-bold tracking-wider text-[#5B6472] uppercase">
            Job offers
          </p>

          {/* Offers Teaser Banner Card */}
          <div
            onClick={() => navigateTo('JOB_OFFERS')}
            data-testid="offers_teaser"
            className="mt-2.5 w-full bg-[#E1F6FF] rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover:bg-[#d6f0fc] active:scale-[0.99] transition shadow-xs"
          >
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
              <Briefcase className="w-5 h-5 text-[#0067F5]" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-bold text-[#0A2E65] truncate">
                {offersLabel}
              </h3>
              <p className="text-xs text-[#5B6472] mt-0.5 truncate">
                Tap to view and filter by category
              </p>
            </div>

            <ChevronRight className="w-4 h-4 text-[#5B6472] shrink-0" />
          </div>
        </div>

        {/* Quick Tips or Info */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#5B6472]">
          <span>Service radius: <strong className="text-[#0A2E65]">3.0 km</strong> around Ikeja</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-[#2F9E63]">
            <span className="w-2 h-2 rounded-full bg-[#2F9E63] animate-pulse"></span>
            Accepting requests
          </span>
        </div>
      </div>

      {/* Side Navigation Drawer Overlay */}
      {isDrawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-[#0A2E65]/40 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Side Navigation Drawer Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-white rounded-r-3xl shadow-2xl transform transition-transform duration-300 ease-out flex flex-col p-5 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6472]">Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Header Item */}
        <div
          onClick={() => {
            setDrawerOpen(false);
            navigateTo('PROFILE');
          }}
          className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 cursor-pointer transition"
        >
          <div className="w-13 h-13 rounded-2xl bg-[#E1F6FF] flex items-center justify-center shrink-0">
            <Wrench className="w-6 h-6 text-[#0067F5]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-bold text-[#0A2E65] truncate">
              {vendorProfile.businessName}
            </h4>
            <p className="text-xs font-semibold text-[#0067F5] mt-0.5">
              ★★★★★ {vendorProfile.rating} · Phone Repair
            </p>
          </div>
        </div>

        <div className="my-3 border-b border-slate-100" />

        {/* Menu list */}
        <div className="flex-1 space-y-1">
          <button
            onClick={() => {
              setDrawerOpen(false);
              navigateTo('EARNINGS');
            }}
            className="w-full flex items-center gap-4 py-3.5 px-3 rounded-xl hover:bg-slate-50 text-left text-[15px] font-medium text-[#0A2E65] transition"
          >
            <Wallet className="w-5 h-5 text-[#0A2E65]" />
            <span>Earnings</span>
          </button>

          <button
            onClick={() => {
              setDrawerOpen(false);
              navigateTo('MY_JOBS');
            }}
            className="w-full flex items-center gap-4 py-3.5 px-3 rounded-xl hover:bg-slate-50 text-left text-[15px] font-medium text-[#0A2E65] transition"
          >
            <Clock className="w-5 h-5 text-[#0A2E65]" />
            <span>My jobs</span>
          </button>

          <button
            onClick={() => {
              setDrawerOpen(false);
              navigateTo('GET_HELP');
            }}
            className="w-full flex items-center gap-4 py-3.5 px-3 rounded-xl hover:bg-slate-50 text-left text-[15px] font-medium text-[#0A2E65] transition"
          >
            <HelpCircle className="w-5 h-5 text-[#0A2E65]" />
            <span>Get help</span>
          </button>

          <button
            onClick={() => {
              setDrawerOpen(false);
              navigateTo('ABOUT');
            }}
            className="w-full flex items-center gap-4 py-3.5 px-3 rounded-xl hover:bg-slate-50 text-left text-[15px] font-medium text-[#0A2E65] transition"
          >
            <Info className="w-5 h-5 text-[#0A2E65]" />
            <span>About</span>
          </button>
        </div>

        {/* Switch to customer mode CTA */}
        <div
          onClick={() => showAlert('Switching to the customer app is coming soon!')}
          data-testid="switch_mode_cta"
          className="w-full bg-[#0067F5] rounded-2xl p-4.5 text-white cursor-pointer hover:bg-blue-600 active:scale-[0.98] transition mt-auto"
        >
          <h5 className="text-[15px] font-bold">Switch to customer mode</h5>
          <p className="text-xs text-white/85 mt-0.5">Post a request of your own</p>
        </div>
      </div>
    </div>
  );
};
