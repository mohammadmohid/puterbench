const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { createServerlessHandler } = require("@vercel/node");

const { connectToMongoDB } = require("./config/mongodb.js");
const userRoutes = require("./routes/userRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const port = process.env.PORT || 5000;

const app = express();
connectToMongoDB();

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://puterbench.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Accept", "Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (res) => {
  res.send("Yes, the server is running!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Export as a serverless function
module.exports = createServerlessHandler(app);
