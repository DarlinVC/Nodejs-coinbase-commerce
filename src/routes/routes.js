"use strict";

// librarys
const express = require("express");
const router = express.Router();

// middlewares
const { verifyToken } = require("../middlewares/auth.middleware");

// controllers
const {CoinbasePayment, PaymentHandler} = require("../controllers/CriptoPay.controlller");
const { signUp, signIn } = require("../controllers/auth.controller");

// signUp and signIn
router.post("/signUp", signUp);
router.post("/signIn", signIn);

// Cripto Routes 
router.post("/create-charge", verifyToken, CoinbasePayment);
router.post("/payment-status", verifyToken, PaymentHandler);
