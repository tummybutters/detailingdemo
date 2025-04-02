import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  RefreshCw, 
  FileSpreadsheet, 
  Calendar, 
  Car, 
  User, 
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Interface for booking data
interface Booking {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  vehicleType: string;
  serviceCategory: string;
  mainService: string;
  addOns?: string | null;
  totalPrice: string;
  totalDuration: string;
  appointmentDate: string;
  appointmentTime: string;
  conditionNotes?: string | null;
  createdAt?: Date;
  status?: string;
  bookingReference?: string;
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Fetch all bookings
  const { data: bookings, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/bookings'],
    queryFn: async () => {
      const response = await apiRequest('/api/bookings', {
        method: 'GET',
      });
      return response.bookings as Booking[];
    },
  });

  // Mutation for syncing all bookings to Google Sheets
  const syncBookingsMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/sync-bookings-to-sheets', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'All bookings synced to Google Sheets successfully',
        variant: 'default',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sync bookings to Google Sheets',
        variant: 'destructive',
      });
    },
  });

  // Mutation for updating booking status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await apiRequest(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        body: { status },
      });
    },
    onSuccess: () => {
      toast({
        title: 'Status Updated',
        description: 'Booking status has been updated successfully',
        variant: 'default',
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update booking status',
        variant: 'destructive',
      });
    },
  });

  // Handle status change
  const handleStatusChange = (bookingId: number, newStatus: string) => {
    updateStatusMutation.mutate({ id: bookingId, status: newStatus });
  };

  // Handle sync to Google Sheets
  const handleSyncToSheets = () => {
    syncBookingsMutation.mutate();
  };

  // Render status badge with appropriate colors
  const renderStatusBadge = (status?: string) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;
    
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Handle row click to view booking details
  const handleRowClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Dashboard | Hardys Wash N' Wax</title>
        <meta name="description" content="Admin dashboard for managing bookings and services" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 mb-4">Manage bookings and synchronize with Google Sheets</p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => refetch()} 
              disabled={isLoading}
              className="flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            
            <Button 
              onClick={handleSyncToSheets}
              disabled={syncBookingsMutation.isPending}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Sync to Sheets
              {syncBookingsMutation.isPending && (
                <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bookings table column - takes up 2/3 of the space */}
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">All Bookings</CardTitle>
                <CardDescription>
                  {bookings ? `${bookings.length} bookings found` : 'Loading booking data...'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 py-10">
                    <XCircle className="h-10 w-10 mx-auto mb-2" />
                    <p>Error loading bookings.</p>
                    <Button variant="outline" onClick={() => refetch()} className="mt-2">
                      Try Again
                    </Button>
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  <ScrollArea className="h-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reference</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow 
                            key={booking.id} 
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => handleRowClick(booking)}
                          >
                            <TableCell className="font-medium">{booking.bookingReference || `#${booking.id}`}</TableCell>
                            <TableCell>{`${booking.firstName || ''} ${booking.lastName || ''}`}</TableCell>
                            <TableCell>{booking.mainService || 'N/A'}</TableCell>
                            <TableCell>{booking.appointmentDate ? `${booking.appointmentDate} ${booking.appointmentTime || ''}` : 'N/A'}</TableCell>
                            <TableCell>{renderStatusBadge(booking.status)}</TableCell>
                            <TableCell className="text-right">
                              <Select
                                defaultValue={booking.status || 'pending'}
                                onValueChange={(value) => handleStatusChange(booking.id, value)}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  {statusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p>No bookings found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Booking details column - takes up 1/3 of the space */}
          <div className="md:col-span-1">
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Booking Details</CardTitle>
                <CardDescription>
                  {selectedBooking ? `Ref: ${selectedBooking.bookingReference || `#${selectedBooking.id}`}` : 'Select a booking to view details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedBooking ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                        <User className="h-4 w-4 mr-2" />
                        Customer Information
                      </h3>
                      <div className="pl-6">
                        <p className="font-medium">{`${selectedBooking.firstName || ''} ${selectedBooking.lastName || ''}`}</p>
                        <p className="text-sm text-gray-600">{selectedBooking.email}</p>
                        <p className="text-sm text-gray-600">{selectedBooking.phone}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Appointment
                      </h3>
                      <div className="pl-6">
                        <p className="font-medium">
                          {selectedBooking.appointmentDate ? formatDate(selectedBooking.appointmentDate) : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">{selectedBooking.appointmentTime || 'No time specified'}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                        <Car className="h-4 w-4 mr-2" />
                        Vehicle & Service
                      </h3>
                      <div className="pl-6">
                        <p className="font-medium">
                          {selectedBooking.vehicleType || 'No vehicle type specified'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedBooking.serviceCategory ? `Category: ${selectedBooking.serviceCategory}` : ''}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedBooking.mainService ? `Service: ${selectedBooking.mainService}` : ''}
                        </p>
                        {selectedBooking.addOns && (
                          <p className="text-sm text-gray-600">
                            Add-ons: {selectedBooking.addOns}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                        <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                          <path d="M2 17l10 5 10-5"></path>
                          <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        Location & Price
                      </h3>
                      <div className="pl-6">
                        <p className="font-medium">{selectedBooking.location || 'No location specified'}</p>
                        <p className="text-sm text-gray-600">
                          {selectedBooking.totalPrice ? `Total: $${selectedBooking.totalPrice}` : ''}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        Status Information
                      </h3>
                      <div className="pl-6">
                        <div className="flex items-center mb-1">
                          <span className="mr-2">Current Status:</span>
                          {renderStatusBadge(selectedBooking.status)}
                        </div>
                        <p className="text-sm text-gray-600">
                          {selectedBooking.createdAt ? `Created: ${new Date(selectedBooking.createdAt).toLocaleString()}` : ''}
                        </p>
                      </div>
                    </div>
                    
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <svg className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Select a booking from the table to view details</p>
                  </div>
                )}
              </CardContent>
              {selectedBooking && (
                <CardFooter className="border-t flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedBooking(null)}
                  >
                    Close
                  </Button>
                  <Select
                    value={selectedBooking.status || 'pending'}
                    onValueChange={(value) => handleStatusChange(selectedBooking.id, value)}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}