const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      reqired: true,
    },
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

userSchema.pre("save", async (next) => {
  const user = this;
  const hash = await bcrypt(this.password, 12);
  this.password = hash;
  next();
});

userSchema.method.isValidPassword = async (password) => {
  const user = this;
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
