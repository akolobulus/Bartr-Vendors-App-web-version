import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useBartr } from '../context/BartrContext';

export const RatingScreen: React.FC = () => {
  const { activeRequest, submitRating } = useBartr();
  const [selectedStars, setSelectedStars] = useState(5);
  const [notes, setNotes] = useState('');

  const customerName = activeRequest?.customer || 'the customer';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRating(selectedStars, notes);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-7 bg-white overflow-y-auto">
      <div className="w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-[#0A2E65]">How was the job?</h2>
        <p className="text-sm text-[#5B6472] mt-2">
          Rate your experience with {customerName}
        </p>

        {/* 5-Star Row */}
        <div className="flex items-center justify-center gap-2 my-7">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= selectedStars;
            return (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedStars(star)}
                data-testid={`star_${star}`}
                className="p-1 hover:scale-115 active:scale-95 transition cursor-pointer"
                title={`${star} Stars`}
              >
                <Star
                  className={`w-9 h-9 ${
                    isFilled
                      ? 'fill-[#F5B301] text-[#F5B301]'
                      : 'text-slate-300 fill-slate-100'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Feedback textarea */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything you'd like to add? (optional)"
          data-testid="rating_feedback_input"
          rows={3}
          className="w-full p-4 rounded-2xl bg-[#F5F6FA] border border-slate-200 focus:outline-none focus:border-[#0067F5] text-sm text-[#0A2E65] placeholder:text-[#5B6472] resize-none"
        />

        {/* Submit rating button */}
        <button
          onClick={handleSubmit}
          data-testid="submit_rating_button"
          className="w-full h-13 mt-6 rounded-2xl bg-[#0067F5] hover:bg-blue-600 text-white font-semibold text-base shadow-md active:scale-[0.99] transition cursor-pointer"
        >
          Submit rating
        </button>
      </div>
    </div>
  );
};
