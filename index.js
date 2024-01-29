const express = require('express');
const uploadRoute = require('./server/routes/upload');
const shelfuploadRoute = require('./server/routes/shelf_upload');

const app = express();
const port = 3000;

app.use(uploadRoute);
app.use(shelfuploadRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})