// Auth responses
export interface TokenResponse {
  access_token: string;
}

// Auth request payloads
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}

export interface RequestForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordPayload {
  token: string;
  new_password: string;
}

export interface RegisterPayload {
  email: string;
  role_id: string;
  username: string;
  phone_number: string;
  password: string;
}

// User and Role types
export interface User {
  id: string;
  email: string;
  username: string;
  phone_number: string;
  role_id: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  level: number;
  created_at: string;
  updated_at: string;
}

// JWT Decoded Types
export interface JwtPayload {
  user_id: string;
  role_id: string;
  token_type: "access" | "refresh";
  exp: number;
  iat: number;
}
