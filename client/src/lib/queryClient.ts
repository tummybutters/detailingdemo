import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  urlOrOptions: string | {
    method: string;
    url?: string;
    data?: unknown;
    headers?: Record<string, string>;
  },
  options?: {
    method?: string;
    data?: unknown;
    headers?: Record<string, string>;
  }
): Promise<Response> {
  // Determine if we're using the new API (url, options) or the old API (method, url, data)
  let url: string;
  let method: string;
  let data: unknown | undefined;
  let headers: Record<string, string> = {};

  if (typeof urlOrOptions === 'string') {
    // New API: (url, options)
    url = urlOrOptions;
    method = options?.method || 'GET';
    data = options?.data;
    if (options?.headers) {
      headers = { ...options.headers };
    }
  } else {
    // Old API: (method, url, data)
    method = urlOrOptions.method;
    url = urlOrOptions.url || '';
    data = urlOrOptions.data;
    if (urlOrOptions.headers) {
      headers = { ...urlOrOptions.headers };
    }
  }

  // Set default Content-Type if we have data
  if (data && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
