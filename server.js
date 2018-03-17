const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const { connection } = require("./db/mysql_setup");
const { patientRouter } = require("./routes/patient/patientRoutes");
const { medicineRouter } = require("./routes/medicine/medicineRoutes");
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

app.use("/patient", patientRouter);
app.use("/medicine", medicineRouter);

app.listen(3000, () => {
  console.log("app started on port 3000");
});
