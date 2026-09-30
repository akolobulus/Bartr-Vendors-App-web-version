import React, { useState } from 'react';
import {
  ArrowLeft,
  Wrench,
  LogOut,
  Trash2,
  Edit2,
} from 'lucide-react';
import { useBartr } from '../context/BartrContext';

export const ProfileScreen: React.FC = () => {
  const { vendorProfile, goBack, navigateTo, showAlert } = useBartr();

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Topbar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={goBack}
          data-testid="back_button"
          className="w-9 h-9 rounded-full bg-[#F5F6FA] flex items-center justify-center text-[#0A2E65] hover:bg-slate-200 active:scale-95 transition"
          title="Back"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-[#0A2E65]" />
        </button>

        <button
          onClick={() => navigateTo('EDIT_PROFILE')}
          data-testid="edit_profile_button"
          className="text-[15px] font-bold text-[#0067F5] hover:text-blue-700 px-3 py-1 cursor-pointer"
        >
          Edit
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Hero avatar & business info */}
        <div className="flex flex-col items-center justify-center py-4 px-5 text-center">
          <div className="w-22 h-22 rounded-3xl bg-[#E1F6FF] flex items-center justify-center text-[#0067F5] shadow-xs">
            <Wrench className="w-9 h-9" />
          </div>

          <h2 className="text-xl font-bold text-[#0A2E65] mt-3">
            {vendorProfile.businessName}
          </h2>

          <p className="text-sm font-semibold text-[#0067F5] mt-0.5">
            ★★★★★ {vendorProfile.rating} · {vendorProfile.reviewCount} reviews
          </p>

          <p className="text-sm text-[#5B6472] mt-0.5">{vendorProfile.phone}</p>
        </div>

        {/* Separator band */}
        <div className="w-full h-2 bg-[#F5F6FA]" />

        {/* Profile info body */}
        <div className="p-5 space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6472] block mb-2.5">
              Service categories
            </span>
            <div className="flex flex-wrap gap-2">
              {vendorProfile.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-[#E1F6FF] text-xs font-bold text-[#0A2E65]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6472] block mb-1.5">
              Typical price range
            </span>
            <p className="text-[15px] text-[#0A2E65]">
              {vendorProfile.minPrice} – {vendorProfile.maxPrice} per job
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6472] block mb-1.5">
              About
            </span>
            <p className="text-[15px] text-[#0A2E65] leading-relaxed">
              {vendorProfile.about}
            </p>
          </div>
        </div>

        {/* Separator band */}
        <div className="w-full h-2 bg-[#F5F6FA]" />

        {/* Danger actions */}
        <div className="p-5 space-y-1">
          <div
            onClick={() => showAlert('Logged out (prototype only).')}
            className="flex items-center gap-3 py-3 text-[#E5484D] hover:bg-red-50/50 rounded-xl px-2 cursor-pointer transition"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="text-[15px] font-medium">Log out</span>
          </div>

          <div
            onClick={() =>
              showAlert("Account deletion isn't available in this prototype.")
            }
            className="flex items-center gap-3 py-3 text-[#E5484D] hover:bg-red-50/50 rounded-xl px-2 cursor-pointer transition"
          >
            <Trash2 className="w-5 h-5 shrink-0" />
            <span className="text-[15px] font-medium">Delete account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditProfileScreen: React.FC = () => {
  const { vendorProfile, goBack, updateProfile, showAlert } = useBartr();

  const [businessName, setBusinessName] = useState(vendorProfile.businessName);
  const [phone, setPhone] = useState(vendorProfile.phone);
  const [categoriesText, setCategoriesText] = useState(
    vendorProfile.categories.join(', ')
  );
  const [minPrice, setMinPrice] = useState(vendorProfile.minPrice);
  const [maxPrice, setMaxPrice] = useState(vendorProfile.maxPrice);
  const [aboutText, setAboutText] = useState(vendorProfile.about);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cats = categoriesText
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    updateProfile(
      businessName,
      phone,
      cats.length > 0 ? cats : ['Phone Repair'],
      minPrice,
      maxPrice,
      aboutText
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Topbar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
        <button
          onClick={goBack}
          className="text-[15px] font-medium text-[#0067F5] hover:text-blue-700 cursor-pointer"
        >
          Cancel
        </button>

        <h3 className="text-base font-bold text-[#0A2E65]">Edit profile</h3>

        <div className="w-12" />
      </div>

      <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-3.5 pb-8">
        {/* Avatar with edit badge */}
        <div className="flex justify-center py-2">
          <div
            onClick={() => showAlert('Photo upload is coming soon!')}
            className="relative w-22 h-22 rounded-3xl bg-[#E1F6FF] flex items-center justify-center text-[#0067F5] cursor-pointer hover:bg-blue-100 transition shadow-xs"
          >
            <Wrench className="w-9 h-9" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0067F5] text-white flex items-center justify-center shadow">
              <Edit2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Business Name */}
        <div className="p-3 bg-[#F5F6FA] rounded-2xl">
          <label className="text-[11px] font-bold text-[#5B6472] uppercase tracking-wider block mb-1">
            Business name
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full bg-transparent text-sm text-[#0A2E65] font-medium focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="p-3 bg-[#F5F6FA] rounded-2xl">
          <label className="text-[11px] font-bold text-[#5B6472] uppercase tracking-wider block mb-1">
            Phone number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-transparent text-sm text-[#0A2E65] font-medium focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="p-3 bg-[#F5F6FA] rounded-2xl">
          <label className="text-[11px] font-bold text-[#5B6472] uppercase tracking-wider block mb-1">
            Service category (comma separated)
          </label>
          <input
            type="text"
            value={categoriesText}
            onChange={(e) => setCategoriesText(e.target.value)}
            className="w-full bg-transparent text-sm text-[#0A2E65] font-medium focus:outline-none"
          />
        </div>

        {/* Price Pair */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-[#F5F6FA] rounded-2xl">
            <label className="text-[11px] font-bold text-[#5B6472] uppercase tracking-wider block mb-1">
              Min price
            </label>
            <input
              type="text"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-transparent text-sm text-[#0A2E65] font-medium focus:outline-none"
            />
          </div>
          <div className="p-3 bg-[#F5F6FA] rounded-2xl">
            <label className="text-[11px] font-bold text-[#5B6472] uppercase tracking-wider block mb-1">
              Max price
            </label>
            <input
              type="text"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-transparent text-sm text-[#0A2E65] font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* About */}
        <div className="p-3 bg-[#F5F6FA] rounded-2xl">
          <label className="text-[11px] font-bold text-[#5B6472] uppercase tracking-wider block mb-1">
            About your business
          </label>
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows={3}
            className="w-full bg-transparent text-sm text-[#0A2E65] font-medium focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Save button */}
        <button
          type="submit"
          data-testid="save_profile_button"
          className="w-full h-13 mt-4 rounded-2xl bg-[#0067F5] hover:bg-blue-600 text-white font-semibold text-base shadow-md active:scale-[0.99] transition cursor-pointer"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};
