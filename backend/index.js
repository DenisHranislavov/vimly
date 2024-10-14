const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const baseRouter = require("./routes/baseRouter");
const path = require("path");

const app = express();
const port = process.env.PORT || 3005;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const checkToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(200).json({ message: "Working!" });
  }
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "This path is protected" });
  }

  if (token !== process.env.TOKEN) {
    return res.status(403).json({ message: "This path is protected" });
  }

  next();
};

app.use(cors());
app.use(express.json());
app.use(checkToken);
app.use("/", baseRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
