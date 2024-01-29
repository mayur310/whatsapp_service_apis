const shelfCsvService = require('../services/shelf_csvService');

async function uploadShelfCSV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const buffer = req.file.buffer;

    const dataArray = await shelfCsvService.processCSV(buffer);
    shelfCsvService.processAndMakeAPICalls(dataArray);

    res.json({ dataArray });
  } catch (error) {
    res.status(500).json({ error: 'Error processing CSV file.' });
  }
}

module.exports = {
    uploadShelfCSV,
};