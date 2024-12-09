const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./Routes/user");
const { dbConnection } = require("./utils/dbConnection");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

dbConnection(process.env.DB_URL)
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("DB failed to connect"));

app.get("/", (req, res) => res.send("Hey"));
app.use("/api/v1/user", userRouter);

app.post("/set-cookie", (req, res) => {
  res.cookie("testing", "New-Cookie");

  res.json({ msg: "Cookies Set" });
});

app.listen(process.env.PORT, () => console.log("Server Started!"));
