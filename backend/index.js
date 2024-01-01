import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookroutes from "./routes/bookroutes.js";
import cors from "cors";

const app = express();

//Middleware for CORS policy

// Option 1 : Allow all origins with default of CORS
app.use(cors());

//Option 2 : Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     method: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Middleware for parsing request body
app.use(express.json());
app.use("/books", bookroutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Book Store Project</h1>");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MONGODB connected successfuly......");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => console.log("mongodb error", err));
