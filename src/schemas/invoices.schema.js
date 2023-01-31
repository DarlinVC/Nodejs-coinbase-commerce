"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cryptoSchema = new Schema({
  _idUser: {
    type: String,
    required: true,
  },
  _idInvoice: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("invoices", cryptoSchema);
