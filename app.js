//dependencies

require("dotenv").config();
require("express-async-errors");
const fileUpload = require("express-fileupload");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const connectDB = require("./db/connect");

//security dependencies

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

//app initialisation

const app = express();
const PORT = process.env.PORT || 5000;

//cloudinary configuration

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret: process.env.CLOUD_API_SECRET,
});

//Routes

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

//middlewares

const errorHandlerMiddleware = require("./middleware/error-handler");
const authorizationMiddleware = require("./middleware/authorization");
const notFoundMiddleware = require("./middleware/not-found");

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(
   cors({
      allowedHeaders: "authorization",
      origin: "*",
   })
);

app.get("/api/v1", (req, res) => {
   res.status(200).json({ msg: "welcome" });
});

//routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authorizationMiddleware, userRouter);
app.use("/api/v1/post", authorizationMiddleware, postRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

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
