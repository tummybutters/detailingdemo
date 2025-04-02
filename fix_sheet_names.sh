#!/bin/bash
# Fix all occurrences of BOOKING_BOOKING_SHEET_NAME to BOOKING_SHEET_NAME in googleSheetsSync.ts
sed -i 's/BOOKING_BOOKING_SHEET_NAME/BOOKING_SHEET_NAME/g' server/googleSheetsSync.ts

# Fix all occurrences of CONTACT_BOOKING_SHEET_NAME to CONTACT_SHEET_NAME in googleSheetsSync.ts
sed -i 's/CONTACT_BOOKING_SHEET_NAME/CONTACT_SHEET_NAME/g' server/googleSheetsSync.ts