import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ Very common sensible defaults
      staleTime: 1000 * 60 * 2, // 2 minutes – data stays fresh
      gcTime: 1000 * 60 * 30, // 30 minutes – garbage collection time (previously cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true, // usually want this off in modern apps
      retry: 1, // or false / (failureCount) => boolean
    },
    mutations: {
      retry: 0,
      onError(error) {
        const axiosError = error as AxiosError;
        toast.error((axiosError.response?.data as any).message);
      },
    },
  },
});
