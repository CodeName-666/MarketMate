/**
 * @file Centralized mock data for the application.
 * This file contains sample data used for local development and testing.
 */

import type { Article, Market, OrgMember } from './types';

const initialMarkets: Market[] = [
    { 
      id: 1, 
      name: 'Summer Flea Market', 
      date: '2024-08-15', 
      status: 'Active', 
      articleLimit: 50,
      sellerFee: 10,
      maxSellerNumbers: 200,
      maxSellerNumbersPerUser: 2,
      allowHelperRegistration: true,
      isPublic: true,
    },
    { 
      id: 2, 
      name: 'Winter Wonderland Market', 
      date: '2024-12-05', 
      status: 'Planning', 
      articleLimit: 75,
      sellerFee: 15,
      maxSellerNumbers: 150,
      maxSellerNumbersPerUser: 1,
      allowHelperRegistration: false,
      isPublic: true,
    },
];

const orgMembers: OrgMember[] = [
    { id: 'user-1', name: 'Admin User', email: 'admin@marketmate.com', role: 'Owner' },
    { id: 'user-2', name: 'Jane Orga', email: 'jane.orga@marketmate.com', role: 'Admin' }
];

const initialArticles: Article[] = [
  { id: 1, description: "Vintage Denim Jacket", price: 45.00 },
  { id: 2, description: "Hand-painted Ceramic Mug", price: 18.50 },
  { id: 3, description: "Leather Bound Journal", price: 22.00 },
];


export const getMockMarkets = () => initialMarkets;
export const getMockOrgMembers = () => orgMembers;
export const getMockArticles = () => initialArticles;
