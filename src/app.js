const fs = require("fs");
const path = require("path");
const express = require("express");
const { accounts, users, writeJSON } = require('./data');

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index", { title: "Account Summary", accounts: accounts });
});
app.get("/savings", function (req, res) {
  res.render("account", { account: accounts.savings });
});
app.get("/checking", function (req, res) {
  res.render("accoiunt", { account: accounts.checking });
});
app.get("/credit", function (req, res) {
  res.render("account", { account: accounts.credit });
});
app.get("/profile", function (req, res) {
  res.render("profile", { user: users[0] });
});
app.get("/transfer", function (req, res) {
  res.render("transfer");
});
app.post("/transfer", function (req, res) {
  let { from, to, amount } = req.body;
  amount = parseInt(amount);
  accounts[from].balance -= amount;
  accounts[to].balance += amount;
  writeJSON();
  res.render("transfer", {message: "Transfer Completed"});
});
app.get("/payment", function (req, res) {
    res.render("payment", {account: accounts.credit});
  });
  app.post("/payment", function (req, res) {
    let { amount } = req.body;
    amount = parseInt(amount);
    accounts.credit.balance -= amount;
    accounts.credit.available += amount;
    writeJSON();
    res.render("payment", { message: "Payment Successful", account: accounts.credit });
  });

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:3000`)
);
