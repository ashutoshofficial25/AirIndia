const express = require("express");
const { default: mongoose } = require("mongoose");

const connect = () => {
  console.log("Connection is requested");

  return mongoose.connect("mongodb://localhost:27017/AirIndia");
};

module.exports = { connect };
