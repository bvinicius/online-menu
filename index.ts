import { GoogleSpreadsheet } from 'google-spreadsheet';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

setupGoogleSheet();

async function setupGoogleSheet() {
	const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID!);
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
		private_key: process.env.GOOGLE_PRIVATE_KEY!,
	});

	await doc.loadInfo(); // loads document properties and worksheets

	const sheet = doc.sheetsByIndex[0];
	await sheet.loadCells('A:C');

	console.log(sheet.getCellByA1('A1').value);
}
