const express = require('express');
const multer = require('multer');
const shelfCsvController = require('../controllers/shelf_csvController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/uploadShelf', upload.single('csvFile'), shelfCsvController.uploadShelfCSV);

module.exports = router;