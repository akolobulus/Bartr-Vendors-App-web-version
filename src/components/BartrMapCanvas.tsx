import React, { useState } from 'react';
import { Wrench, Sparkles, Car, MapPin, Locate } from 'lucide-react';
import { JobOffer } from '../types';

interface BartrMapCanvasProps {
  requests?: JobOffer[];
  activeRequest?: JobOffer | null;
  isRouteMode?: boolean;
  onPinClick?: (id: string) => void;
  onRecenter?: () => void;
}

const getNormXForReq = (id: string): number => {
  switch (id) {
    case 'r1': return 0.72;
    case 'r2': return 0.22;
    case 'r3': return 0.78;
    case 'r4': return 0.65;
    case 'r5': return 0.18;
    default: return 0.5;
  }
};

const getNormYForReq = (id: string): number => {
  switch (id) {
    case 'r1': return 0.28;
    case 'r2': return 0.68;
    case 'r3': return 0.78;
    case 'r4': return 0.62;
    case 'r5': return 0.25;
    default: return 0.5;
  }
};

export const BartrMapCanvas: React.FC<BartrMapCanvasProps> = ({
  requests = [],
  activeRequest = null,
  isRouteMode = false,
  onPinClick = () => {},
  onRecenter = () => {},
}) => {
  const [recenteredNotice, setRecenteredNotice] = useState(false);

  // Vendor normalized coordinates
  const vendorX = 0.48;
  const vendorY = 0.52;

  const handleRecenter = () => {
    onRecenter();
    setRecenteredNotice(true);
    setTimeout(() => setRecenteredNotice(false), 1200);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F4F4ED] select-none">
      {/* SVG Map layer */}
      <svg
        className="w-full h-full block"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0A2E65" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* 1. City Blocks & Parks */}
        <rect x="50" y="70" width="350" height="196" rx="16" fill="#E8ECE3" />
        {/* Green park */}
        <rect x="520" y="56" width="420" height="175" rx="20" fill="#E2E8DC" />
        <rect x="80" y="385" width="380" height="266" rx="16" fill="#E8ECE3" />
        <rect x="560" y="364" width="380" height="280" rx="16" fill="#E5EBE0" />

        {/* 2. Major Roads Outline and Infill */}
        {/* Market Road (horizontal primary) */}
        <line x1="0" y1="308" x2="1000" y2="308" stroke="#D6DAD0" strokeWidth="32" strokeLinecap="round" />
        <line x1="0" y1="308" x2="1000" y2="308" stroke="#FFFFFF" strokeWidth="26" strokeLinecap="round" />

        {/* Allen Avenue (vertical primary) */}
        <line x1="480" y1="0" x2="480" y2="700" stroke="#D6DAD0" strokeWidth="36" strokeLinecap="round" />
        <line x1="480" y1="0" x2="480" y2="700" stroke="#FFFFFF" strokeWidth="30" strokeLinecap="round" />

        {/* Opebi Road (diagonal connector) */}
        <path
          d="M 100 665 L 480 308 L 880 35"
          stroke="#D6DAD0"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 100 665 L 480 308 L 880 35"
          stroke="#FFFFFF"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Toyin Street (secondary horizontal) */}
        <line x1="0" y1="546" x2="1000" y2="546" stroke="#D6DAD0" strokeWidth="20" strokeLinecap="round" />
        <line x1="0" y1="546" x2="1000" y2="546" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />

        {/* Awolowo Road (secondary horizontal) */}
        <line x1="0" y1="154" x2="1000" y2="154" stroke="#D6DAD0" strokeWidth="20" strokeLinecap="round" />
        <line x1="0" y1="154" x2="1000" y2="154" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />

        {/* Road Labels */}
        <text x="120" y="294" fill="#8C96A5" fontSize="13" fontWeight="600" fontFamily="sans-serif">
          Market Rd
        </text>
        <text x="500" y="224" fill="#8C96A5" fontSize="13" fontWeight="600" fontFamily="sans-serif">
          Allen Ave
        </text>
        <text x="620" y="534" fill="#8C96A5" fontSize="13" fontWeight="600" fontFamily="sans-serif">
          Toyin St
        </text>

        {/* 3. Route Line in Active Mode */}
        {isRouteMode && activeRequest && (
          <path
            d={`M ${vendorX * 1000} ${vendorY * 700} L 480 ${vendorY * 700} L 480 ${getNormYForReq(activeRequest.id) * 700} L ${getNormXForReq(activeRequest.id) * 1000} ${getNormYForReq(activeRequest.id) * 700}`}
            fill="none"
            stroke="#0067F5"
            strokeWidth="8"
            strokeDasharray="16 10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
        )}

        {/* 4. Vendor Pulsing Circle */}
        <circle
          cx={vendorX * 1000}
          cy={vendorY * 700}
          r="48"
          fill="#0067F5"
          fillOpacity="0.2"
          className="animate-ping origin-center"
        />
        <circle
          cx={vendorX * 1000}
          cy={vendorY * 700}
          r="26"
          fill="#0067F5"
          fillOpacity="0.15"
        />
      </svg>

      {/* HTML Overlays for sharp icon pins */}

      {/* Vendor Marker */}
      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${vendorX * 100}%`, top: `${vendorY * 100}%` }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#0067F5] shadow-lg flex items-center justify-center border-2 border-white ring-2 ring-blue-300">
          <Wrench className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Request Pins in Exploration Mode */}
      {!isRouteMode &&
        requests.map((req) => {
          if (req.isTaken) return null;
          const x = getNormXForReq(req.id) * 100;
          const y = getNormYForReq(req.id) * 100;

          const bgClass =
            req.colorType === 'green'
              ? 'bg-[#2F9E63]'
              : req.colorType === 'yellow'
              ? 'bg-[#F5B301]'
              : 'bg-[#0A2E65]';

          return (
            <button
              key={req.id}
              onClick={() => onPinClick(req.id)}
              data-testid={`pin_${req.id}`}
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-xl ${bgClass} shadow-md flex items-center justify-center text-white border border-white/50 active:scale-90 transition-transform cursor-pointer hover:scale-110`}
              style={{ left: `${x}%`, top: `${y}%` }}
              title={`${req.category} · ${req.price}`}
            >
              {req.iconType === 'spa' ? (
                <Sparkles className="w-4 h-4" />
              ) : req.iconType === 'car' ? (
                <Car className="w-4 h-4" />
              ) : (
                <Wrench className="w-4 h-4" />
              )}
            </button>
          );
        })}

      {/* Customer Pin in Active Route Mode */}
      {isRouteMode && activeRequest && (
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${getNormXForReq(activeRequest.id) * 100}%`,
            top: `${getNormYForReq(activeRequest.id) * 100}%`,
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-[#0A2E65] shadow-xl flex items-center justify-center border-2 border-white text-white">
            <MapPin className="w-5 h-5 text-red-400" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-white/90 backdrop-blur rounded text-[10px] font-bold text-[#0A2E65] shadow whitespace-nowrap">
            {activeRequest.customer}
          </div>
        </div>
      )}

      {/* Recenter button */}
      <button
        onClick={handleRecenter}
        data-testid="locate_button"
        className="absolute bottom-6 right-4 z-20 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0067F5] hover:bg-slate-50 active:scale-95 transition"
        title="Center on my location"
      >
        <Locate className="w-5 h-5" />
      </button>

      {/* Recenter Toast */}
      {recenteredNotice && (
        <div className="absolute top-4 right-4 z-30 bg-[#0A2E65]/90 text-white text-xs px-3 py-1.5 rounded-full shadow pointer-events-none animate-fade-in">
          Centered on current location
        </div>
      )}
    </div>
  );
};
