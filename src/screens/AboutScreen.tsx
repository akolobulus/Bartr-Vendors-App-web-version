import React from 'react';
import { ArrowLeft, Star, ThumbsUp, FileText, Play } from 'lucide-react';
import { useBartr } from '../context/BartrContext';
import { BartrLogoMark } from '../components/BartrLogo';

export const AboutScreen: React.FC = () => {
  const { goBack, showAlert, previewLoadingScreen } = useBartr();

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Topbar */}
      <div className="px-4 py-2.5 flex items-center">
        <button
          onClick={goBack}
          data-testid="back_button"
          className="w-9 h-9 rounded-full bg-[#F5F6FA] flex items-center justify-center text-[#0A2E65] hover:bg-slate-200 active:scale-95 transition"
          title="Back"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-[#0A2E65]" />
        </button>
      </div>

      <div className="px-5 py-1">
        <h1 className="text-2xl font-bold text-[#0A2E65]">About</h1>
      </div>

      <div className="flex-1 px-5 py-3 overflow-y-auto space-y-3 pb-8">
        {/* Brand Mark */}
        <div className="flex items-center gap-3.5 pt-2">
          <BartrLogoMark size={38} topColor="#0067F5" bottomColor="#0A2E65" />
          <h2 className="text-xl font-bold text-[#0A2E65]">Bartr for vendors</h2>
        </div>

        <p className="text-sm text-[#5B6472]">Version 1.0.0 (91896739)</p>

        <div className="pt-4 space-y-3">
          {/* Rate the app */}
          <div
            onClick={() =>
              showAlert("Thanks! App store rating isn't wired up in this prototype.")
            }
            className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
          >
            <Star className="w-5 h-5 text-[#0067F5] shrink-0" />
            <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
              Rate the app
            </span>
          </div>

          {/* Follow us on social media */}
          <div
            onClick={() => showAlert('Opening Bartr on social media...')}
            className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
          >
            <ThumbsUp className="w-5 h-5 text-[#0067F5] shrink-0" />
            <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
              Follow us on social media
            </span>
          </div>

          {/* Legal */}
          <div
            onClick={() =>
              showAlert('Legal and privacy documents are coming soon.')
            }
            className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
          >
            <FileText className="w-5 h-5 text-[#0067F5] shrink-0" />
            <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
              Legal
            </span>
          </div>

          {/* Preview loading screen */}
          <div
            onClick={previewLoadingScreen}
            className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
          >
            <Play className="w-5 h-5 text-[#0067F5] shrink-0" />
            <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
              Preview loading screen
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
