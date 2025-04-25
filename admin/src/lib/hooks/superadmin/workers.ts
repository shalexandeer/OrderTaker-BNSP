import { PetugasTPS } from '@/lib/types/auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Interface for the API response when fetching Workers
interface WorkersResponse {
  users: PetugasTPS[];
  totalCount: number;
}

// Interface for filter options
interface WorkersFilters {
  search?: string;
  role?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Interface for worker creation request
interface CreateWorkerRequest {
  name: string;
  username: string;
  email: string;
  phone_number: string;
  tps_id: string;
  password: string;
  role: "petugas-tps";
}

// Interface for partners (TPS)
export interface Partner {
  id: number | string;
  display_name: string;
  location: string;
  type: string;
  capacity: string;
  description?: string;
}

// Interface for partners response
interface PartnersResponse {
  partners: Partner[];
  totalCount: number;
}

// Dummy data for testing
const dummyWorkers: PetugasTPS[] = [
  {
    id: 1,
    role_id: "123e4567-e89b-12d3-a456-426614174000",
    username: "worker1",
    email: "worker1@example.com",
    phone_number: "081234567890",
    name: "Budi Santoso",
    role: "petugas-tps",
    tps_name: "TPS Kebayoran Baru",
    join_date: "2023-01-15"
  },
  {
    id: 2,
    role_id: "223e4567-e89b-12d3-a456-426614174001",
    username: "worker2",
    email: "worker2@example.com",
    phone_number: "081234567891",
    name: "Dewi Suryani",
    role: "petugas-tps",
    tps_name: "TPS Tebet",
    join_date: "2023-02-20"
  },
  {
    id: 3,
    role_id: "323e4567-e89b-12d3-a456-426614174002",
    username: "worker3",
    email: "worker3@example.com",
    phone_number: "081234567892",
    name: "Ahmad Farhan",
    role: "petugas-tps",
    tps_name: "TPS Menteng",
    join_date: "2023-03-05"
  },
  {
    id: 4,
    role_id: "423e4567-e89b-12d3-a456-426614174003",
    username: "worker4",
    email: "worker4@example.com",
    phone_number: "081234567893",
    name: "Siti Rahayu",
    role: "petugas-tps",
    tps_name: "TPS Kemang",
    join_date: "2023-04-10"
  },
  {
    id: 5,
    role_id: "523e4567-e89b-12d3-a456-426614174004",
    username: "worker5",
    email: "worker5@example.com",
    phone_number: "081234567894",
    name: "Eko Prasetyo",
    role: "petugas-tps",
    tps_name: "TPS Cilandak",
    join_date: "2023-05-25"
  }
];

// Dummy partners data
const dummyPartners: Partner[] = [
  {
    id: 1,
    display_name: "TPS Kebayoran Baru",
    location: "Jakarta Selatan",
    type: "tps",
    capacity: "500kg/hari",
    description: "TPS di area Kebayoran Baru"
  },
  {
    id: 2,
    display_name: "TPS Tebet",
    location: "Jakarta Selatan",
    type: "tps",
    capacity: "450kg/hari",
    description: "TPS di area Tebet"
  },
  {
    id: 3,
    display_name: "TPS Menteng",
    location: "Jakarta Pusat",
    type: "tps",
    capacity: "600kg/hari",
    description: "TPS di area Menteng"
  },
  {
    id: 4,
    display_name: "TPS Kemang",
    location: "Jakarta Selatan",
    type: "tps",
    capacity: "400kg/hari",
    description: "TPS di area Kemang"
  },
  {
    id: 5,
    display_name: "TPS Cilandak",
    location: "Jakarta Selatan",
    type: "tps",
    capacity: "550kg/hari",
    description: "TPS di area Cilandak"
  }
];

// Mock API function for fetching workers
const fetchWorkers = async (
  filters: WorkersFilters = {}, 
  page = 1, 
  limit = 10
): Promise<WorkersResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter workers based on search term
  let filteredWorkers = [...dummyWorkers];
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredWorkers = filteredWorkers.filter(worker => 
      worker.name.toLowerCase().includes(searchTerm) || 
      worker.username.toLowerCase().includes(searchTerm) ||
      worker.phone_number.includes(searchTerm) ||
      (worker.tps_name && worker.tps_name.toLowerCase().includes(searchTerm))
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedWorkers = filteredWorkers.slice(startIndex, endIndex);
  
  return {
    users: paginatedWorkers,
    totalCount: filteredWorkers.length
  };
};

// Mock API function for fetching partners/TPS
const fetchPartners = async (): Promise<PartnersResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    partners: dummyPartners,
    totalCount: dummyPartners.length
  };
};

// Mock API function for deleting a worker
const deleteWorker = async (id: number): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real API, this would delete the worker
  console.log(`Deleting worker with ID: ${id}`);
  
  return { success: true };
};

// Mock API function for creating a worker
const createWorker = async (data: CreateWorkerRequest): Promise<{ success: boolean, data: PetugasTPS }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find the TPS name based on the TPS ID
  const tps = dummyPartners.find(p => p.id.toString() === data.tps_id);
  
  // Create a new worker object
  const newWorker: PetugasTPS = {
    id: Math.floor(Math.random() * 1000) + 10, // Generate a random ID
    role_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate a random UUID-like string
    username: data.username,
    email: data.email,
    phone_number: data.phone_number,
    name: data.name,
    role: data.role,
    tps_name: tps?.display_name || 'Unknown TPS',
    join_date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
  };
  
  console.log('Creating worker with data:', data);
  console.log('New worker created:', newWorker);
  
  return { 
    success: true,
    data: newWorker
  };
};

// Hook for fetching workers
export const useWorkersList = (
  filters: WorkersFilters = {}, 
  page = 1, 
  limit = 10
) => {
  return useQuery<WorkersResponse>({
    queryKey: ['workers', { filters, page, limit }],
    queryFn: () => fetchWorkers(filters, page, limit)
  });
};

// Hook for fetching partners/TPS list
export const usePartnersList = () => {
  return useQuery<PartnersResponse>({
    queryKey: ['partners'],
    queryFn: () => fetchPartners()
  });
};

// Hook for deleting a worker
export const useDeleteWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteWorker(id),
    onSuccess: () => {
      // Invalidate and refetch the workers list
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    }
  });
};

// Hook for creating a worker
export const useCreateWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateWorkerRequest) => createWorker(data),
    onSuccess: () => {
      // Invalidate and refetch the workers list
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    }
  });
};