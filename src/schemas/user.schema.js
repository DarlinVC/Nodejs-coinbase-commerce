"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: mongoose.SchemaTypes.Decimal128,
    required: true,
    default: 0.0,
  },
  total_spent: {
    type: mongoose.SchemaTypes.Decimal128,
    required: true,
    default: 0.0,
  },
  accountStatus: {
    type: String,
    required: true,
    default: "permitted",
  },
  rol: {
    type: String,
    required: true,
    default: "User",
  }
});
/* 
  It checks each time save is executed to the userSchema, 
  if the password is being modified, if not, then it will encrypt it.
*/
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

module.exports = mongoose.model("users", userSchema);
