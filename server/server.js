import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import BooksRoute from "./routes/BookRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

// app.use("/", async (req, res, next) => {
//   let users = await Student.find();
//   res.send({
//     users,
//   });
// });

app.use("/book", BooksRoute);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({
    code: `${error.code}`,
    message: error.message || "An unknown error occurred!",
  });
});

mongoose
  .connect(
    `mongodb+srv://vpbs:vpbs1111@cluster0.ltyeznj.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
