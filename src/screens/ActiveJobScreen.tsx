import React from 'react';
import {
  ArrowLeft,
  MessageSquare,
  Shield,
  MapPin,
  Banknote,
  Ban,
} from 'lucide-react';
import { useBartr } from '../context/BartrContext';
import { BartrMapCanvas } from '../components/BartrMapCanvas';

export const ActiveJobScreen: React.FC = () => {
  const {
    activeRequest,
    activeJobStage,
    goBack,
    navigateTo,
    advanceJobStage,
    cancelJob,
    showAlert,
  } = useBartr();

  if (!activeRequest) return null;

  const getStageInfo = () => {
    switch (activeJobStage) {
      case 0:
        return {
          headline: 'Head to the customer',
          subheadline: `${activeRequest.customer} · ${activeRequest.address}`,
          buttonLabel: "I've arrived",
        };
      case 1:
        return {
          headline: "You've arrived",
          subheadline: "Let the customer know you're starting",
          buttonLabel: 'Start job',
        };
      default:
        return {
          headline: 'Job in progress',
          subheadline: activeRequest.customer,
          buttonLabel: 'Mark job complete',
        };
    }
  };

  const { headline, subheadline, buttonLabel } = getStageInfo();

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-hidden">
      {/* 1. Top Route Map (42% height) */}
      <div className="relative w-full h-[42%] min-h-[220px]">
        <BartrMapCanvas
          activeRequest={activeRequest}
          isRouteMode={true}
        />

        {/* Back button */}
        <button
          onClick={goBack}
          data-testid="active_back_button"
          className="absolute top-4 left-5 z-20 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-[#0A2E65] hover:bg-slate-50 active:scale-95 transition"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 text-[#0A2E65]" />
        </button>
      </div>

      {/* 2. Bottom Sheet Content (58% height) */}
      <div className="flex-1 w-full bg-white rounded-t-[26px] shadow-2xl z-10 -mt-4 flex flex-col p-5 overflow-y-auto">
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-3" />

        {/* Stage headline */}
        <div>
          <h2 className="text-xl font-bold text-[#0A2E65]">{headline}</h2>
          <p className="text-sm text-[#5B6472] mt-0.5 truncate">{subheadline}</p>
        </div>

        {/* Peer action row (Customer avatar, Chat, Safety) */}
        <div className="grid grid-cols-3 gap-2 my-4 py-2 border-y border-slate-100 text-center">
          {/* Customer Avatar */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-11 h-11 rounded-full bg-[#F5F6FA] flex items-center justify-center font-bold text-[#0A2E65] text-base">
              {activeRequest.custInitial}
            </div>
            <span className="text-xs font-medium text-[#5B6472] mt-1 truncate max-w-[70px]">
              {activeRequest.customer}
            </span>
          </div>

          {/* Chat Action */}
          <button
            onClick={() => navigateTo('CHAT')}
            data-testid="open_chat_button"
            className="flex flex-col items-center justify-center cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-[#E1F6FF] group-hover:bg-blue-200 flex items-center justify-center text-[#0067F5] transition">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-[#5B6472] mt-1">Chat</span>
          </button>

          {/* Safety Action */}
          <button
            onClick={() => showAlert('Report a safety concern is coming soon.')}
            className="flex flex-col items-center justify-center cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-[#E1F6FF] group-hover:bg-blue-200 flex items-center justify-center text-[#0067F5] transition">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-[#5B6472] mt-1">Safety</span>
          </button>
        </div>

        {/* Address and details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3.5 text-sm text-[#0A2E65]">
            <MapPin className="w-5 h-5 text-[#5B6472] shrink-0" />
            <span className="truncate">{activeRequest.address}</span>
          </div>

          <div className="flex items-center gap-3.5 text-sm">
            <Banknote className="w-5 h-5 text-[#2F9E63] shrink-0" />
            <span className="font-medium text-[#0A2E65] flex-1">Cash</span>
            <span className="font-bold text-[#0A2E65]">{activeRequest.price}</span>
          </div>
        </div>

        {/* Advance Stage Action Button */}
        <button
          onClick={advanceJobStage}
          data-testid="advance_stage_button"
          className="w-full h-13 rounded-2xl bg-[#0067F5] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold text-base shadow-md transition cursor-pointer"
        >
          {buttonLabel}
        </button>

        {/* Cancel job row */}
        <button
          onClick={cancelJob}
          data-testid="cancel_job_button"
          className="w-full flex items-center gap-3 py-3 mt-2 text-[#E5484D] hover:bg-red-50/50 rounded-xl px-2 transition cursor-pointer"
        >
          <Ban className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">Cancel job</span>
        </button>
      </div>
    </div>
  );
};
