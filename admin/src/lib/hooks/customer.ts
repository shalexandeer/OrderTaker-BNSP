import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Customer, 
  CustomerResponse, 
  CustomerListResponse, 
  CustomerFilterOptions,
  CreateCustomerRequest,
  UpdateCustomerRequest
} from '@/lib/types/entities/customer';

// Fetch a list of customers with pagination and filtering
export const useCustomers = (
  page = 1, 
  limit = 10, 
  filters: CustomerFilterOptions = {}
) => {
  return useQuery<CustomerListResponse>({
    queryKey: ['customers', { page, limit, ...filters }],
    queryFn: async () => {
      // Convert filters to query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      // Add filter parameters if they exist
      if (filters.search) params.append('search', filters.search);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.rewardSort && filters.rewardSort !== 'all') params.append('rewardSort', filters.rewardSort);
      if (filters.wasteSort && filters.wasteSort !== 'all') params.append('wasteSort', filters.wasteSort);
      if (filters.joinDateFrom) params.append('joinDateFrom', filters.joinDateFrom);
      if (filters.joinDateTo) params.append('joinDateTo', filters.joinDateTo);
      
      // For development/testing without backend - replace with actual API call
      return getMockCustomers(page, limit, filters);
      
      // When backend is ready, use this:
      // const response = await api.get(`/customers?${params.toString()}`);
      // return response.data;
    },
  });
};

// Fetch a single customer by ID
export const useCustomerDetail = (id: string) => {
  return useQuery<CustomerResponse>({
    queryKey: ['customer', id],
    queryFn: async () => {
      // For development/testing without backend - replace with actual API call
      return getMockCustomerDetail(id);
      
      // When backend is ready, use this:
      // const response = await api.get(`/customers/${id}`);
      // return response.data;
    },
    enabled: !!id,
  });
};

// Delete a customer
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      // For development/testing without backend - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // When backend is ready, use this:
      // const response = await api.delete(`/customers/${id}`);
      // return response.data;
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

// Create a new customer
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateCustomerRequest) => {
      // For development/testing without backend - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // When backend is ready, use this:
      // const response = await api.post('/customers', data);
      // return response.data;
      
      return { 
        success: true,
        customer: {
          id: `CUST-${Math.floor(Math.random() * 10000)}`,
          ...data,
          totalWaste: 0,
          totalReward: 0
        }
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

// Update an existing customer
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id: _, 
      data: __ 
    }: { 
      id: string; 
      data: UpdateCustomerRequest 
    }) => {
      // For development/testing without backend - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // When backend is ready, use this:
      // const response = await api.put(`/customers/${id}`, data);
      // return response.data;
      
      return { success: true };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', variables.id] });
    },
  });
};

// Mock functions for development without backend
// These will be replaced by actual API calls when backend is ready

// Mock customer data
const mockCustomers: Customer[] = [
  {
    id: "CUST-1001",
    name: "Budi Hartono",
    phone: "081234567890",
    address: "Jl. Kebon Jeruk No. 15, Jakarta Barat",
    email: "budi@example.com",
    idNumber: "3175012345678901",
    totalWaste: 35.5,
    totalReward: 250000,
    joinDate: "2023-01-15",
    status: "active",
    notes: "Nasabah aktif dan rutin menyetorkan sampah"
  },
  {
    id: "CUST-1002",
    name: "Siti Rahayu",
    phone: "087812345678",
    address: "Jl. Merdeka No. 7, Bandung",
    email: "siti@example.com",
    totalWaste: 22.8,
    totalReward: 180000,
    joinDate: "2023-02-20",
    status: "active"
  },
  {
    id: "CUST-1003",
    name: "Ahmad Wijaya",
    phone: "081987654321",
    address: "Jl. Pahlawan No. 123, Surabaya",
    idNumber: "3578015678901234",
    totalWaste: 15.2,
    totalReward: 120000,
    joinDate: "2023-03-10",
    status: "inactive",
    notes: "Tidak aktif sejak April 2023"
  },
  {
    id: "CUST-1004",
    name: "Dewi Lestari",
    phone: "082345678901",
    address: "Jl. Sudirman No. 45, Jakarta Selatan",
    email: "dewi@example.com",
    totalWaste: 42.7,
    totalReward: 320000,
    joinDate: "2023-01-05",
    status: "active"
  },
  {
    id: "CUST-1005",
    name: "Rizki Pratama",
    phone: "089876543210",
    address: "Jl. Ahmad Yani No. 88, Semarang",
    email: "rizki@example.com",
    idNumber: "3374015678901234",
    totalWaste: 18.5,
    totalReward: 150000,
    joinDate: "2023-04-15",
    status: "active",
    notes: "Aktif dalam program daur ulang plastik"
  }
];

// Function to get mock customers with pagination and filtering
const getMockCustomers = (
  page: number, 
  limit: number, 
  filters: CustomerFilterOptions
): CustomerListResponse => {
  let filteredCustomers = [...mockCustomers];
  
  // Apply search filter
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filteredCustomers = filteredCustomers.filter(customer => 
      customer.name.toLowerCase().includes(search) ||
      customer.address.toLowerCase().includes(search) ||
      customer.phone.includes(search) ||
      (customer.email && customer.email.toLowerCase().includes(search))
    );
  }
  
  // Apply status filter
  if (filters.status && filters.status !== 'all') {
    filteredCustomers = filteredCustomers.filter(customer => 
      customer.status === filters.status
    );
  }
  
  // Apply reward sort
  if (filters.rewardSort) {
    if (filters.rewardSort === 'highest') {
      filteredCustomers.sort((a, b) => b.totalReward - a.totalReward);
    } else if (filters.rewardSort === 'lowest') {
      filteredCustomers.sort((a, b) => a.totalReward - b.totalReward);
    }
  }
  
  // Apply waste sort
  if (filters.wasteSort) {
    if (filters.wasteSort === 'highest') {
      filteredCustomers.sort((a, b) => b.totalWaste - a.totalWaste);
    } else if (filters.wasteSort === 'lowest') {
      filteredCustomers.sort((a, b) => a.totalWaste - b.totalWaste);
    }
  }
  
  // Apply date filters
  if (filters.joinDateFrom) {
    const fromDate = new Date(filters.joinDateFrom);
    filteredCustomers = filteredCustomers.filter(customer => 
      new Date(customer.joinDate) >= fromDate
    );
  }
  
  if (filters.joinDateTo) {
    const toDate = new Date(filters.joinDateTo);
    filteredCustomers = filteredCustomers.filter(customer => 
      new Date(customer.joinDate) <= toDate
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + limit);
  
  return {
    customers: paginatedCustomers,
    totalCount: filteredCustomers.length,
    page,
    limit
  };
};

// Function to get mock customer detail by ID
const getMockCustomerDetail = (id: string): CustomerResponse => {
  const customer = mockCustomers.find(c => c.id === id);
  
  if (!customer) {
    throw new Error(`Customer with ID ${id} not found`);
  }
  
  return {
    customer
  };
};