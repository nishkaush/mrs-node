const express = require("express");
const { connection } = require("./../../db/mysql_setup");

const medicineRouter = express.Router();

medicineRouter.post("/addNewMedicine", (req, res) => {
  const myQuery = `
  INSERT INTO medicines SET ?;
  `;
  connection.query(myQuery, req.body, (err, results, fields) => {
    err ? res.send(err) : res.send(results);
  });
});

module.exports = { medicineRouter };
