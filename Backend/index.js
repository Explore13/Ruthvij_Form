import { app } from "./app.js";
import dotenv from "dotenv";
import cors from 'cors';

// Load environment variables from .env file
dotenv.config({ path: "./.env" });
app.use(cors({
  origin: "http://localhost:5173" // Allow requests from this origin
}));

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Failed to start the server: ${err.message}`);
});
