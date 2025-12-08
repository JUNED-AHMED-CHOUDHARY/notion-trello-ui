import { baseUrl } from "@/constants/apiEndPoints";
import defaultAxios from "axios";

// This function works for both client and server
async function getAccessToken(): Promise<string | null> {
    // Client-side: use localStorage
    if (typeof window !== 'undefined') {
        return localStorage.getItem("access_token");
    }
    
    // Server-side: use cookies through dynamic import
    try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("access_token");
        return tokenCookie?.value || null;
    } catch (error) {
        console.error("Error accessing cookies:", error);
        return null;
    }
}

const axiosInstance = defaultAxios.create({
    baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(async (config) => {
    const access_token = await getAccessToken();
    if (access_token) config.headers.Authorization = `Bearer ${access_token}`;

    return config;

}, (error) => {
    console.error('Request interceptor error :- ', error);
    return Promise.reject(error);
});

export default axiosInstance;