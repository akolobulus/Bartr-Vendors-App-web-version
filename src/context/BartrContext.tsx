import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { Screen, JobOffer, VendorProfile, JobHistoryItem, ChatMessage } from '../types';

export const initialOffers: JobOffer[] = [
  {
    id: 'r1',
    customer: 'David O.',
    custInitial: 'D',
    custMeta: '★★★★★ 4.8 · 14 past requests',
    text: 'My phone screen cracked, need am fix today',
    category: 'Phone Repair',
    urgency: 'Urgent · Today',
    price: '₦5,000',
    priceValue: 5000,
    distance: '0.6km',
    address: '14 Market Road, Ikeja',
    iconType: 'wrench',
    colorType: 'blue',
    lat: 6.6045,
    lng: 3.3565,
    isTaken: false,
  },
  {
    id: 'r2',
    customer: 'Grace A.',
    custInitial: 'G',
    custMeta: '★★★★★ 4.6 · 6 past requests',
    text: 'Charging port dey loose, phone no wan charge well',
    category: 'Phone Repair',
    urgency: 'Today',
    price: '₦4,500',
    priceValue: 4500,
    distance: '1.1km',
    address: '9 Allen Avenue, Ikeja',
    iconType: 'wrench',
    colorType: 'blue',
    lat: 6.5975,
    lng: 3.3480,
    isTaken: false,
  },
  {
    id: 'r3',
    customer: 'Tunde B.',
    custInitial: 'T',
    custMeta: '★★★★☆ 4.4 · 3 past requests',
    text: 'Back glass don crack, I need am replaced this weekend',
    category: 'Phone Repair',
    urgency: 'This weekend',
    price: '₦6,000',
    priceValue: 6000,
    distance: '1.8km',
    address: '22 Opebi Road, Ikeja',
    iconType: 'wrench',
    colorType: 'blue',
    lat: 6.6070,
    lng: 3.3610,
    isTaken: false,
  },
  {
    id: 'r4',
    customer: 'Amaka N.',
    custInitial: 'A',
    custMeta: '★★★★★ 4.9 · 21 past requests',
    text: 'Need a gel manicure done at home this evening',
    category: 'Nail Tech',
    urgency: 'Today',
    price: '₦6,500',
    priceValue: 6500,
    distance: '1.4km',
    address: '5 Toyin Street, Ikeja',
    iconType: 'spa',
    colorType: 'green',
    lat: 6.5990,
    lng: 3.3555,
    isTaken: false,
  },
  {
    id: 'r5',
    customer: 'Segun K.',
    custInitial: 'S',
    custMeta: '★★★★☆ 4.3 · 2 past requests',
    text: 'Car making strange noise, need a diagnostic check',
    category: 'Mechanic',
    urgency: 'This week',
    price: '₦12,000',
    priceValue: 12000,
    distance: '2.1km',
    address: '40 Awolowo Road, Ikeja',
    iconType: 'car',
    colorType: 'yellow',
    lat: 6.6060,
    lng: 3.3455,
    isTaken: false,
  },
];

export const initialHistory: JobHistoryItem[] = [
  { id: 'h1', title: 'Phone screen repair', customer: 'David O.', dateOrMonth: 'Today', monthSection: 'Sept 2026', status: 'Completed', price: '₦5,000', isPositive: true },
  { id: 'h2', title: 'Battery replacement', customer: 'Grace A.', dateOrMonth: 'Yesterday', monthSection: 'Sept 2026', status: 'Completed', price: '₦4,500', isPositive: true },
  { id: 'h3', title: 'Charging port fix', customer: 'Tunde B.', dateOrMonth: '3 days ago', monthSection: 'Aug 2026', status: 'Completed', price: '₦6,000', isPositive: true },
  { id: 'h4', title: 'Water damage repair', customer: 'Amaka N.', dateOrMonth: 'Last month', monthSection: 'Aug 2026', status: 'Cancelled', price: '₦0', isPositive: false },
];

export const initialProfile: VendorProfile = {
  businessName: "Chuka's Repairs",
  phone: '+234 704 200 1836',
  rating: '4.9',
  reviewCount: 128,
  categories: ['Phone Repair', 'Tablet Repair'],
  minPrice: '₦4,500',
  maxPrice: '₦6,000',
  about: 'Specialists in screen and battery replacement, with same-day turnaround for most repairs. Based in Ikeja, serving a 3km radius.',
};

