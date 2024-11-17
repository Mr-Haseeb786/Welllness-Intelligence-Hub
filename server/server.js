const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/user");
const { dbConnection } = require("./utils/dbConnection");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieParser());

dbConnection(process.env.DB_URL)
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("DB failed to connect"));

app.get("/", (req, res) => res.send("Hey"));
app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT, () => console.log("Server Started!"));
