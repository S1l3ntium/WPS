/**
 * WPS API Service
 * Handles all communication with the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

// ==================== TYPES ====================

export interface PaginationParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from?: number;
    to?: number;
  };
}

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
  logo_path?: string;
  logo_url?: string;
  has_custom_logo?: boolean;
  timeline_opening?: string;
  timeline_opening_formatted?: string;
  timeline_closing?: string;
  timeline_closing_formatted?: string;
  timeline_announcement?: string;
  timeline_announcement_formatted?: string;
  eligibility_age_min?: number;
  eligibility_age_max?: number;
  eligibility_requirements?: string[];
  support_areas?: string[];
}

export interface CompetitionFaqData {
  question: { ru: string; en: string };
  answer: { ru: string; en: string };
}

// Competition type labels with localization
export const COMPETITION_TYPES = {
  grant: { ru: 'Грант', en: 'Grant' },
  award: { ru: 'Премия', en: 'Award' },
  fellowship: { ru: 'Стипендия', en: 'Fellowship' },
  scholarship: { ru: 'Стипендия', en: 'Scholarship' },
} as const;

export function getCompetitionTypeLabel(type: string, locale: 'ru' | 'en' = 'en'): string {
  const typeKey = type.toLowerCase() as keyof typeof COMPETITION_TYPES;
  return COMPETITION_TYPES[typeKey]?.[locale] || type;
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

export interface HeroSlideButton {
  text: { ru: string; en: string };
  link: string;
  style: 'primary' | 'secondary' | 'outline';
  order: number;
}

export interface HeroSlideData {
  id: number;
  title: { ru: string; en: string };
  subtitle: { ru: string; en: string };
  subtitle_highlight?: { ru: string; en: string };
  subtitle_end?: { ru: string; en: string };
  description: { ru: string; en: string };
  background_image?: string;
  background_gradient?: string;
  event_info?: {
    date?: { ru: string; en: string };
    venue?: { ru: string; en: string };
    location?: { ru: string; en: string };
  };
  buttons?: HeroSlideButton[];
  is_active: boolean;
  order: number;
  status: 'published' | 'draft';
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
 * Build URL search params from pagination/filter params
 */
const buildParams = (params?: PaginationParams): string => {
  if (!params) return '';
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.per_page) searchParams.append('per_page', params.per_page.toString());
  if (params.search) searchParams.append('search', params.search);
  if (params.sort_by) searchParams.append('sort_by', params.sort_by);
  if (params.sort_order) searchParams.append('sort_order', params.sort_order);

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
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
   * Get all events with optional filtering, search, and pagination
   */
  getAll: async (options?: { date?: string; tags?: string } & PaginationParams): Promise<PaginatedResponse<EventData>> => {
    let url = `${API_BASE_URL}/events`;
    const params = new URLSearchParams();

    if (options?.date) params.append('date', options.date);
    if (options?.tags) params.append('tags', options.tags);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },

  /**
   * Get specific event by ID
   */
  getById: async (id: number): Promise<EventData> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== NEWS =====
