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
    err ? console.log(err) : res.send(results[1][0]);
  });
});

patientRouter.get("/search", (req, res) => {
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

patientRouter.get("/deletePatient/:id", (req, res) => {
  const myQuery = `
  DELETE FROM patients WHERE patient_id=?
  `;
  connection.query(myQuery, req.params.id, (err, results, fields) => {
    err ? res.send(err) : res.send(results);
  });
});

module.exports = { patientRouter };
