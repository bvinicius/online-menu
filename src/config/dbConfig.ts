import dotenv from 'dotenv';

export function config() {
	dotenv.config();

	return {
		spreadSheetId: process.env.GOOGLE_SPREADSHEET_ID as string,
		clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
		privateKey: process.env.GOOGLE_PRIVATE_KEY as string,
	};
}
