// import { baseUrl } from "@/constants/apiEndPoints";
import { baseUrl } from "@/constants/apiEndPoints";
import defaultAxios from "axios";
import { cookies } from "next/headers";

// This function works for both client and server
async function getAccessToken(): Promise<string | null> {
    // Client-side: use localStorage
    if (typeof window !== 'undefined') {
        return localStorage.getItem("access_token");
    }
    
    // Server-side: use cookies through dynamic import
    try {
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