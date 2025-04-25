import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { API_BASE_URL } from '@/lib/constant/env';
import { 
  Partner, 
  PartnerListResponse, 
  PartnerResponse,
  PartnerFilterOptions,
  CreatePartnerRequest,
  UpdatePartnerRequest,
  PartnerUser,
  PartnerUserListResponse,
  CreatePartnerUserRequest
} from '@/lib/types/entities/partner';
import { ApiResponse } from '@/lib/types/api';
import { useToast } from '@/lib/hooks/use-toast';

// Hook to fetch all partners with filters
export const usePartners = (
  filters: PartnerFilterOptions = {},
  page: number = 1,
  limit: number = 10
) => {
  return useQuery<PartnerListResponse>({
    queryKey: ['partners', filters, page, limit],
    queryFn: async () => {
      // Prepare query parameters
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.type && filters.type !== 'all') params.append('type', filters.type);
      if (filters.location) params.append('location', filters.location);
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await api.get<ApiResponse<PartnerListResponse>>(
        `${API_BASE_URL}/partners?${params.toString()}`
      );
      return response.data.data;
    },
    // For simplicity, we'll use dummy data in development
    initialData: {
      partners: [
        {
          id: 1,
          slug: 'tps-warga',
          display_name: 'TPS Warga Kelurahan A',
          location: 'Jakarta Selatan',
          type: 'tps',
          capacity: '500kg/hari',
          description: 'TPS untuk warga Kelurahan A'
        },
        {
          id: 2,
          slug: 'tps-sekolah',
          display_name: 'TPS SDN 01',
          location: 'Jakarta Pusat',
          type: 'school',
          capacity: '200kg/hari',
          description: 'TPS untuk SDN 01'
        },
        {
          id: 3,
          slug: 'tps-perusahaan',
          display_name: 'TPS PT ABC',
          location: 'Jakarta Barat',
          type: 'company',
          capacity: '1000kg/hari',
          description: 'TPS untuk PT ABC'
        },
        {
          id: 4,
          slug: 'tps-komunitas',
          display_name: 'TPS Komunitas Hijau',
          location: 'Jakarta Utara',
          type: 'community',
          capacity: '300kg/hari',
          description: 'TPS untuk Komunitas Hijau'
        }
      ],
      totalCount: 4,
      page: 1,
      limit: 10
    }
  });
};

// Hook to fetch single partner by ID
export const usePartner = (id: number) => {
  return useQuery<Partner>({
    queryKey: ['partner', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PartnerResponse>>(
        `${API_BASE_URL}/partners/${id}`
      );
      return response.data.data.partner;
    },
    enabled: !!id,
  });
};

// Hook for creating a new partner
export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (partnerData: CreatePartnerRequest) => {
      const response = await api.post<ApiResponse<PartnerResponse>>(
        `${API_BASE_URL}/partners`,
        partnerData
      );
      return response.data.data.partner;
    },
    onSuccess: () => {
      toast({
        title: 'Berhasil',
        description: 'Data TPS berhasil ditambahkan',
      });
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
    onError: (error) => {
      toast({
        title: 'Gagal',
        description: 'Gagal menambahkan data TPS. Silakan coba lagi.',
        variant: 'destructive',
      });
      console.error('Error creating partner:', error);
    },
  });
};

// Hook for updating a partner
export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdatePartnerRequest }) => {
      const response = await api.put<ApiResponse<PartnerResponse>>(
        `${API_BASE_URL}/partners/${id}`,
        data
      );
      return response.data.data.partner;
    },
    onSuccess: (_, variables) => {
      toast({
        title: 'Berhasil',
        description: 'Data TPS berhasil diperbarui',
      });
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      queryClient.invalidateQueries({ queryKey: ['partner', variables.id] });
    },
    onError: (error) => {
      toast({
        title: 'Gagal',
        description: 'Gagal memperbarui data TPS. Silakan coba lagi.',
        variant: 'destructive',
      });
      console.error('Error updating partner:', error);
    },
  });
};

// Hook for deleting a partner
export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete<ApiResponse<null>>(
        `${API_BASE_URL}/partners/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: 'Berhasil',
        description: 'Data TPS berhasil dihapus',
      });
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
    onError: (error) => {
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus data TPS. Silakan coba lagi.',
        variant: 'destructive',
      });
      console.error('Error deleting partner:', error);
    },
  });
};

// Hook to fetch users of a partner (petugas TPS)
export const usePartnerUsers = (partnerId: number, page: number = 1, limit: number = 10) => {
  return useQuery<PartnerUserListResponse>({
    queryKey: ['partnerUsers', partnerId, page, limit],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PartnerUserListResponse>>(
        `${API_BASE_URL}/partners/${partnerId}/users?page=${page}&limit=${limit}`
      );
      return response.data.data;
    },
    enabled: !!partnerId,
    // Mock data for development
    initialData: {
      users: [
        {
          id: 1,
          partner_id: partnerId,
          username: 'petugas1',
          name: 'Petugas TPS 1',
          email: 'petugas1@example.com',
          phone: '081234567890'
        },
        {
          id: 2,
          partner_id: partnerId,
          username: 'petugas2',
          name: 'Petugas TPS 2',
          email: 'petugas2@example.com',
          phone: '081234567891'
        }
      ],
      totalCount: 2,
      page: 1,
      limit: 10
    }
  });
};

// Hook for adding a user to a partner (petugas TPS)
export const useCreatePartnerUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userData: CreatePartnerUserRequest) => {
      const response = await api.post<ApiResponse<PartnerUser>>(
        `${API_BASE_URL}/partners/${userData.partner_id}/users`,
        userData
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      toast({
        title: 'Berhasil',
        description: 'Petugas TPS berhasil ditambahkan',
      });
      queryClient.invalidateQueries({ queryKey: ['partnerUsers', variables.partner_id] });
    },
    onError: (error) => {
      toast({
        title: 'Gagal',
        description: 'Gagal menambahkan Petugas TPS. Silakan coba lagi.',
        variant: 'destructive',
      });
      console.error('Error creating partner user:', error);
    },
  });
};

// Hook for deleting a user from a partner
export const useDeletePartnerUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ partnerId, userId }: { partnerId: number; userId: number }) => {
      const response = await api.delete<ApiResponse<null>>(
        `${API_BASE_URL}/partners/${partnerId}/users/${userId}`
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast({
        title: 'Berhasil',
        description: 'Petugas TPS berhasil dihapus',
      });
      queryClient.invalidateQueries({ queryKey: ['partnerUsers', variables.partnerId] });
    },
    onError: (error) => {
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus Petugas TPS. Silakan coba lagi.',
        variant: 'destructive',
      });
      console.error('Error deleting partner user:', error);
    },
  });
};