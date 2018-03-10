const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const { connection } = require("./db/mysql_setup");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("<h1> Hello Nishant</h1>");
});

app.post("/addNewPatient", (req, res) => {
  const myQuery = `INSERT INTO patients SET ?;
  SELECT 
  patient_id,firstName,lastName 
  FROM patients 
  WHERE patient_id=LAST_INSERT_ID();
  `;
  connection.query(myQuery, req.body, (err, results, fields) => {
    err ? console.log(err) : console.log(results[1][0]);
    res.send(results[1][0]);
    // results[1][0]["LAST_INSERT_ID()"]
  });
});

app.listen(3000, () => {
  console.log("app started on port 3000");
});
