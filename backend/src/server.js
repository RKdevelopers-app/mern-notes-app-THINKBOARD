import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
    origin: ["http://localhost:5173", "https://myfrontend.com"], // allowed URLs
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    credentials: true, // if you need cookies or auth headers
  };
  

app.use(cors(corsOptions));

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
// app.use("/api/notes",rateLimiter, notesRoutes);


connectDB().then(() =>{
    app.listen(PORT, () =>{
        console.log("server started on port :", PORT);
    });
});



 

