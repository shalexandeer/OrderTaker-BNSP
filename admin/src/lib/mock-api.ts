// lib/mockApi.ts
import { ApiReturn, ApiError } from "@/lib/types/api";
import { Role, User } from "@/lib/types/auth";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Petugas TPS1",
    email: "petugas",
    password: "petugas",
    role: "petugas-tps"
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin",
    password: "admin",
    role: "superadmin"
  },
  {
    id: 3,
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "petugas-tps"
  }
];

/**
 * Mock function to simulate login process
 * @param email User email
 * @param password User password
 * @returns Promise with ApiResponse<User> on success or ApiError on failure
 */
export const mockLogin = async (
  email: string, 
  password: string
): Promise<ApiResponse<User>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user by email
  const user = mockUsers.find(user => user.email === email);
  
  // Check if user exists and password matches
  if (!user || user.password !== password) {
    throw {
      status: "error",
      statusCode: 401,
      message: "Invalid email or password",
      data: null
    } as ApiError;
  }
  
  // Generate a mock token
  const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
  
  // Return the user with token
  return {
    status: "success",
    statusCode: 200,
    message: "Login successful",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      token
    }
  };
};

/**
 * Mock function to validate token and get user data
 * @param token User token
 * @returns Promise with ApiResponse<User> on success or ApiError on failure
 */
export const mockGetMe = async (token: string): Promise<ApiResponse<User>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // In a real app, you'd validate the token on the server
    // Here we're just extracting the user ID from our mock token
    const [userId] = atob(token).split(':');
    const id = parseInt(userId);
    
    const user = mockUsers.find(user => user.id === id);
    
    if (!user) {
      throw new Error("Invalid token");
    }
    
    return {
      status: "success",
      statusCode: 200,
      message: "User data retrieved",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
        token
      }
    };
  } catch (error) {
    throw {
      status: "error",
      statusCode: 401,
      message: "Invalid token",
      data: null
    } as ApiError;
  }
};