const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const CORS = require('cors');
require('dotenv').config();

const app = express();
app.use(CORS());

app.use(bodyParser.json());

app.use('/api', userRoutes);

const PORT = parseInt(process.env.PORT) || 8000;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
