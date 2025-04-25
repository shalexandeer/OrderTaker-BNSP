// Record types
export type RecordStatus = 'received' | 'processed' | 'shipped' | 'canceled';
export type RecordType = 'incoming' | 'outgoing' | 'processed';

// Record
export interface Record {
  items: RecordItem[];
  id: string;
  partner_id: number;
  pic_id?: number; // Person in charge ID, optional
  total: number; // Total value
  datetime: string; // ISO date string
  status: RecordStatus;
  discount?: number;
  is_sell: boolean; // Indicates if it's an outgoing/selling record
  is_process: boolean; // Indicates if it's a processing record
  selling_price?: number; // Only applicable if is_sell is true
  processed_to?: string; // Reference to another record if processed
  source?: string; // Source if not from transaction
  transaction_id?: string; // Optional, may not be tied to a transaction
  notes?: string;
  // Computed field to match our existing type system
  type?: RecordType; // Will be derived from is_sell and is_process
}

// Record Item
export interface RecordItem {
  id: string;
  record_id: string;
  waste_partner_id: number;
  unit: string; // e.g., 'kg', 'liter'
  measure: number; // Amount in the specified unit
}

// Record with Items (for convenience)
export interface RecordWithItems extends Record {
  items: RecordItem[];
}

// Record API Response Types
export interface RecordResponse {
  record: RecordWithItems;
  wasteName: string;
  partnerName: string;
}

export interface RecordListResponse {
  records: RecordWithItems[];
  totalCount: number;
  page: number;
  limit: number;
}

// Record Request Interfaces
export interface CreateRecordItemRequest {
  waste_partner_id: number;
  unit: string;
  measure: number;
}

export interface CreateRecordRequest {
  partner_id: number;
  pic_id?: number;
  datetime: string;
  is_sell: boolean;
  is_process: boolean;
  selling_price?: number;
  discount?: number;
  transaction_id?: string;
  source?: string;
  notes?: string;
  items: CreateRecordItemRequest[];
}

export interface UpdateRecordRequest {
  status?: RecordStatus;
  processed_to?: string;
  notes?: string;
}

export interface RecordFilterOptions {
  search?: string;
  date_from?: string;
  date_to?: string;
  status?: RecordStatus | 'all';
  type?: RecordType | 'all'; // We'll convert this to is_sell/is_process internally
  partner_id?: number;
  waste_partner_id?: number;
}

// Helper function to determine record type
export function determineRecordType(record: Record): RecordType {
  if (record.is_process) return 'processed';
  return record.is_sell ? 'outgoing' : 'incoming';
}

// Helper function to convert record type to is_sell and is_process
export function convertTypeToFlags(type: RecordType): { is_sell: boolean, is_process: boolean } {
  switch (type) {
    case 'incoming':
      return { is_sell: false, is_process: false };
    case 'outgoing':
      return { is_sell: true, is_process: false };
    case 'processed':
      return { is_sell: false, is_process: true };
  }
}

