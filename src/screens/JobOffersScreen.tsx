import React from 'react';
import { ArrowLeft, Wrench, Sparkles, Car } from 'lucide-react';
import { useBartr } from '../context/BartrContext';
import { JobOffer } from '../types';

export const JobOffersScreen: React.FC = () => {
  const {
    incomingRequests,
    selectedFilter,
    vendorCategory,
    goBack,
    setFilter,
    openRequestDetail,
    showAlert,
  } = useBartr();

  const filteredOffers = incomingRequests.filter((offer) => {
    if (selectedFilter === 'forYou') {
      return offer.category === vendorCategory;
    }
    if (selectedFilter === 'all') {
      return true;
    }
    return offer.category === selectedFilter;
  });

  const filterOptions = [
    { id: 'forYou', label: 'For you' },
    { id: 'all', label: 'All categories' },
    { id: 'Nail Tech', label: 'Nail Tech' },
    { id: 'Mechanic', label: 'Mechanic' },
  ];

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

      {/* Page Title */}
      <div className="px-5 py-1">
        <h1 className="text-2xl font-bold text-[#0A2E65]">Job offers</h1>
      </div>

      {/* Horizontal filter chips */}
      <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {filterOptions.map((opt) => {
          const isSelected = selectedFilter === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              data-testid={`filter_${opt.label}`}
              className={`px-4.5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-[#0067F5] text-white shadow-xs'
                  : 'bg-[#F5F6FA] text-[#0A2E65] hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Offers list */}
      <div className="flex-1 px-5 py-2 overflow-y-auto space-y-3 pb-8">
        {filteredOffers.length === 0 ? (
          <div className="h-48 flex items-center justify-center p-6 text-center text-sm text-[#5B6472] leading-relaxed">
            No job offers in this category right now. Check back soon, or browse another category.
          </div>
        ) : (
          filteredOffers.map((offer: JobOffer) => {
            const isTaken = offer.isTaken;

            const iconBg =
              offer.colorType === 'green'
                ? 'bg-[#ECFBEC] text-[#2F9E63]'
                : offer.colorType === 'yellow'
                ? 'bg-[#FFFFEE] text-[#F5B301]'
                : 'bg-[#E1F6FF] text-[#0067F5]';

            return (
              <div
                key={offer.id}
                onClick={() => {
                  if (isTaken) {
                    showAlert('This job has already been taken by another vendor.');
                  } else {
                    openRequestDetail(offer.id);
                  }
                }}
                data-testid={`offer_card_${offer.id}`}
                className={`w-full p-3.5 bg-[#F5F6FA] rounded-2xl flex items-center gap-3.5 cursor-pointer active:scale-[0.99] transition ${
                  isTaken ? 'opacity-55 hover:bg-[#F5F6FA]' : 'hover:bg-slate-100/80 shadow-xs'
                }`}
              >
                {/* Category Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
                >
                  {offer.iconType === 'spa' ? (
                    <Sparkles className="w-5 h-5" />
                  ) : offer.iconType === 'car' ? (
                    <Car className="w-5 h-5" />
                  ) : (
                    <Wrench className="w-5 h-5" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#0A2E65] truncate">
                    {offer.text}
                  </h4>
                  <p className="text-xs text-[#5B6472] mt-0.5 truncate">
                    {offer.category} · {offer.urgency}
                  </p>
                </div>

                {/* Right price or booked pill */}
                <div className="shrink-0 text-right">
                  {isTaken ? (
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#E4E7EE] text-[11px] font-bold text-[#5B6472]">
                      Booked
                    </span>
                  ) : (
                    <>
                      <div className="text-sm font-bold text-[#0A2E65]">{offer.price}</div>
                      <div className="text-[11px] text-[#5B6472] mt-0.5">{offer.distance}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
