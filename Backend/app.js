import express from "express";
import helmet from "helmet";
import router from "./routes/sendEmail.routes.js";
import cors from "cors"

const app = express();

// Use Helmet to enhance security
app.use(helmet());
app.use(cors({
  origin: 'https://ruthvij-form.vercel.app', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type'] // Allow these headers
}));



// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Define routes
app.get("/",(req,res)=>{
  res.json("Hello from Server");
});
app.use("/api", router);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export { app };
