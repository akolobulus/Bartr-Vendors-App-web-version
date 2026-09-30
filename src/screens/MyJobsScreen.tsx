import React from 'react';
import { ArrowLeft, Wrench } from 'lucide-react';
import { useBartr } from '../context/BartrContext';
import { JobHistoryItem } from '../types';

export const MyJobsScreen: React.FC = () => {
  const { jobHistory, goBack } = useBartr();

  // Group by monthSection
  const grouped = jobHistory.reduce((acc, job) => {
    if (!acc[job.monthSection]) {
      acc[job.monthSection] = [];
    }
    acc[job.monthSection].push(job);
    return acc;
  }, {} as Record<string, JobHistoryItem[]>);

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
        <h1 className="text-2xl font-bold text-[#0A2E65]">My jobs</h1>
      </div>

      <div className="flex-1 px-5 py-2 overflow-y-auto space-y-6 pb-8">
        {Object.entries(grouped).map(([month, jobs]) => (
          <div key={month}>
            <h3 className="text-sm font-bold text-[#0A2E65] mb-2">{month}</h3>

            <div className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <div key={job.id} className="py-3.5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E1F6FF] flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-[#0067F5]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#0A2E65] truncate">
                      {job.title}
                    </h4>
                    <p className="text-xs text-[#5B6472] mt-0.5 truncate">
                      {job.customer} · {job.status}
                    </p>
                  </div>

                  <span className="text-sm font-bold text-[#0A2E65] shrink-0">
                    {job.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
