import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useBartr } from '../context/BartrContext';

export const RequestDetailScreen: React.FC = () => {
  const {
    activeRequest,
    countdownSeconds,
    isRequestTakenBannerVisible,
    declineRequest,
    acceptRequest,
    goBack,
  } = useBartr();

  if (!activeRequest) return null;

  const isTaken = activeRequest.isTaken || isRequestTakenBannerVisible;
  const minutes = Math.floor(countdownSeconds / 60);
  const seconds = countdownSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = Math.min(Math.max((countdownSeconds / 600) * 100, 0), 100);

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Topbar */}
      <div className="px-4 py-2.5 flex items-center gap-3.5 border-b border-slate-100">
        <button
          onClick={declineRequest}
          data-testid="back_button"
          className="w-9 h-9 rounded-full bg-[#F5F6FA] flex items-center justify-center text-[#0A2E65] hover:bg-slate-200 active:scale-95 transition"
          title="Back"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-[#0A2E65]" />
        </button>
        <h2 className="text-lg font-bold text-[#0A2E65]">Job offer</h2>
      </div>

      {/* Body scroll area */}
      <div className="flex-1 px-5 py-4 overflow-y-auto space-y-4">
        {/* Countdown timer / Taken banner */}
        {!isTaken ? (
          <div className="w-full pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-medium text-[#5B6472]">
                Respond before it goes to someone else
              </span>
              <span className="text-sm font-bold text-[#E5484D] tabular-nums">
                {timeFormatted}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F6FA] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#0067F5] rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#FFF0F4] rounded-2xl p-3.5 flex items-center gap-3 text-[#0A2E65]">
            <AlertTriangle className="w-5 h-5 text-[#E5484D] shrink-0" />
            <span className="text-sm">
              This job has already been taken by another vendor.
            </span>
          </div>
        )}

        {/* Customer request description bubble */}
        <div className="w-full bg-[#F5F6FA] rounded-2xl rounded-bl-xs p-4 shadow-xs">
          <p className="text-[15px] text-[#0A2E65] leading-relaxed italic">
            &ldquo;{activeRequest.text}&rdquo;
          </p>
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="px-3.5 py-1.5 rounded-full bg-[#E1F6FF] text-xs font-bold text-[#0A2E65]">
            {activeRequest.category}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#FFFFEE] text-xs font-bold text-[#8A7A00]">
            {activeRequest.urgency}
          </span>
        </div>

        {/* Customer mini card */}
        <div className="w-full bg-[#F5F6FA] rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E1F6FF] flex items-center justify-center font-bold text-base text-[#0067F5] shrink-0">
            {activeRequest.custInitial}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[15px] font-bold text-[#0A2E65] truncate">
              {activeRequest.customer}
            </h4>
            <p className="text-xs text-[#5B6472] mt-0.5 truncate">
              {activeRequest.custMeta}
            </p>
          </div>
          <span className="text-xs font-semibold text-[#5B6472] shrink-0">
            {activeRequest.distance}
          </span>
        </div>

        {/* Offered Price Card */}
        <div className="w-full bg-[#ECFBEC] rounded-2xl p-4.5">
          <span className="text-xs font-semibold text-[#2F7A52] block">
            Offered price
          </span>
          <span className="text-2xl font-bold text-[#0A2E65] mt-1 block">
            {activeRequest.price}
          </span>
        </div>

        <div className="pt-2 text-xs text-[#5B6472]">
          Address: <strong className="text-[#0A2E65]">{activeRequest.address}</strong>
        </div>
      </div>

      {/* Bottom fixed action buttons */}
      <div className="p-4 border-t border-slate-100 bg-white">
        {isTaken ? (
          <button
            onClick={goBack}
            data-testid="taken_back_button"
            className="w-full h-13 rounded-2xl bg-[#F5F6FA] hover:bg-slate-200 text-[#0A2E65] font-semibold text-[15px] transition cursor-pointer"
          >
            Back to job offers
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={declineRequest}
              data-testid="decline_button"
              className="flex-1 h-13 rounded-2xl bg-[#F5F6FA] hover:bg-slate-200 text-[#0A2E65] font-semibold text-[15px] transition cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={acceptRequest}
              data-testid="accept_button"
              className="flex-1 h-13 rounded-2xl bg-[#0067F5] hover:bg-blue-600 text-white font-semibold text-[15px] shadow-md transition cursor-pointer"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
