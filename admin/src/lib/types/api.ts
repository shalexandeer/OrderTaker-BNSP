import { AxiosError } from "axios";

// Common API response structure
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  status_code: number;
  message: string;
}

export interface ApiResponseWithPagination<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    pageSize: number;
    totalPage: number;
    totalData: number;
  };
}

export type ApiError = AxiosError<ApiResponse<boolean>>;

// Pagination response
export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  totalPage?: number;
  totalData?: number;
}
