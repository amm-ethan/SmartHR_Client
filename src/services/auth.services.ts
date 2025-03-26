import {axiosInstance} from '@/lib/axios';
import type {ApiResponse} from '@/services/general.services.ts';

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
}

export const authService = {
    login: async (credentials: LoginRequest) => {
        const {data} = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
        return data.data!;
    },
};