// hooks/transaction/index.ts - Custom React Query hooks for transaction management

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import api from '@/lib/axios';

// import { API_BASE_URL } from '@/lib/constant/env';

import { ApiResponse } from '@/lib/types/api';
import {
  TransactionResponse,
  TransactionListResponse,
  TransactionFilterOptions,
  CreateTransactionRequest,
  TransactionStatus
} from '@/lib/types/entities/transaction';
import { Customer } from '@/lib/types/entities/customer';

// Import dummy data for development
import {
  dummyTransactionListResponse,
  getTransactionResponse,
  dummyCustomers,
  dummyWastePartnerListResponse
} from '@/lib/constant/dummy';
import { API_BASE_URL } from '@/lib/constant/env';

/**
 * Hook to fetch transactions with filters
 */
export const useTransactions = (
  filters: TransactionFilterOptions = {},
  page: number = 1,
  limit: number = 10,
  options = {}
) => {
  return useQuery<TransactionListResponse>({
    queryKey: ['transactions', filters, page, limit],
    queryFn: async () => {
      // Build query parameters
      const params = new URLSearchParams();
      
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      if (filters.search) params.append('search', filters.search);
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);
      if (filters.status && filters.status !== ('all' as TransactionStatus)) params.append('status', filters.status);
      if (filters.nasabah_id) params.append('nasabah_id', filters.nasabah_id);
      
      const response = await api.get<ApiResponse<TransactionListResponse>>(
        `${API_BASE_URL}/transactions?${params.toString()}`
      );
      return response.data.data;
    },    // Use our dummy data for development
    initialData: dummyTransactionListResponse,
    ...options
  });
};

/**
 * Hook to fetch a single transaction by ID
 */
export const useTransaction = (transactionId: string, options = {}) => {
  return useQuery<TransactionResponse>({
    queryKey: ['transaction', transactionId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<TransactionResponse>>(
        `${API_BASE_URL}/transactions/${transactionId}`
      );
      return response.data.data;
    },
    enabled: !!transactionId,
    // Use our dummy data for development
    initialData: transactionId ? getTransactionResponse(transactionId) as TransactionResponse : undefined,
    ...options
  });
};
/**
 * Hook for creating a new transaction
 */
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateTransactionRequest) => {
      const response = await api.post<ApiResponse<TransactionResponse>>(
        `${API_BASE_URL}/transactions`,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Transaksi berhasil ditambahkan!');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error) => {
      toast.error('Gagal menambahkan transaksi');
      console.error('Error creating transaction:', error);
    },
  });
};

/**
 * Hook for deleting a transaction
 */
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete<ApiResponse<null>>(
        `${API_BASE_URL}/transactions/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Transaksi berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error) => {
      toast.error('Gagal menghapus transaksi');
      console.error('Error deleting transaction:', error);
    },
  });
};

/**
 * Hook to fetch customers for transaction forms
 */
export const useCustomersForTransaction = (searchQuery: string = '', options = {}) => {
  return useQuery<Customer[]>({
    queryKey: ['customers', 'transaction', searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await api.get<ApiResponse<Customer[]>>(
        `${API_BASE_URL}/customers/search?${params.toString()}`
      );
      return response.data.data;
    },
    // Use our dummy data for development with simple filtering
    initialData: searchQuery ? 
      dummyCustomers.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.phone.includes(searchQuery)
      ) : 
      dummyCustomers,
    ...options
  });
};

/**
 * Hook to fetch waste partners for transaction forms
 */
export const useWastePartnersForTransaction = (partnerId: number, options = {}) => {
  return useQuery({
    queryKey: ['wastePartners', 'transaction', partnerId],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await api.get<ApiResponse<any>>(
        `${API_BASE_URL}/waste-partners/by-partner/${partnerId}`
      );
      return response.data.data;
    },
    enabled: !!partnerId,
    // Use our dummy data for development
    initialData: dummyWastePartnerListResponse,
    ...options
  });
};