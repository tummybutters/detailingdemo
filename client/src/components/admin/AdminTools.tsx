import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export function AdminTools() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');
  const { toast } = useToast();

  const handleSyncBookings = async () => {
    try {
      setSyncStatus('loading');
      setSyncMessage('Syncing bookings to Google Sheets...');

      const response = await apiRequest('/api/sync-bookings-to-sheets', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setSyncStatus('success');
        setSyncMessage('Bookings successfully synced to Google Sheets!');
        toast({
          title: 'Sync Complete',
          description: 'All bookings have been synced to Google Sheets.',
          variant: 'default',
        });
      } else {
        throw new Error(data.message || 'Failed to sync bookings');
      }
    } catch (error) {
      console.error('Error syncing bookings:', error);
      setSyncStatus('error');
      setSyncMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      toast({
        title: 'Sync Failed',
        description: 'There was an error syncing bookings to Google Sheets.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Tools</CardTitle>
        <CardDescription>
          Manage and sync your data with third-party services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="google-sheets">
          <TabsList className="mb-4">
            <TabsTrigger value="google-sheets">Google Sheets</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="google-sheets">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Google Sheets Sync</h3>
                <p className="text-sm text-muted-foreground">
                  Manually sync all booking data with your Google Sheets spreadsheet.
                </p>
              </div>
              
              {syncStatus === 'success' && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>{syncMessage}</AlertDescription>
                </Alert>
              )}
              
              {syncStatus === 'error' && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{syncMessage}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleSyncBookings} 
                disabled={syncStatus === 'loading'}
                className="mt-2"
              >
                {syncStatus === 'loading' ? 'Syncing...' : 'Sync Bookings to Google Sheets'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="email">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Email Settings</h3>
              <p className="text-sm text-muted-foreground">
                Email configuration tools will be available soon.
              </p>
              
              <Button disabled className="mt-2">Email Features Coming Soon</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          These admin tools provide access to sensitive operations. Use with care.
        </p>
      </CardFooter>
    </Card>
  );
}

export default AdminTools;