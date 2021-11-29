require("dotenv").config();
require("express-async-errors");

const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret: process.env.CLOUD_API_SECRET,
});

const cors = require("cors");

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const errorHandlerMiddleware = require("./middleware/error-handler");
const authorizationMiddleware = require("./middleware/authorization");

const PORT = process.env.PORT || 5000;

app.use(
   cors({
      allowedHeaders: "*",
   })
);
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/api", (req, res) => {
   res.send("Hello");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authorizationMiddleware, userRouter);
app.use("/api/v1/post", authorizationMiddleware, postRouter);

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
