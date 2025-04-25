// Partner (TPS) types
export type PartnerType = 'tps' | 'school' | 'company' | 'community';

export interface Partner {
  id: number;
  slug: string;
  display_name: string;
  location: string;
  type: PartnerType;
  capacity: string;
  description: string;
}

// Partner API Response Types
export interface PartnerResponse {
  partner: Partner;
}

export interface PartnerListResponse {
  partners: Partner[];
  totalCount: number;
  page: number;
  limit: number;
}

// Partner Request Interfaces
export interface CreatePartnerRequest {
  display_name: string;
  location: string;
  type: PartnerType;
  capacity: string;
  description: string;
  slug?: string; // Optional, can be auto-generated
}

export interface UpdatePartnerRequest {
  display_name?: string;
  location?: string;
  type?: PartnerType;
  capacity?: string;
  description?: string;
}

export interface PartnerFilterOptions {
  search?: string;
  type?: PartnerType | 'all';
  location?: string;
}

// Response for partner users (petugas TPS)
export interface PartnerUser {
  id: number;
  partner_id: number;
  username: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface PartnerUserListResponse {
  users: PartnerUser[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface CreatePartnerUserRequest {
  partner_id: number;
  username: string;
  name: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface UpdatePartnerUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}