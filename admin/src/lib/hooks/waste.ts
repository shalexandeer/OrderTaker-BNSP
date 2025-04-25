/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/waste/index.ts - Custom React Query hooks for waste management

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import api from '@/lib/axios';


import { ApiResponse } from '@/lib/types/api';
import { 
  WasteCategory, 
  Waste, 
  Partner, 
  CreateWasteRequest,
  CreateWastePartnerRequest,
  UpdateWastePartnerRequest,
  WasteCategoryResponse,
  WasteResponse,
  WasteListResponse,
  WastePartnerListResponse,
  WastePartnerResponse
} from '@/lib/types/entities/waste';

// Import dummy data for development
import {
  dummyWasteCategoryResponse,
  dummyWasteListResponse,
  dummyWastePartnerListResponse,
  dummyPartners,
  getWasteResponse,
  getWastePartnerResponse
} from '@/lib/constant/dummy';
import { API_BASE_URL } from '../constant/env';

/**
 * Hook to fetch waste categories
 */
export const useWasteCategories = (options = {}) => {
  return useQuery<WasteCategory[]>({
    queryKey: ['wasteCategories'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<WasteCategoryResponse>>(
        `${API_BASE_URL}/waste-categories`
      );
      return response.data.data.categories;
    },
    // Use our dummy data for development
    initialData: dummyWasteCategoryResponse.categories,
    ...options
  });
};

/**
 * Hook to fetch approved wastes
 */
export const useApprovedWastes = (options = {}) => {
  return useQuery<Waste[]>({
    queryKey: ['wastes', 'approved'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<WasteListResponse>>(
        `${API_BASE_URL}/wastes/approved`
      );
      return response.data.data.wastes;
    },
    // Use our dummy data for development
    initialData: dummyWasteListResponse.wastes.filter((w: { isAccepted: any; status: string; }) => w.isAccepted && w.status === 'active'),
    ...options
  });
};

/**
 * Hook to fetch all wastes including pending ones
 */
export const useAllWastes = (options = {}) => {
  return useQuery<Waste[]>({
    queryKey: ['wastes', 'all'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<WasteListResponse>>(
        `${API_BASE_URL}/wastes/all`
      );
      return response.data.data.wastes;
    },
    // Use our dummy data for development
    initialData: dummyWasteListResponse.wastes,
    ...options
  });
};

/**
 * Hook to fetch a single waste by ID
 */
export const useWaste = (wasteId: number | string, options = {}) => {
  return useQuery<Waste>({
    queryKey: ['waste', wasteId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<WasteResponse>>(
        `${API_BASE_URL}/wastes/${wasteId}`
      );
      return response.data.data.waste;
    },
    enabled: !!wasteId,
    // Use our dummy data for development
    initialData: wasteId ? getWasteResponse(Number(wasteId))?.waste : undefined,
    ...options
  });
};

/**
 * Hook for proposing a new waste
 */
export const useProposeWaste = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateWasteRequest) => {
      const response = await api.post<ApiResponse<WasteResponse>>(
        `${API_BASE_URL}/wastes/propose`,
        data
      );
      return response.data.data.waste;
    },
    onSuccess: () => {
      toast.success('Permintaan penambahan jenis sampah baru telah dikirim untuk persetujuan admin!');
      queryClient.invalidateQueries({ queryKey: ['wastes'] });
    },
    onError: (error) => {
      toast.error('Gagal mengajukan jenis sampah baru');
      console.error('Error proposing new waste:', error);
    },
  });
};

/**
 * Hook to fetch the current partner (TPS)
 */
export const useCurrentPartner = (options = {}) => {
  return useQuery<Partner>({
    queryKey: ['currentPartner'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Partner>>(
        `${API_BASE_URL}/partners/current`
      );
      return response.data.data;
    },
    // Use our dummy data for development
    initialData: dummyPartners[0],
    ...options
  });
};

/**
 * Hook to fetch waste partners by partner ID with pagination and filters
 */
