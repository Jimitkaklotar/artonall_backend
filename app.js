var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// ✅ Routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userRouter = require("./routes/User");
var AdminRouter = require("./routes/Admin");
var ProductRouter = require("./routes/Product");

// ✅ MongoDB connection string
const MONGODB_CONNECT_URL =
  "mongodb+srv://jimit_art_on_all:ZHQi4OOLCdrtiwh0@cluster0.qt6kx6h.mongodb.net/ArtOnAll";

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(MONGODB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ArtOnAll", // database name
  })
  .then(() => console.log("✅ MongoDB Atlas Connected!"))
  .catch((error) =>
    console.log("❌ MongoDB connection error:", error.message)
  );

var app = express();
app.use(cors());

// ✅ View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

// ✅ Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user", userRouter);
app.use("/admin", AdminRouter);
app.use("/product", ProductRouter);

// ✅ Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// ✅ Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
