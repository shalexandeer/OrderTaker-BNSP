// Type definitions for transaction management module

// Transaction types
export type TransactionType = 'cash' | 'transfer' | 'qris';
export type TransactionStatus = 'success' | 'pending' | 'canceled';

// Transaction interface
export interface Transaction {
  id: string;
  tps_id: string;
  type: TransactionType;
  nasabah_id?: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  notes?: string;
  items: TransactionItem[];
  customerName?: string; // Added for convenience, not stored in DB
  tpsName?: string; // Added for convenience, not stored in DB
}

// Transaction items for transaction with detail breakdown
export interface TransactionItem {
  id: string;
  transaction_id: string;
  waste_partner_id: number;
  weight: number;
  price_per_kg: number;
  amount: number;
  wasteName?: string; // For convenience in display
  wasteCategory?: string; // For convenience in display
}

// API Response Types
export interface TransactionResponse {
  transaction: Transaction;
  items: TransactionItem[];
  customerName?: string;
  tpsName: string;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  totalCount: number;
  page: number;
  limit: number;
}

// Request interfaces for creating transactions
export interface CreateTransactionRequest {
  nasabah_id?: string;
  tps_id: string;
  type: TransactionType;
  date: string;
  notes?: string;
  items: {
    waste_partner_id: number;
    weight: number;
  }[];
}

// Form values
export interface TransactionFormValues {
  nasabah_id?: string;
  waste_partner_id: string;
  weight: string;
  date: string;
  notes?: string;
  payment_type: TransactionType;
}

// Filter options
export interface TransactionFilterOptions {
  search?: string;
  date_from?: string;
  date_to?: string;
  status?: TransactionStatus;
  nasabah_id?: string;
}