export const newsAPI = {
  /**
   * Get all news with optional filtering, search, and pagination
   */
  getAll: async (options?: { type?: 'news' | 'article' } & PaginationParams): Promise<PaginatedResponse<NewsData>> => {
    let url = `${API_BASE_URL}/news`;
    const params = new URLSearchParams();

    if (options?.type) params.append('type', options.type);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },

  /**
   * Get specific news by ID
   */
  getById: async (id: number): Promise<NewsData> => {
    const response = await fetch(`${API_BASE_URL}/news/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== HOTELS =====
export const hotelsAPI = {
  /**
   * Get all hotels with optional filtering, search, and pagination
   */
  getAll: async (options?: { category?: string } & PaginationParams): Promise<PaginatedResponse<HotelData>> => {
    let url = `${API_BASE_URL}/hotels`;
    const params = new URLSearchParams();

    if (options?.category) params.append('category', options.category);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },

  /**
   * Get specific hotel by ID
   */
  getById: async (id: number): Promise<HotelData> => {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== COMMITTEE MEMBERS =====
export const committeeMembersAPI = {
  /**
   * Get all committee members with optional search and pagination
   */
  getAll: async (options?: PaginationParams): Promise<PaginatedResponse<CommitteeMemberData>> => {
    let url = `${API_BASE_URL}/committee-members`;
    const params = new URLSearchParams();

    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },

  /**
   * Get specific committee member by ID
   */
  getById: async (id: number): Promise<CommitteeMemberData> => {
    const response = await fetch(`${API_BASE_URL}/committee-members/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== PARTNER PACKAGES =====
export const partnerPackagesAPI = {
  /**
   * Get all partner packages with optional filtering, search, and pagination
   */
  getAll: async (options?: { category?: string } & PaginationParams): Promise<PaginatedResponse<PartnerPackageData>> => {
    let url = `${API_BASE_URL}/partner-packages`;
    const params = new URLSearchParams();

    if (options?.category) params.append('category', options.category);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },

  /**
   * Get specific package by ID
   */
  getById: async (id: number): Promise<PartnerPackageData> => {
    const response = await fetch(`${API_BASE_URL}/partner-packages/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== COMPETITIONS =====
export const competitionsAPI = {
  /**
   * Get all competitions with optional search and pagination
   */
  getAll: async (options?: PaginationParams): Promise<PaginatedResponse<CompetitionData>> => {
    let url = `${API_BASE_URL}/competitions`;
    const params = new URLSearchParams();

    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },

  /**
   * Get specific competition by ID (includes FAQ)
   */
  getById: async (id: number): Promise<CompetitionData & { faqItems?: CompetitionFaqData[] }> => {
    const response = await fetch(`${API_BASE_URL}/competitions/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },

  /**
   * Get FAQ for a specific competition
   */
  getFaq: async (id: number, options?: PaginationParams): Promise<PaginatedResponse<CompetitionFaqData>> => {
    let url = `${API_BASE_URL}/competitions/${id}/faq`;
    const params = new URLSearchParams();

    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },
};

// ===== AWARDS =====
export const awardsAPI = {
  /**
   * Get all awards with optional filtering, search, and pagination
   */
  getAll: async (options?: { year?: string } & PaginationParams): Promise<PaginatedResponse<AwardData>> => {
    let url = `${API_BASE_URL}/awards`;
    const params = new URLSearchParams();

    if (options?.year) params.append('year', options.year);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },

  /**
   * Get specific award by ID
   */
  getById: async (id: number): Promise<AwardData> => {
    const response = await fetch(`${API_BASE_URL}/awards/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== PARTNERS =====
export const partnersAPI = {
  /**
   * Get all partners with optional search and pagination
   */
  getAll: async (options?: PaginationParams): Promise<PaginatedResponse<PartnerData>> => {
    let url = `${API_BASE_URL}/partners`;
    const params = new URLSearchParams();

    if (options?.page) params.append('page', options.page.toString());
    if (options?.per_page) params.append('per_page', options.per_page.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sort_by) params.append('sort_by', options.sort_by);
    if (options?.sort_order) params.append('sort_order', options.sort_order);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await parseResponse(response);
    return data;
  },

  /**
   * Get specific partner by ID
   */
  getById: async (id: number): Promise<PartnerData> => {
    const response = await fetch(`${API_BASE_URL}/partners/${id}`);
    const data = await parseResponse(response);
    return data.data;
  },
};

// ===== HERO SLIDES =====
export const heroSlideAPI = {
  /**
   * Get all published hero slides sorted by order
   */
  getAll: async (): Promise<{ data: HeroSlideData[] }> => {
    const response = await fetch(`${API_BASE_URL}/hero-slides`);
    const data = await parseResponse(response);
    return data;
  },
};
