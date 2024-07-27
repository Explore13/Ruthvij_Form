import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/sendEmail.routes.js'; // Ensure the correct path

const app = express();

// Use Helmet to enhance security
app.use(helmet());

// Configure CORS
app.use(cors({
  origin: 'https://ruthvij-form.vercel.app', // Allow requests from this origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Server');
});

app.use('/api', router); // Ensure /api routes are correctly defined

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export { app };
