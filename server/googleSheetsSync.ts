import { google } from 'googleapis';
import { Booking } from '../shared/schema';
import fs from 'fs';
import path from 'path';
import { storage } from './storage';

// Spreadsheet ID provided by user
const SPREADSHEET_ID = '1QzR1-WiCTq9H5k-zA2PoJuSiXhAVp0JhxQy_Nq_9wGs';
const SHEET_NAME = 'Bookings';
const CREDENTIALS_PATH = path.join(process.cwd(), 'service-account.json');

// Function to authenticate with Google Sheets API
async function getAuthClient() {
  try {
    // Check if credentials file exists
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      console.error('Google service account credentials not found at:', CREDENTIALS_PATH);
      return null;
    }

    // Read the credentials file
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    
    // Create JWT client using credentials
    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    
    // Connect to the Google APIs
    await auth.authorize();
    return auth;
  } catch (error) {
    console.error('Error authenticating with Google Sheets:', error);
    return null;
  }
}

// Convert booking object to array format for Google Sheets
function bookingToSheetRow(booking: Booking): any[] {
  return [
    booking.id.toString(),                           // ID
    booking.bookingReference || '',                  // Reference
    booking.status || 'pending',                     // Status
    booking.createdAt?.toString() || new Date().toISOString(), // Timestamp
    booking.location || '',                          // Location
    '', // Coordinates (not in schema)
    booking.vehicleType || '',                       // Vehicle Type
    booking.conditionNotes || '',                    // Vehicle Condition
    booking.serviceCategory || '',                   // Service Category
    booking.mainService || '',                       // Main Service
    '',                                              // Service Price (not in schema)
    booking.addOns || '',                            // Add-ons
    booking.totalPrice || '',                        // Total Price
    booking.appointmentDate || '',                   // Appointment Date
    booking.appointmentTime || '',                   // Appointment Time
    booking.firstName || '',                         // First Name
    booking.lastName || '',                          // Last Name
    booking.email || '',                             // Email
    booking.phone || '',                             // Phone
    'website',                                       // Submitted From
  ];
}

// Create a header row for the spreadsheet if it doesn't exist
const HEADER_ROW = [
  'ID',
  'Reference',
  'Status',
  'Timestamp',
  'Location',
  'Coordinates',
  'Vehicle Type',
  'Vehicle Condition',
  'Service Category',
  'Main Service',
  'Service Price',
  'Add-ons',
  'Total Price',
  'Appointment Date',
  'Appointment Time',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Submitted From'
];

// Function to clear existing data and write all bookings to the sheet
export async function syncBookingsToGoogleSheets(): Promise<boolean> {
  // Get auth client
  const auth = await getAuthClient();
  if (!auth) {
    console.error('Failed to get Google auth client');
    return false;
  }

  try {
    // Ensure the Bookings sheet exists
    const sheetExists = await ensureBookingsSheetExists(auth);
    if (!sheetExists) {
      console.error('Failed to create or verify Bookings sheet for sync operation');
      return false;
    }
    
    // Create sheets API instance
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Get all bookings from storage
    const bookings = await storage.getBookings();
    
    // Prepare data for Google Sheets
    const rows = bookings.map(booking => bookingToSheetRow(booking));
    
    // Add header row at the top
    const values = [HEADER_ROW, ...rows];
    
    // First, clear existing sheet content (but keep headers)
    if (bookings.length > 0) {
      try {
        await sheets.spreadsheets.values.clear({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A2:T1000`, // Clear from A2 to preserve header
        });
      } catch (clearError) {
        console.warn('Error clearing sheet (continuing with update):', clearError);
        // We'll continue anyway to write the data
      }
    }
    
    // Write all data to sheet
    let response;
    if (bookings.length > 0) {
      response = await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: values,
        },
      });
      console.log(`Synced ${bookings.length} bookings to Google Sheets. Updated ${response.data.updatedCells} cells.`);
    } else {
      console.log('No bookings to sync');
    }
    
    return true;
  } catch (error) {
    console.error('Error syncing bookings to Google Sheets:', error);
    return false;
  }
}

// Function to add a single booking to the sheet (appends to the end)
export async function addBookingToGoogleSheets(booking: Booking): Promise<boolean> {
  // Get auth client
  const auth = await getAuthClient();
  if (!auth) {
    console.error('Failed to get Google auth client');
    return false;
  }

  try {
    // Ensure the Bookings sheet exists
    const sheetExists = await ensureBookingsSheetExists(auth);
    if (!sheetExists) {
      console.error('Failed to create or verify Bookings sheet for adding booking');
      return false;
    }
    
    // Create sheets API instance
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Convert booking to row format
    const row = bookingToSheetRow(booking);
    
    // Append the row to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2`, // Start at A2 to preserve header
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    });
    
    console.log(`Added booking ${booking.id} to Google Sheets. Updated ${response.data.updates?.updatedCells} cells.`);
    return true;
  } catch (error) {
    console.error('Error adding booking to Google Sheets:', error);
    return false;
  }
}

// Function to ensure the Bookings sheet exists in the spreadsheet
async function ensureBookingsSheetExists(auth: any): Promise<boolean> {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Get spreadsheet info
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    });
    
    // Check if Bookings sheet already exists
    const sheetExists = spreadsheet.data.sheets?.some(
      sheet => sheet.properties?.title === SHEET_NAME
    );
    
    if (!sheetExists) {
      console.log(`Creating '${SHEET_NAME}' sheet in spreadsheet...`);
      
      // Add new sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: SHEET_NAME
                }
              }
            }
          ]
        }
      });
      
      // Add header row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [HEADER_ROW]
        }
      });
      
      console.log(`'${SHEET_NAME}' sheet created successfully with headers`);
    } else {
      console.log(`'${SHEET_NAME}' sheet already exists in spreadsheet`);
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring Bookings sheet exists:', error);
    return false;
  }
}

// Check for Google Sheets credentials on startup and ensure sheet exists
export async function checkGoogleSheetsCredentials(): Promise<boolean> {
  try {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      console.log('Google Sheets credentials file not found at:', CREDENTIALS_PATH);
      return false;
    }
    
    const auth = await getAuthClient();
    if (!auth) {
      console.log('Google Sheets authentication failed');
      return false;
    }
    
    console.log('Google Sheets credentials valid - sheets integration enabled');
    
    // Ensure the Bookings sheet exists
    const sheetExists = await ensureBookingsSheetExists(auth);
    if (!sheetExists) {
      console.log('Failed to create or verify Bookings sheet');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking Google Sheets credentials:', error);
    return false;
  }
}