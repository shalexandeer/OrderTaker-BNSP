// hooks/record/index.ts - Custom React Query hooks for record management

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import api from '@/lib/axios';

import { API_BASE_URL } from '@/lib/constant/env';

import { ApiResponse } from '@/lib/types/api';
import {
  RecordResponse,
  RecordListResponse,
  RecordFilterOptions,
  CreateRecordRequest,
  UpdateRecordRequest,
  determineRecordType,
  convertTypeToFlags
} from '@/lib/types/entities/record';

// Import dummy data for development
import {
  dummyRecordListResponse,
  getRecordResponse
} from '@/lib/constant/dummy';

/**
 * Hook to fetch records with filters
 */
export const useRecords = (
  filters: RecordFilterOptions = {},
  page: number = 1,
  limit: number = 10,
  options = {}
) => {
  return useQuery<RecordListResponse>({
    queryKey: ['records', filters, page, limit],
    queryFn: async () => {
      // Build query parameters
      const params = new URLSearchParams();
      
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      if (filters.search) params.append('search', filters.search);
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);
      
      if (filters.status && filters.status !== 'all') {
        params.append('status', filters.status);
      }
      
      // Convert type to is_sell and is_process flags
      if (filters.type && filters.type !== 'all') {
        const flags = convertTypeToFlags(filters.type);
        params.append('is_sell', flags.is_sell.toString());
        params.append('is_process', flags.is_process.toString());
      }
      
      if (filters.partner_id) {
        params.append('partner_id', filters.partner_id.toString());
      }
      
      if (filters.waste_partner_id) {
        params.append('waste_partner_id', filters.waste_partner_id.toString());
      }
      
      const response = await api.get<ApiResponse<RecordListResponse>>(
        `${API_BASE_URL}/records?${params.toString()}`
      );
      
      // Add the type field to each record based on is_sell and is_process
      const recordsWithType = response.data.data.records.map(record => ({
        ...record,
        type: determineRecordType(record)
      }));
      
      return {
        ...response.data.data,
        records: recordsWithType
      };
    },
    // Use our dummy data for development
    initialData: (() => {
      // Filter dummy records based on provided filters
      let filteredRecords = [...dummyRecordListResponse.records];
      
      if (filters.type && filters.type !== 'all') {
        filteredRecords = filteredRecords.filter(record => record.type === filters.type);
      }
      
      if (filters.status && filters.status !== 'all') {
        filteredRecords = filteredRecords.filter(record => record.status === filters.status);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredRecords = filteredRecords.filter(record => 
          record.id.toLowerCase().includes(searchLower) ||
          record.items.some((item: { waste_partner_id: { toString: () => string | string[]; }; unit: string; }) => 
            item.waste_partner_id.toString().includes(searchLower) ||
            item.unit.toLowerCase().includes(searchLower)
          )
        );
      }
      
      if (filters.date_from) {
        const fromDate = new Date(filters.date_from);
        filteredRecords = filteredRecords.filter(record => 
          new Date(record.datetime) >= fromDate
        );
      }
      
      if (filters.date_to) {
        const toDate = new Date(filters.date_to);
        toDate.setHours(23, 59, 59, 999); // End of day
        filteredRecords = filteredRecords.filter(record => 
          new Date(record.datetime) <= toDate
        );
      }
      
      if (filters.partner_id) {
        filteredRecords = filteredRecords.filter(record => 
          record.partner_id === filters.partner_id
        );
      }
      
      if (filters.waste_partner_id) {
        filteredRecords = filteredRecords.filter(record => 
          record.items.some((item: { waste_partner_id: number | undefined; }) => item.waste_partner_id === filters.waste_partner_id)
        );
      }
      
      // Apply pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedRecords = filteredRecords.slice(start, end);
      
      return {
        records: paginatedRecords,
        totalCount: filteredRecords.length,
        page,
        limit
      };
    })(),
    ...options
  });
};

/**
 * Hook to fetch different record types (incoming, outgoing, processed)
 */
export const useRecordsByType = (
  type: 'incoming' | 'outgoing' | 'processed',
  page: number = 1,
  limit: number = 10,
  options = {}
) => {
  const filters: RecordFilterOptions = { type };
  return useRecords(filters, page, limit, options);
};

/**
 * Hook to fetch a single record by ID
 */
export const useRecord = (recordId: string, options = {}) => {
  return useQuery<RecordResponse>({
    queryKey: ['record', recordId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<RecordResponse>>(
        `${API_BASE_URL}/records/${recordId}`
      );
      
      // Add the type field based on is_sell and is_process
      const recordWithType = {
        ...response.data.data,
        record: {
          ...response.data.data.record,
          type: determineRecordType(response.data.data.record)
        }
      };
      
      return recordWithType;
    },
    enabled: !!recordId,
    // Use our dummy data for development
    initialData: recordId ? getRecordResponse(recordId) as RecordResponse : undefined,
    ...options
  });
};
/**
 * Hook for creating a new incoming record
 */
export const useCreateIncomingRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<CreateRecordRequest, 'is_sell' | 'is_process'>) => {
      const recordData = {
        ...data,
        is_sell: false,
        is_process: false
      };
      
      const response = await api.post<ApiResponse<RecordResponse>>(
        `${API_BASE_URL}/records`,
        recordData
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Pencatatan masuk berhasil ditambahkan!');
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
    onError: (error) => {
      toast.error('Gagal menambahkan pencatatan masuk');
      console.error('Error creating incoming record:', error);
    },
  });
};

/**
 * Hook for creating a new outgoing record
 */
export const useCreateOutgoingRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<CreateRecordRequest, 'is_sell' | 'is_process'> & { selling_price: number }) => {
      const recordData = {
        ...data,
        is_sell: true,
        is_process: false
      };
      
      const response = await api.post<ApiResponse<RecordResponse>>(
        `${API_BASE_URL}/records`,
        recordData
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Pencatatan keluar berhasil ditambahkan!');
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
    onError: (error) => {
      toast.error('Gagal menambahkan pencatatan keluar');
      console.error('Error creating outgoing record:', error);
    },
  });
};

/**
 * Hook for creating a new processed record
 */
export const useCreateProcessedRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<CreateRecordRequest, 'is_sell' | 'is_process'>) => {
      const recordData = {
        ...data,
        is_sell: false,
        is_process: true
      };
      
      const response = await api.post<ApiResponse<RecordResponse>>(
        `${API_BASE_URL}/records`,
        recordData
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Pencatatan proses berhasil ditambahkan!');
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
    onError: (error) => {
      toast.error('Gagal menambahkan pencatatan proses');
      console.error('Error creating processed record:', error);
    },
  });
};

/**
 * Hook for updating a record
 */
export const useUpdateRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: UpdateRecordRequest }) => {
      const response = await api.put<ApiResponse<RecordResponse>>(
        `${API_BASE_URL}/records/${id}`,
        data
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      toast.success('Pencatatan berhasil diperbarui');
      queryClient.invalidateQueries({ queryKey: ['records'] });
      queryClient.invalidateQueries({ queryKey: ['record', data.record.id] });
    },
    onError: (error) => {
      toast.error('Gagal memperbarui pencatatan');
      console.error('Error updating record:', error);
    },
  });
};

/**
 * Hook for deleting a record
 */
export const useDeleteRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete<ApiResponse<null>>(
        `${API_BASE_URL}/records/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Pencatatan berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
    onError: (error) => {
      toast.error('Gagal menghapus pencatatan');
      console.error('Error deleting record:', error);
    },
  });
};