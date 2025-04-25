// Customer (Nasabah)
export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
  idNumber?: string;
  totalWaste: number;
  totalReward: number;
  joinDate: string;
  status: 'active' | 'inactive';
  notes?: string;
}

export interface CustomerResponse {
  customer: Customer;
}

export interface CustomerListResponse {
  customers: Customer[];
  totalCount: number;
  page: number;
  limit: number;
}

// Customer Request Interfaces
export interface CreateCustomerRequest {
  name: string;
  phone: string;
  address: string;
  email?: string;
  idNumber?: string;
  joinDate: string;
  status: 'active' | 'inactive';
  notes?: string;
}

export interface UpdateCustomerRequest {
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  idNumber?: string;
  joinDate?: string;
  status?: 'active' | 'inactive';
  notes?: string;
}

export interface CustomerFilterOptions {
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  rewardSort?: 'highest' | 'lowest' | 'all';
  wasteSort?: 'highest' | 'lowest' | 'all';
  joinDateFrom?: string;
  joinDateTo?: string;
}