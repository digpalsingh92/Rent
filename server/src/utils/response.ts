export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}

export interface PaginationMeta {
   page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: PaginationMeta;
}

export const successResponse = <T>(message: string, data?: T): ApiResponse<T> => ({
    success: true,
    message,
    data,
    error: null,
});

export const errorResponse = <T>(message: string, error?: any): ApiResponse<T> => ({
    success: false,
    message,
    data: undefined,
    error,
});

export const paginatedResponse = <T>(message: string, data: T[], page:number, limit:number, total:number): PaginatedResponse<T> => ({
    success: true,
    message,
    data,
    error: null,
    pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
    }
})