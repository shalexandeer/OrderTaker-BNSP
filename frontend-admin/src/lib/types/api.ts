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
    page_size: number;
    total_page: number;
    total_data: number;
  };
}

export type ApiError = AxiosError<ApiResponse<boolean>>;

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  isAscending?: boolean;
  querySearch?: string;
}
