import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Mock data store
const mockBookings = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "123 Main St, Davis, CA 95616",
    vehicleType: "SUV",
    serviceCategory: "Premium",
    mainService: "Luxury Detail",
    addOns: "Interior Sanitization",
    totalPrice: "249.99",
    totalDuration: "180",
    appointmentDate: "2025-04-15",
    appointmentTime: "10:00 AM",
    conditionNotes: "Minor scratches on driver side door",
    createdAt: new Date().toISOString(),
    status: "pending",
    bookingReference: "HWW-123456-001"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    location: "456 Oak Ave, Irvine, CA 92617",
    vehicleType: "Sedan",
    serviceCategory: "Basic",
    mainService: "Express Detail",
    addOns: "Tire Shine",
    totalPrice: "149.99",
    totalDuration: "90",
    appointmentDate: "2025-04-10",
    appointmentTime: "2:30 PM",
    conditionNotes: "Pet hair throughout interior",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: "confirmed",
    bookingReference: "HWW-123456-002"
  }
];

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  console.log(`Mocking API Request: ${method} ${url}`, data);

  // Mock responses
  if (url === '/api/bookings' && method === 'GET') {
    return { bookings: mockBookings };
  }

  if (url === '/api/bookings' && method === 'POST') {
    const newBooking = {
      ...(data as any),
      id: Math.floor(Math.random() * 1000) + 3,
      createdAt: new Date().toISOString(),
      status: 'pending',
      bookingReference: `HWW-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`
    };
    return { message: 'Booking created successfully', booking: newBooking };
  }

  if (url === '/api/sync-bookings-to-sheets') {
    return { success: true, message: 'All bookings successfully synced to Google Sheets (Mocked)' };
  }

  if (url.match(/\/api\/bookings\/\d+\/status/) && method === 'PATCH') {
    return { message: 'Booking status updated successfully', booking: { ...(data as any) } };
  }

  // Fallback to actual fetch for other things (though unlikely needed for this demo)
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res.json(); // Changed to return parsed JSON directly as our mocks return objects
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
      const url = queryKey[0] as string;

      // Intercept GET requests for queries
      if (url === '/api/bookings') {
        return mockBookings as any;
      }

      const res = await fetch(url, {
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
