const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync(
  path.join(__dirname, "json/accounts.json"),
  { encoding: "UTF8" }
);
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, "json/users.json"), {
  encoding: "UTF8",
});
const users = JSON.parse(userData);

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
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, "UTF-8");
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
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, "UTF-8");
    res.render("payment", { message: "Payment Successful", account: accounts.credit });
  });

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:3000`)
);
