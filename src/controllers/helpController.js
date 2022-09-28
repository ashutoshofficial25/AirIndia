const helpDetails = (req, res) => {
  res.status(200).send({
    msg: "Success",
    data: {
      name: "Ashutosh Maurya",
      ct: 9695734655,
    },
  });
};

module.exports = { helpDetails };