interface BartrContextType {
  screenStack: Screen[];
  currentScreen: Screen;
  balanceHidden: boolean;
  availableBalance: number;
  todayEarnings: number;
  todayJobs: number;
  weekJobs: number;
  weekTotal: string;
  incomingRequests: JobOffer[];
  activeRequest: JobOffer | null;
  selectedFilter: string;
  vendorCategory: string;
  activeJobStage: number; // 0: Arriving, 1: Arrived, 2: In Progress
  countdownSeconds: number;
  isRequestTakenBannerVisible: boolean;
  chatMessages: ChatMessage[];
  vendorProfile: VendorProfile;
  jobHistory: JobHistoryItem[];
  alertMessage: string | null;
  isDrawerOpen: boolean;

  // Actions
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  resetToHome: () => void;
  setDrawerOpen: (open: boolean) => void;
  toggleBalanceVisibility: () => void;
  setFilter: (filter: string) => void;
  openRequestDetail: (requestId: string) => void;
  declineRequest: () => void;
  acceptRequest: () => void;
  markOfferTaken: (requestId: string) => void;
  advanceJobStage: () => void;
  cancelJob: () => void;
  sendChatMessage: (text: string) => void;
  submitRating: (stars: number, feedback?: string) => void;
  updateProfile: (
    businessName: string,
    phone: string,
    categories: string[],
    minPrice: string,
    maxPrice: string,
    about: string
  ) => void;
  showAlert: (message: string) => void;
  clearAlert: () => void;
  previewLoadingScreen: () => void;
}

const BartrContext = createContext<BartrContextType | undefined>(undefined);