export const useWastePartners = (
  partnerId?: number,
  page: number = 1,
  limit: number = 20,
  search: string = '',
  categoryId?: number,
  options = {}
) => {
  return useQuery<WastePartnerListResponse>({
    queryKey: ['wastePartners', partnerId, page, limit, search, categoryId],
    queryFn: async () => {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      if (search) params.append('search', search);
      if (categoryId) params.append('categoryId', categoryId.toString());
      
      const response = await api.get<ApiResponse<WastePartnerListResponse>>(
        `${API_BASE_URL}/waste-partners/by-partner/${partnerId}?${params.toString()}`
      );
      return response.data.data;
    },
    enabled: !!partnerId,
    // Filter dummy data based on parameters
    initialData: (() => {
      if (!partnerId) return undefined;
      
      // Clone the response to avoid modifying the original
      const response = JSON.parse(JSON.stringify(dummyWastePartnerListResponse));
      
      // Filter by partner ID
      response.wastePartners = response.wastePartners.filter((wp: { partner_id: number; }) => wp.partner_id === partnerId);
      
      // Filter by category if needed
      if (categoryId) {
        const wasteIdsInCategory = dummyWasteListResponse.wastes
          .filter(w => w.categoryId === categoryId)
          .map(w => w.id);
        
        response.wastePartners = response.wastePartners.filter((wp: { waste_id: number; }) => 
          wasteIdsInCategory.includes(wp.waste_id)
        );
        
        response.wastesDetails = response.wastesDetails.filter((w: { id: number; }) => 
          wasteIdsInCategory.includes(w.id)
        );
      }
      
      // Filter by search if needed
      if (search) {
        const searchLower = search.toLowerCase();
        
        const matchingWasteIds = response.wastesDetails
          .filter((w: { name: string; description: string; categoryName: string; }) => 
            w.name.toLowerCase().includes(searchLower) ||
            w.description.toLowerCase().includes(searchLower) ||
            w.categoryName.toLowerCase().includes(searchLower)
          )
          .map((w: { id: any; }) => w.id);
        
        response.wastePartners = response.wastePartners.filter((wp: { waste_id: string; additional_attribute: Record<string, any>; }) => 
          matchingWasteIds.includes(wp.waste_id) ||
          JSON.stringify(wp.additional_attribute).toLowerCase().includes(searchLower)
        );
        
        response.wastesDetails = response.wastesDetails.filter((w: { id: any; }) => 
          matchingWasteIds.includes(w.id)
        );
      }
      
      // Update count and apply pagination
      response.totalCount = response.wastePartners.length;
      
      // Apply pagination
      const startIndex = (page - 1) * limit;
      response.wastePartners = response.wastePartners.slice(startIndex, startIndex + limit);
      
      return response;
    })(),
    ...options
  });
};

/**
 * Hook to fetch a single waste partner by ID
 */
export const useWastePartner = (wastePartnerId: number | string, options = {}) => {
  return useQuery<WastePartnerResponse>({
    queryKey: ['wastePartner', wastePartnerId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<WastePartnerResponse>>(
        `${API_BASE_URL}/waste-partners/${wastePartnerId}`
      );
      return response.data.data;
    },
    enabled: !!wastePartnerId,
    // Use our dummy data for development
    initialData: wastePartnerId ? getWastePartnerResponse(Number(wastePartnerId)) as WastePartnerResponse : undefined,
    ...options
  });
};
/**
 * Hook for creating a new waste partner
 */
export const useCreateWastePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateWastePartnerRequest) => {
      const response = await api.post<ApiResponse<WastePartnerResponse>>(
        `${API_BASE_URL}/waste-partners`,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Sampah berhasil ditambahkan ke TPS Anda!');
      queryClient.invalidateQueries({ queryKey: ['wastePartners'] });
    },
    onError: (error) => {
      toast.error('Gagal menambahkan sampah ke TPS');
      console.error('Error adding waste partner:', error);
    },
  });
};

/**
 * Hook for updating a waste partner
 */
export const useUpdateWastePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number, data: UpdateWastePartnerRequest }) => {
      const response = await api.put<ApiResponse<WastePartnerResponse>>(
        `${API_BASE_URL}/waste-partners/${id}`,
        data
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      toast.success('Data sampah berhasil diperbarui');
      queryClient.invalidateQueries({ queryKey: ['wastePartners'] });
      queryClient.invalidateQueries({ queryKey: ['wastePartner', data.wastePartner.id] });
    },
    onError: (error) => {
      toast.error('Gagal memperbarui data sampah');
      console.error('Error updating waste partner:', error);
    },
  });
};

/**
 * Hook for deleting a waste partner
 */
export const useDeleteWastePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete<ApiResponse<null>>(
        `${API_BASE_URL}/waste-partners/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Data sampah berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: ['wastePartners'] });
    },
    onError: (error) => {
      toast.error('Gagal menghapus data sampah');
      console.error('Error deleting waste partner:', error);
    },
  });
}