import express from 'express';
import { ItemsController } from '../controllers/ItemsController';
import { ItemsService } from '../services/ItemsService';
import { GoogleSheetsRepository } from '../repositories/GoogleSheetsRepository';

const googleSheetsRepository = new GoogleSheetsRepository();
const itemsService = new ItemsService(googleSheetsRepository);
const itemsController = new ItemsController(itemsService);

const router = express.Router();

router.get('/', itemsController.get);

export default router;
