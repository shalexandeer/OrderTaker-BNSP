export type Role = "superadmin" | "petugas-tps";

export type User = {
  id: number;
  role_id: string; // UUID as shown in ERD
  username: string;
  email: string;
  password?: string; // Optional when returning data to frontend
  refresh_token?: string;
  reset_password_token?: string;
  last_password_reset?: string;
  phone_number: string;
  name: string; // Not explicitly in ERD but useful for display
  token?: string; // For authentication
  role: Role; // For frontend role-based access control
};

export type PetugasTPS = User & {
  tps_name: string;
  join_date: string;
}

export type RolePermissions = {
  id: string;
  role_id: string;
  permision_id: string;
}

export type Permissions = {
  id: string;
  name: string;
  description: string;
}

export type Roles = {
  id: string;
  slug: string;
  display_name: string;
  role_level: number;
  role_auth_detail: string;
}

export type Users = {
  id: string;
  username: string;
  email: string;
  password: string;
  refresh_token: string;
  reset_password_token: string;
  last_password_reset: string;
  phone_number: string;
  name: string;
  role_id: string;
  role: Roles;
}