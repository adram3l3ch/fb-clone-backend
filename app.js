require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api", (req, res) => {
   res.send("Hello");
});

app.use("/api/v1/auth", authRouter);

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
