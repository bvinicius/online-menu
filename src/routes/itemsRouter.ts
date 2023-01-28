import express from 'express';

const router = express.Router();
const programmingLanguagesController = require('../controllers/programmingLanguages.controller');

router.get('/', programmingLanguagesController.get);

export default router;
