import express from 'express';
import { app } from './app.js'; // Ensure this import is correct

const index = express();
index.get('/', (req, res) => {
  res.send('Hello from the server');
});

index.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
