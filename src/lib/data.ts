/**
 * @file This file acts as a data access layer.
 * For now, it uses a simple switch to toggle between mock data and a (future) real database.
 * This allows for easy local testing and a clear path to production data.
 */

import { getMockArticles, getMockMarkets, getMockOrgMembers } from './mock-data';
import type { Article, Market, OrgMember } from './types';

// This is our feature flag. Set the `USE_MOCK_DATA` environment variable to 'true' to use local mock data.
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

export async function getMarkets(): Promise<Market[]> {
  if (USE_MOCK_DATA) {
    return getMockMarkets();
  }
  // TODO: Implement real database query
  console.log("Fetching markets from database...");
  return [];
}

export async function getOrgMembers(orgId: string): Promise<OrgMember[]> {
    if (USE_MOCK_DATA) {
        return getMockOrgMembers();
    }
    // TODO: Implement real database query
    console.log(`Fetching org members for ${orgId} from database...`);
    return [];
}


export async function getArticles(sellerId: number): Promise<Article[]> {
  if (USE_MOCK_DATA) {
    return getMockArticles();
  }
  // TODO: Implement real database query
  console.log(`Fetching articles for seller ${sellerId} from database...`);
  return [];
}

// Add more data fetching functions here as needed
// e.g., getMarketById, getUserProfile, etc.
