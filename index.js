const express = require("express");
const { connect } = require("./src/config/database");
const apiRouter = require("./src/routes/index");
const authRouter = require("./src/routes/authRoutes");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
require("./src/utils/auth");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/api", passport.authenticate("jwt", { session: false }), apiRouter);

const PORT = 5000;

app.listen(PORT, async () => {
  //This callback will be executed everytime sever restarts
  await connect();
  console.log("database connected");
  console.log(`Server started on-localhost:${PORT}`);
});
