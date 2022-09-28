const express = require("express");
const connect = require("./src/config/database");
const router = require("./src/routes/index");
const app = express();

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
    data: { name: "Ashutosh" },
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  connect();

  console.log("database connected");
  console.log(`Server started on-localhost:${PORT}`);
});
