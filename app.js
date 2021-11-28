require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const errorHandlerMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 5000;

app.use(
   cors({
      allowedHeaders: "*",
   })
);
app.use(express.json());

app.get("/api", (req, res) => {
   res.send("Hello");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use(errorHandlerMiddleware);

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, () => {
         console.log(`Server is listening on port ${PORT}`);
      });
   } catch (error) {
      console.log(error);
   }
};

start();
