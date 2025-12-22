/**
 * WPS API Service
 * Handles all communication with the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ==================== TYPES ====================

export interface EventData {
  id: number;
  title: { ru: string; en: string };
  description: { ru: string; en: string };
  type: string;
  date: string; // DD.MM.YYYY
  time: string; // HH:MM - HH:MM
  location: { ru: string; en: string };
  venue?: { ru: string; en: string };
  tags: string[];
  downloadLink?: string;
  additionalInfo?: { ru: string; en: string };
  goals?: string[];
  format?: { ru: string; en: string };
  questions?: string[];
  moderators?: Array<{ name: string; description: string }>;
  experts?: Array<{ name: string; description: string }>;
  speakers?: Array<{ name: string; country: string; description: string }>;
}

export interface NewsData {
  id: number;
  type: 'news' | 'article';
  image: string;
  category: string;
  title: { ru: string; en: string };
  excerpt: { ru: string; en: string };
  lead?: { ru: string; en: string };
  content?: { ru: string; en: string };
  date: string; // DD.MM.YYYY
  views?: number;
}

export interface HotelData {
  id: number;
  name: { ru: string; en: string };
  address: { ru: string; en: string };
  metro: { ru: string; en: string };
  price: string;
  image: string;
  category: 'recommended' | 'championship' | 'verified';
  specialTariff: boolean;
}

export interface CommitteeMemberData {
  id: number;
  name: { ru: string; en: string };
  position: { ru: string; en: string };
  country: string;
}

export interface PartnerPackageData {
  id: number;
  title: { ru: string; en: string };
  category: string;
  description: { ru: string; en: string };
  benefits: string[];
  price: { ru: string; en: string };
  downloadLink?: string;
}

export interface CompetitionData {
  id: number;
  type: string;
  name: { ru: string; en: string };
  description: { ru: string; en: string };
  timeline_opening?: string;
  timeline_closing?: string;
  timeline_announcement?: string;
  eligibility_age_min?: number;
  eligibility_age_max?: number;
  eligibility_requirements?: string[];
  support_areas?: string[];
}

export interface CompetitionFaqData {
  question: { ru: string; en: string };
  answer: { ru: string; en: string };
}

export interface AwardData {
  id: number;
  title: { ru: string; en: string };
  awardYear: string;
  awardType: string;
  winnerName: string;
  winnerBio?: { ru: string; en: string };
  description: { ru: string; en: string };
  image?: string;
}

export interface PartnerData {
  id: number;
  name: { ru: string; en: string };
  logo: string;
  websiteUrl: string;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get localized text (English by default, falls back to Russian)
 */
export const getLocalized = (data: { ru?: string; en?: string } | string, locale: 'ru' | 'en' = 'en'): string => {
  if (typeof data === 'string') return data;
  if (!data) return '';
  return data[locale] || data['en'] || data['ru'] || '';
};

/**
 * Parse API response and extract data
 */
const parseResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// ==================== API CALLS ====================

// ===== EVENTS =====
export const eventsAPI = {
  /**
   * Get all events with optional filtering
   */
  getAll: async (filters?: { date?: string; tags?: string }): Promise<EventData[]> => {
    let url = `${API_BASE_URL}/api/events`;
    const params = new URLSearchParams();

    if (filters?.date) params.append('date', filters.date);
    if (filters?.tags) params.append('tags', filters.tags);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data.data || [];
  },

  /**
   * Get specific event by ID
   */
  getById: async (id: number): Promise<EventData> => {
    const response = await fetch(`${API_BASE_URL}/api/events/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== NEWS =====
export const newsAPI = {
  /**
   * Get all news with optional filtering
   */
  getAll: async (filters?: { type?: 'news' | 'article' }): Promise<NewsData[]> => {
    let url = `${API_BASE_URL}/api/news`;

    if (filters?.type) {
      url += `?type=${filters.type}`;
    }

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data.data || [];
  },

  /**
   * Get specific news by ID
   */
  getById: async (id: number): Promise<NewsData> => {
    const response = await fetch(`${API_BASE_URL}/api/news/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== HOTELS =====
export const hotelsAPI = {
  /**
   * Get all hotels with optional category filter
   */
  getAll: async (filters?: { category?: string }): Promise<HotelData[]> => {
    let url = `${API_BASE_URL}/api/hotels`;

    if (filters?.category) {
      url += `?category=${filters.category}`;
    }

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data.data || [];
  },

  /**
   * Get specific hotel by ID
   */
  getById: async (id: number): Promise<HotelData> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== COMMITTEE MEMBERS =====
export const committeeMembersAPI = {
  /**
   * Get all committee members
   */
  getAll: async (): Promise<CommitteeMemberData[]> => {
    const response = await fetch(`${API_BASE_URL}/api/committee-members`);
    const data = await parseResponse(response);
    return data.data || [];
  },

  /**
   * Get specific committee member by ID
   */
  getById: async (id: number): Promise<CommitteeMemberData> => {
    const response = await fetch(`${API_BASE_URL}/api/committee-members/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== PARTNER PACKAGES =====
export const partnerPackagesAPI = {
  /**
   * Get all partner packages with optional category filter
   */
  getAll: async (filters?: { category?: string }): Promise<PartnerPackageData[]> => {
    let url = `${API_BASE_URL}/api/partner-packages`;

    if (filters?.category) {
      url += `?category=${filters.category}`;
    }

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data.data || [];
  },

  /**
   * Get specific package by ID
   */
  getById: async (id: number): Promise<PartnerPackageData> => {
    const response = await fetch(`${API_BASE_URL}/api/partner-packages/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== COMPETITIONS =====
export const competitionsAPI = {
  /**
   * Get all competitions
   */
  getAll: async (): Promise<CompetitionData[]> => {
    const response = await fetch(`${API_BASE_URL}/api/competitions`);
    const data = await parseResponse(response);
    return data.data || [];
  },

  /**
   * Get specific competition by ID (includes FAQ)
   */
  getById: async (id: number): Promise<CompetitionData & { faqItems?: CompetitionFaqData[] }> => {
    const response = await fetch(`${API_BASE_URL}/api/competitions/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== AWARDS =====
export const awardsAPI = {
  /**
   * Get all awards with optional year filter
   */
  getAll: async (filters?: { year?: string }): Promise<AwardData[]> => {
    let url = `${API_BASE_URL}/api/awards`;

    if (filters?.year) {
      url += `?year=${filters.year}`;
    }

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data.data || [];
  },

  /**
   * Get specific award by ID
   */
  getById: async (id: number): Promise<AwardData> => {
    const response = await fetch(`${API_BASE_URL}/api/awards/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== PARTNERS =====
export const partnersAPI = {
  /**
   * Get all partners
   */
  getAll: async (): Promise<PartnerData[]> => {
    const response = await fetch(`${API_BASE_URL}/api/partners`);
    const data = await parseResponse(response);
    return data.data || [];
  },

  /**
   * Get specific partner by ID
   */
  getById: async (id: number): Promise<PartnerData> => {
    const response = await fetch(`${API_BASE_URL}/api/partners/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};
