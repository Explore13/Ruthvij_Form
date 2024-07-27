import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/sendEmail.routes.js';

const app = express();

// Use Helmet for security
app.use(helmet());

// Configure CORS
app.use(cors({
  origin: 'https://ruthvij-form.vercel.app', // Allow this origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello from Server');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export { app };
