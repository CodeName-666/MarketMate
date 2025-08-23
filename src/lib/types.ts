/**
 * @file Centralized type definitions for the application's data models.
 */

export interface Market {
  id: number;
  name: string;
  date: string;
  status: 'Active' | 'Planning' | 'Closed';
  articleLimit: number;
  sellerFee: number;
  maxSellerNumbers: number;
  maxSellerNumbersPerUser: number;
  allowHelperRegistration: boolean;
  isPublic: boolean;
}

export interface OrgMember {
    id: string;
    name: string;
    email: string;
    role: 'Owner' | 'Admin';
}

export interface Article {
  id: number;
  description: string;
  price: number;
}