export const BartrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screenStack, setScreenStack] = useState<Screen[]>(['SPLASH']);
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(48500);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [todayJobs, setTodayJobs] = useState(0);
  const [weekJobs] = useState(9);
  const [weekTotal] = useState('₦52,000');
  const [incomingRequests, setIncomingRequests] = useState<JobOffer[]>(initialOffers);
  const [activeRequest, setActiveRequest] = useState<JobOffer | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('forYou');
  const [vendorCategory] = useState('Phone Repair');
  const [activeJobStage, setActiveJobStage] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(600);
  const [isRequestTakenBannerVisible, setIsRequestTakenBannerVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'm1', text: 'Hi, how far are you?', isMe: false, time: '10:14 AM' },
  ]);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile>(initialProfile);
  const [jobHistory, setJobHistory] = useState<JobHistoryItem[]>(initialHistory);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentScreen = useMemo(() => {
    return screenStack[screenStack.length - 1] || 'HOME';
  }, [screenStack]);

  // Initial Splash Screen auto-transition after 2.2s
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setScreenStack((prev) => {
        if (prev.length === 1 && prev[0] === 'SPLASH') {
          return ['HOME'];
        }
        return prev;
      });
    }, 2200);

    // Simulation: another vendor grabs offer r2 after 15s
    const simOfferTimer = setTimeout(() => {
      markOfferTaken('r2');
    }, 15000);

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(simOfferTimer);
    };
  }, []);

  const navigateTo = (screen: Screen) => {
    setScreenStack((prev) => [...prev, screen]);
    setIsDrawerOpen(false);
  };

  const goBack = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setScreenStack((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, prev.length - 1);
      }
      return prev;
    });
    setIsRequestTakenBannerVisible(false);
  };

  const resetToHome = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setScreenStack(['HOME']);
    setIsDrawerOpen(false);
    setIsRequestTakenBannerVisible(false);
  };

  const previewLoadingScreen = () => {
    navigateTo('SPLASH');
    setTimeout(() => {
      setScreenStack((prev) => {
        if (prev[prev.length - 1] === 'SPLASH' && prev.length > 1) {
          return prev.slice(0, prev.length - 1);
        }
        return prev;
      });
    }, 2200);
  };

  const toggleBalanceVisibility = () => {
    setBalanceHidden((prev) => !prev);
  };

  const markOfferTaken = (requestId: string) => {
    setIncomingRequests((prev) =>
      prev.map((offer) => (offer.id === requestId ? { ...offer, isTaken: true } : offer))
    );
    setActiveRequest((curr) => {
      if (curr && curr.id === requestId) {
        setIsRequestTakenBannerVisible(true);
        return { ...curr, isTaken: true };
      }
      return curr;
    });
  };

  const openRequestDetail = (requestId: string) => {
    const offer = incomingRequests.find((o) => o.id === requestId);
    if (!offer) return;
    if (offer.isTaken) {
      showAlert('This job has already been taken by another vendor.');
      return;
    }

    setActiveRequest(offer);
    setCountdownSeconds(600);
    setIsRequestTakenBannerVisible(false);
    navigateTo('REQUEST_DETAIL');

    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    countdownTimerRef.current = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
          }
          markOfferTaken(requestId);
          setIsRequestTakenBannerVisible(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const declineRequest = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    goBack();
  };

  const acceptRequest = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (!activeRequest) return;

    setIncomingRequests((prev) => prev.filter((o) => o.id !== activeRequest.id));
    setActiveJobStage(0);
    setChatMessages([
      { id: 'm1', text: 'Hi, how far are you?', isMe: false, time: 'Just now' },
    ]);
    navigateTo('ACTIVE_JOB');
  };

  const advanceJobStage = () => {
    if (activeJobStage === 0) {
      setActiveJobStage(1);
    } else if (activeJobStage === 1) {
      setActiveJobStage(2);
    } else {
      navigateTo('RATING');
    }
  };

  const cancelJob = () => {
    setActiveRequest(null);
    setActiveJobStage(0);
    resetToHome();
    showAlert('Job cancelled. The customer has been notified.');
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      text: text.trim(),
      isMe: true,
      time: 'Just now',
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Realistic automated customer reply
    setTimeout(() => {
      const replies = [
        'Alright, no problem! Waiting for you.',
        'Okay perfect, please take your time.',
        'Noted! Let me know as soon as you reach the gate.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const customerReply: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        text: randomReply,
        isMe: false,
        time: 'Just now',
      };
      setChatMessages((prev) => [...prev, customerReply]);
    }, 1200);
  };

  const submitRating = (_stars: number, _feedback?: string) => {
    const earned = activeRequest?.priceValue || 0;
    const newHistoryItem: JobHistoryItem = {
      id: `h_${Date.now()}`,
      title: activeRequest?.text || 'Service repair',
      customer: activeRequest?.customer || 'Customer',
      dateOrMonth: 'Today',
      monthSection: 'Sept 2026',
      status: 'Completed',
      price: activeRequest?.price || `₦${earned}`,
      isPositive: true,
    };

    setTodayEarnings((prev) => prev + earned);
    setTodayJobs((prev) => prev + 1);
    setAvailableBalance((prev) => prev + earned);
    setJobHistory((prev) => [newHistoryItem, ...prev]);
    setActiveRequest(null);
    setActiveJobStage(0);
    resetToHome();
    showAlert(`Job complete! ₦${earned.toLocaleString()} added to your balance.`);
  };

  const updateProfile = (
    businessName: string,
    phone: string,
    categories: string[],
    minPrice: string,
    maxPrice: string,
    about: string
  ) => {
    setVendorProfile({
      ...vendorProfile,
      businessName,
      phone,
      categories,
      minPrice,
      maxPrice,
      about,
    });
    goBack();
    showAlert('Profile updated successfully!');
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };

  const clearAlert = () => {
    setAlertMessage(null);
  };

  return (
    <BartrContext.Provider
      value={{
        screenStack,
        currentScreen,
        balanceHidden,
        availableBalance,
        todayEarnings,
        todayJobs,
        weekJobs,
        weekTotal,
        incomingRequests,
        activeRequest,
        selectedFilter,
        vendorCategory,
        activeJobStage,
        countdownSeconds,
        isRequestTakenBannerVisible,
        chatMessages,
        vendorProfile,
        jobHistory,
        alertMessage,
        isDrawerOpen,

        navigateTo,
        goBack,
        resetToHome,
        setDrawerOpen: setIsDrawerOpen,
        toggleBalanceVisibility,
        setFilter: setSelectedFilter,
        openRequestDetail,
        declineRequest,
        acceptRequest,
        markOfferTaken,
        advanceJobStage,
        cancelJob,
        sendChatMessage,
        submitRating,
        updateProfile,
        showAlert,
        clearAlert,
        previewLoadingScreen,
      }}
    >
      {children}
    </BartrContext.Provider>
  );
};

export const useBartr = (): BartrContextType => {
  const context = useContext(BartrContext);
  if (!context) {
    throw new Error('useBartr must be used within a BartrProvider');
  }
  return context;
};
