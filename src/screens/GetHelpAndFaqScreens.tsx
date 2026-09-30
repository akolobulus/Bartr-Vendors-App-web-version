import React, { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Receipt,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useBartr } from '../context/BartrContext';

export const GetHelpScreen: React.FC = () => {
  const { goBack, navigateTo, showAlert } = useBartr();

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
        <h1 className="text-2xl font-bold text-[#0A2E65]">Get help</h1>
      </div>

      <div className="flex-1 px-5 py-3 overflow-y-auto space-y-3 pb-8">
        {/* Help Nav Card: Jobs */}
        <div
          onClick={() => navigateTo('FAQ_JOBS')}
          className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
        >
          <Briefcase className="w-6 h-6 text-[#0067F5] shrink-0" />
          <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
            Getting and managing jobs
          </span>
          <ChevronRight className="w-4 h-4 text-[#5B6472] shrink-0" />
        </div>

        {/* Help Nav Card: Payouts */}
        <div
          onClick={() => navigateTo('FAQ_PAYOUTS')}
          className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
        >
          <Receipt className="w-6 h-6 text-[#0067F5] shrink-0" />
          <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
            Payments and payouts
          </span>
          <ChevronRight className="w-4 h-4 text-[#5B6472] shrink-0" />
        </div>

        <div className="pt-5 pb-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#5B6472]">
            Still need help?
          </p>
        </div>

        {/* Live Chat */}
        <div
          onClick={() => showAlert('Live chat is coming soon!')}
          className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
        >
          <MessageCircle className="w-6 h-6 text-[#0067F5] shrink-0" />
          <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
            Chat with support
          </span>
          <ChevronRight className="w-4 h-4 text-[#5B6472] shrink-0" />
        </div>

        {/* Call Support */}
        <div
          onClick={() => showAlert('Call support: +234 800 000 0000')}
          className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
        >
          <Phone className="w-6 h-6 text-[#0067F5] shrink-0" />
          <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
            Call support
          </span>
          <ChevronRight className="w-4 h-4 text-[#5B6472] shrink-0" />
        </div>

        {/* Email Support */}
        <div
          onClick={() => showAlert('Email: vendors@bartr.app')}
          className="w-full p-4 rounded-2xl bg-[#F5F6FA] hover:bg-slate-100 flex items-center gap-3.5 cursor-pointer transition shadow-xs"
        >
          <Mail className="w-6 h-6 text-[#0067F5] shrink-0" />
          <span className="flex-1 text-[15px] font-semibold text-[#0A2E65]">
            Email us
          </span>
          <ChevronRight className="w-4 h-4 text-[#5B6472] shrink-0" />
        </div>
      </div>
    </div>
  );
};

interface FaqTemplateProps {
  title: string;
  faqs: { question: string; answer: string }[];
}

export const FaqScreenTemplate: React.FC<FaqTemplateProps> = ({ title, faqs }) => {
  const { goBack } = useBartr();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

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
        <h1 className="text-xl font-bold text-[#0A2E65]">{title}</h1>
      </div>

      <div className="flex-1 px-5 py-3 overflow-y-auto space-y-3 pb-8">
        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div key={idx} className="py-4 cursor-pointer" onClick={() => toggleIndex(idx)}>
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-[15px] font-medium text-[#0A2E65]">{faq.question}</h4>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#5B6472] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#5B6472] shrink-0" />
                  )}
                </div>

                {isExpanded && (
                  <p className="text-sm text-[#5B6472] leading-relaxed mt-2.5 pr-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const FaqJobsScreen: React.FC = () => {
  const faqs = [
    {
      question: 'How requests are matched to me',
      answer:
        'Requests are automatically matched based on your chosen service category, current distance (usually within 3km), and your vendor rating.',
    },
    {
      question: 'Why a request expired before I responded',
      answer:
        'To provide customers fast turnarounds, requests have an initial response window before becoming available to other top-rated vendors in your area.',
    },
    {
      question: 'How to set your service categories',
      answer:
        'You can update your active service categories any time in your vendor Profile settings under Edit Profile.',
    },
    {
      question: 'Improving your ranking in requests',
      answer:
        'Maintain a high completion rate, respond promptly to offers, and deliver 5-star quality repairs to boost your priority rank.',
    },
    {
      question: 'Cancelling an accepted job',
      answer:
        'You can cancel an active job from the job sheet. Please only cancel when strictly necessary to keep your vendor score healthy.',
    },
    {
      question: 'Why a job shows as "Booked"',
      answer:
        'A job shows as Booked when another nearby vendor accepted the offer while you were viewing the offers list.',
    },
  ];

  return <FaqScreenTemplate title="Getting and managing jobs" faqs={faqs} />;
};

export const FaqPayoutsScreen: React.FC = () => {
  const faqs = [
    {
      question: 'How and when you get paid',
      answer:
        'For cash jobs, collect payment directly from the customer upon completion. Digital wallet earnings can be withdrawn to your Nigerian bank account.',
    },
    {
      question: 'Withdrawing your balance',
      answer:
        'Tap Withdraw in the Earnings tab. Standard withdrawals settle directly to your verified commercial bank in 1 to 2 business days.',
    },
    {
      question: "How Bartr's commission works",
      answer:
        "Bartr charges a standard transparent 10% platform fee on completed jobs to cover support and platform infrastructure.",
    },
    {
      question: 'A customer paid me outside the app',
      answer:
        'For cash transactions, mark the job complete after receiving cash. No additional steps are required.',
    },
    {
      question: "Disputing a job's final price",
      answer:
        'If additional parts or labor were required beyond the original estimate, contact support before closing out the job.',
    },
    {
      question: 'Adding your bank account',
      answer:
        'Go to Profile > Payment details to link your NUBAN account number and verify your bank name.',
    },
  ];

  return <FaqScreenTemplate title="Payments and payouts" faqs={faqs} />;
};
