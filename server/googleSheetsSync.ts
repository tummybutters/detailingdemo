import { google } from 'googleapis';
import { Booking } from '../shared/schema';
import fs from 'fs';
import path from 'path';
import { storage } from './storage';

// Spreadsheet ID provided by user
const SPREADSHEET_ID = '1QzR1-WiCTq9H5k-zA2PoJuSiXhAVp0JhxQy_Nq_9wGs';
const SHEET_NAME = 'Bookings';
const CONTACT_SHEET_NAME = 'Contact';
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
    booking.createdAt?.toString() || new Date().toISOString(), // Timestamp
    booking.location || '',                          // Location
    booking.vehicleType || '',                       // Vehicle Type
    booking.conditionNotes || '',                    // Vehicle Condition
    booking.serviceCategory || '',                   // Service Category
    booking.mainService || '',                       // Main Service
    booking.addOns || '',                            // Add-ons
    booking.totalPrice || '',                        // Total Price
    booking.appointmentDate || '',                   // Appointment Date
    booking.appointmentTime || '',                   // Appointment Time
    booking.firstName || '',                         // First Name
    booking.lastName || '',                          // Last Name
    booking.email || '',                             // Email
    booking.phone || '',                             // Phone
  ];
}

// Create a header row for the spreadsheet if it doesn't exist
const HEADER_ROW = [
  'ID',
  'Reference',
  'Timestamp',
  'Location',
  'Vehicle Type',
  'Vehicle Condition',
  'Service Category',
  'Main Service',
  'Add-ons',
  'Total Price',
  'Appointment Date',
  'Appointment Time',
  'First Name',
  'Last Name',
  'Email',
  'Phone'
];

// Create a header row for the contact sheet if it doesn't exist
const CONTACT_HEADER_ROW = [
  'ID',
  'Timestamp',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Subject',
  'Message'
];

// Function to sync only unsynced bookings to the sheet
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
    
    // Get only unsynced bookings from storage
    const unsyncedBookings = await storage.getUnsyncedBookings();
    
    if (unsyncedBookings.length === 0) {
      console.log('No new bookings to sync to Google Sheets');
      return true;
    }
    
    console.log(`Found ${unsyncedBookings.length} new bookings to sync to Google Sheets`);
    
    // Get the existing data to check for headers
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:P1`,
    });
    
    // Make sure the header row exists, if not add it
    if (!existingData.data.values || existingData.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [HEADER_ROW]
        }
      });
    }
    
    // For each unsynced booking, append it to the end of the sheet
    for (const booking of unsyncedBookings) {
      const row = bookingToSheetRow(booking);
      
      // Append the booking data to the end of the sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`, // The API will automatically append after the last row
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [row],
        },
      });
      
      // Mark the booking as synced in the database
      await storage.markBookingAsSynced(booking.id);
      
      console.log(`Added booking ${booking.id} to bottom of Google Sheets and marked as synced`);
    }
    
    console.log(`Successfully synced ${unsyncedBookings.length} new bookings to Google Sheets`);
    return true;
  } catch (error) {
    console.error('Error syncing bookings to Google Sheets:', error);
    return false;
  }
}

// Function to add a single booking to the sheet (appends to the bottom)
export async function addBookingToGoogleSheets(booking: Booking): Promise<boolean> {
  // Skip if already synced
  if (booking.syncedToSheets) {
    console.log(`Booking ${booking.id} already synced to Google Sheets, skipping`);
    return true;
  }

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
    
    // Check that header row exists
    const headerData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:P1`,
    });
    
    // Make sure the header row exists, if not add it
    if (!headerData.data.values || headerData.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [HEADER_ROW]
        }
      });
    }
    
    // Convert booking to row format
    const row = bookingToSheetRow(booking);
    
    // Append the new booking data to the end of the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`, // The API will automatically append after the last row
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    });
    
    console.log(`Added booking ${booking.id} to bottom of Google Sheets. Updated ${response.data.updates?.updatedCells} cells.`);
    
    // Mark the booking as synced in the database
    await storage.markBookingAsSynced(booking.id);
    console.log(`Marked booking ${booking.id} as synced to Google Sheets`);
    
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

// Function to ensure the Contact sheet exists in the spreadsheet
async function ensureContactSheetExists(auth: any): Promise<boolean> {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Get spreadsheet info
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    });
    
    // Check if Contact sheet already exists
    const sheetExists = spreadsheet.data.sheets?.some(
      sheet => sheet.properties?.title === CONTACT_SHEET_NAME
    );
    
    if (!sheetExists) {
      console.log(`Creating '${CONTACT_SHEET_NAME}' sheet in spreadsheet...`);
      
      // Add new sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: CONTACT_SHEET_NAME
                }
              }
            }
          ]
        }
      });
      
      // Add header row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${CONTACT_SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [CONTACT_HEADER_ROW]
        }
      });
      
      console.log(`'${CONTACT_SHEET_NAME}' sheet created successfully with headers`);
    } else {
      console.log(`'${CONTACT_SHEET_NAME}' sheet already exists in spreadsheet`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error ensuring ${CONTACT_SHEET_NAME} sheet exists:`, error);
    return false;
  }
}

// Function to add a contact form submission to the Contact sheet
export async function addContactToGoogleSheets(contactData: {
  id: number;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  // Get auth client
  const auth = await getAuthClient();
  if (!auth) {
    console.error('Failed to get Google auth client');
    return false;
  }

  try {
    // Ensure the Contact sheet exists
    const sheetExists = await ensureContactSheetExists(auth);
    if (!sheetExists) {
      console.error('Failed to create or verify Contact sheet for adding contact submission');
      return false;
    }
    
    // Create sheets API instance
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Check that header row exists
    const headerData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${CONTACT_SHEET_NAME}!A1:H1`,
    });
    
    // Make sure the header row exists, if not add it
    if (!headerData.data.values || headerData.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${CONTACT_SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [CONTACT_HEADER_ROW]
        }
      });
    }
    
    // Convert contact data to row format
    const row = [
      contactData.id.toString(),
      contactData.timestamp,
      contactData.firstName,
      contactData.lastName,
      contactData.email,
      contactData.phone,
      contactData.subject,
      contactData.message
    ];
    
    // Append the contact data to the end of the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${CONTACT_SHEET_NAME}!A1`, // The API will automatically append after the last row
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    });
    
    console.log(`Added contact submission to bottom of Google Sheets. Updated ${response.data.updates?.updatedCells} cells.`);
    return true;
  } catch (error) {
    console.error('Error adding contact to Google Sheets:', error);
    return false;
  }
}

// Check for Google Sheets credentials on startup and ensure sheets exist
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
    
    // Ensure both sheets exist
    const bookingsSheetExists = await ensureBookingsSheetExists(auth);
    if (!bookingsSheetExists) {
      console.log('Failed to create or verify Bookings sheet');
      return false;
    }
    
    const contactSheetExists = await ensureContactSheetExists(auth);
    if (!contactSheetExists) {
      console.log('Failed to create or verify Contact sheet');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking Google Sheets credentials:', error);
    return false;
  }
}