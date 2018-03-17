const express = require("express");
const { connection } = require("./../../db/mysql_setup");

const patientRouter = express.Router();

patientRouter.post("/addNewPatient", (req, res) => {
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

patientRouter.get("/search", (req, res) => {
  console.log(req.query);
  let myQuery = "";
  if (req.query.queryName === "fullName") {
    myQuery = `
    SELECT 
    patient_id,
    CONCAT(firstName,IF(middleName="","",CONCAT(" ",middleName))," ",lastName) AS fullName,phone 
    FROM patients
    WHERE CONCAT(firstName," ",middleName," ",lastName) LIKE ?;
    `;
  } else {
    myQuery = `
    SELECT 
    patient_id,
    CONCAT(firstName,IF(middleName="","",CONCAT(" ",middleName))," ",lastName) AS fullName,phone 
    FROM patients
    WHERE ${req.query.queryName} LIKE ?
    `;
  }

  connection.query(
    myQuery,
    [`%${req.query.value}%`],
    (err, results, fields) => {
      res.send(results);
    }
  );
});

module.exports = { patientRouter };
