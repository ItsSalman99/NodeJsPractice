const express = require("express");
const mongoose = require("mongoose");
const UserController = require("./controllers/UserController");
const app = express();
const port = 3000;

app.use(express.json()); //to accept json data from request with the help of express json

mongoose.connect("mongodb://localhost:27017/practice", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Hello Node!");
});

// Routes
app.get("/api/users", UserController.getAllUsers);
app.post("/api/users/store", UserController.storeNewUser);
app.get("/api/users/delete", UserController.deleteUser);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
