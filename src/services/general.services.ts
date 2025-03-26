export interface ApiResponse<T> {
    reference_no: string;
    data?: T | null;
    details?: string | null;
}