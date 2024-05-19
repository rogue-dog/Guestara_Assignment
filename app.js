const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");

const categoryRoutes = require("./routes/Category");
const subCategoryRoutes = require("./routes/SubCategory");
const itemRoutes = require("./routes/Item");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/items", itemRoutes);

// MongoDB connection
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const port = config.port;
app.listen(port, () => console.log(`Server running on port ${port}`));
