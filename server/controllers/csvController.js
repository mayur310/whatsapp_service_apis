const csvService = require('../services/csvService');

async function uploadCSV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const buffer = req.file.buffer;

    const dataArray = await csvService.processCSV(buffer);
    csvService.processAndMakeAPICalls(dataArray);

    res.json({ dataArray });
  } catch (error) {
    res.status(500).json({ error: 'Error processing CSV file.' });
  }
}

module.exports = {
  uploadCSV,
};