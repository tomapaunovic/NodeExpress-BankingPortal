const express = require("express");
const router = express.Router();
const { accounts, writeJSON } = require("../data");

router.get("/transfer", function (req, res) {
  res.render("transfer");
});

router.post("/transfer", function (req, res) {
  let { from, to, amount } = req.body;
  amount = parseInt(amount);
  accounts[from].balance -= amount;
  accounts[to].balance += amount;
  writeJSON();
  res.render("transfer", { message: "Transfer Completed" });
});

router.get("/payment", function (req, res) {
  res.render("payment", { account: accounts.credit });
});

router.post("/payment", function (req, res) {
  let { amount } = req.body;
  amount = parseInt(amount);
  accounts.credit.balance -= amount;
  accounts.credit.available += amount;
  writeJSON();
  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});

module.exports = router;