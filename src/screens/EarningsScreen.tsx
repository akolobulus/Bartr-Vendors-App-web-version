import React from 'react';
import { ArrowLeft, Eye, EyeOff, Wrench } from 'lucide-react';
import { useBartr } from '../context/BartrContext';

export const EarningsScreen: React.FC = () => {
  const {
    availableBalance,
    balanceHidden,
    weekJobs,
    weekTotal,
    jobHistory,
    goBack,
    toggleBalanceVisibility,
    showAlert,
  } = useBartr();

  const displayBalance = balanceHidden
    ? '••••••'
    : `₦${availableBalance.toLocaleString()}`;

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
        <h1 className="text-2xl font-bold text-[#0A2E65]">Earnings</h1>
      </div>

      <div className="flex-1 px-5 py-3 overflow-y-auto space-y-5 pb-8">
        {/* Blue Balance Card */}
        <div
          data-testid="balance_card"
          className="w-full rounded-3xl bg-[#0067F5] p-6 text-white shadow-lg relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/85">Available balance</span>
            <button
              onClick={toggleBalanceVisibility}
              className="p-1 rounded-full text-white/85 hover:text-white transition"
              title="Show or hide balance"
            >
              {balanceHidden ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          </div>

          <div className="text-3xl font-bold mt-3 tracking-tight">
            {displayBalance}
          </div>

          <div className="mt-5">
            <button
              onClick={() => showAlert('Withdrawals process in 1 to 2 business days.')}
              data-testid="withdraw_button"
              className="px-6 py-2.5 rounded-full bg-white text-[#0A2E65] font-bold text-sm shadow-xs hover:bg-slate-100 active:scale-95 transition cursor-pointer"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Stat pair */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-[#F5F6FA] rounded-2xl">
            <div className="text-xl font-bold text-[#0A2E65]">{weekJobs}</div>
            <div className="text-xs text-[#5B6472] mt-1">Jobs this week</div>
          </div>
          <div className="p-4 bg-[#F5F6FA] rounded-2xl">
            <div className="text-xl font-bold text-[#0A2E65]">{weekTotal}</div>
            <div className="text-xs text-[#5B6472] mt-1">Earned this week</div>
          </div>
        </div>

        {/* Recent jobs */}
        <div className="pt-2">
          <h3 className="text-base font-bold text-[#0A2E65] mb-2">Recent jobs</h3>

          <div className="divide-y divide-slate-100">
            {jobHistory.slice(0, 5).map((job) => (
              <div key={job.id} className="py-3.5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E1F6FF] flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5 text-[#0067F5]" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#0A2E65] truncate">
                    {job.title}
                  </h4>
                  <p className="text-xs text-[#5B6472] mt-0.5 truncate">
                    {job.customer} · {job.dateOrMonth}
                  </p>
                </div>

                <span className="text-sm font-bold text-[#2F9E63] shrink-0">
                  +{job.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
