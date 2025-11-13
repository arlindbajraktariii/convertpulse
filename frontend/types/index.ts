export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
}

export interface Site {
  _id: string;
  userId: string;
  name: string;
  domain: string;
  apiKey: string;
  isActive: boolean;
  createdAt: string;
}

export interface Stats {
  siteId: string;
  timeframe: string;
  summary: {
    pageviews: number;
    uniqueSessions: number;
    avgScrollDepth: number;
    avgTimeOnPage: number;
    totalEvents: number;
  };
  scrollDistribution: {
    '0-25%': number;
    '25-50%': number;
    '50-75%': number;
    '75-100%': number;
  };
  topClicks: Array<{
    element: string;
    count: number;
  }>;
  dropoffSections: Array<{
    section: string;
    views: number;
  }>;
  dailyBreakdown: Array<{
    date: string;
    pageviews: number;
    clicks: number;
    avgScrollDepth: number;
  }>;
}
