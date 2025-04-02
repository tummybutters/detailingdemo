#!/bin/bash
# Fix all occurrences of SHEET_NAME to BOOKING_SHEET_NAME in googleSheetsSync.ts
sed -i 's/SHEET_NAME/BOOKING_SHEET_NAME/g' server/googleSheetsSync.ts