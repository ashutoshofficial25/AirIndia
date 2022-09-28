const express = require("express");
const { connect } = require("./src/config/database");
const apiRouter = require("./src/routes/index");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
    data: { name: "Ashutosh" },
  });
});

const PORT = 5000;

app.listen(PORT, async () => {
  //This callback will be executed everytime sever restarts
  await connect();
  console.log("database connected");
  console.log(`Server started on-localhost:${PORT}`);
});
