import router from './routes/index';

const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

// Parse JSON request bodies
app.use(express.json());

app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
