const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const saltRounds = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
});
userSchema.method.isValidPassword = async (password) => {
  const user = this;
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
