export type Screen =
  | 'SPLASH'
  | 'HOME'
  | 'JOB_OFFERS'
  | 'REQUEST_DETAIL'
  | 'ACTIVE_JOB'
  | 'CHAT'
  | 'RATING'
  | 'EARNINGS'
  | 'MY_JOBS'
  | 'GET_HELP'
  | 'FAQ_JOBS'
  | 'FAQ_PAYOUTS'
  | 'ABOUT'
  | 'PROFILE'
  | 'EDIT_PROFILE';

export interface JobOffer {
  id: string;
  customer: string;
  custInitial: string;
  custMeta: string;
  text: string;
  category: string;
  urgency: string;
  price: string;
  priceValue: number;
  distance: string;
  address: string;
  iconType: 'wrench' | 'spa' | 'car';
  colorType: 'blue' | 'green' | 'yellow';
  lat: number;
  lng: number;
  isTaken: boolean;
}

export interface VendorProfile {
  businessName: string;
  phone: string;
  rating: string;
  reviewCount: number;
  categories: string[];
  minPrice: string;
  maxPrice: string;
  about: string;
}

export interface JobHistoryItem {
  id: string;
  title: string;
  customer: string;
  dateOrMonth: string;
  monthSection: string;
  status: string; // "Completed", "Cancelled", "Today", etc.
  price: string;
  isPositive: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}
