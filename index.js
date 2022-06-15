const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const moment = require("moment");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blood_donation",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

app.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "Welcome to Blood Donation System",
  });
});

app.post("/signup", (req, res) => {
  const { name, email, phone_number, blood_group, address, password } =
    req.body;
  console.table(req.body);
  connection.query(
    "INSERT INTO users (role_id,name,email,password,phone,blood_group,address,dat) VALUES (?,?,?,?,?,?,?,?)",
    [
      2,
      name,
      email,
      password,
      phone_number,
      blood_group,
      address,
      // format date like this 29/03/2020 12:18:17
      moment().format("YYYY/MM/DD HH:mm:ss"),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        res.send({
          status: 200,
          message: "User Registered Successfully",
        });
      }
    }
  );
  // res.send({
  //   status: 200,
  //   message: "Under Construction",
  // });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        console.log(result[0]);
        if (result[0].id === undefined) {
          res.send({
            status: 404,
            message: "Invalid Email or Password",
          });
        } else {
          res.send({
            status: 200,
            message: "Login Successful",
            data: result[0],
          });
        }
      }
    }
  );
});

app.get("/get_user_by_id", (req, res) => {
  const { id } = req.query;
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    } else {
      console.log(result[0]);
      if (result[0]?.id === undefined) {
        res.send({
          status: 404,
          message: "Invalid User",
        });
      } else {
        res.send({
          status: 200,
          message: "Fetched User Successfully",
          data: result[0],
        });
      }
    }
  });
});

app.put("/update_user", (req, res) => {
  const { id, name, email, phone, address, blood_group, password, active } =
    req.body;
  console.table(req.body);

  connection.query(
    "UPDATE users SET name = ?, email = ?, phone = ?, address = ?, blood_group = ?, password = ?, active = ? WHERE id = ?",
    [name, email, phone, address, blood_group, password, active, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        res.send({
          status: 200,
          message: "User Updated Successfully",
        });
      }
    }
  );

  // res.send({
  //   status: 200,
  //   message: "test",
  // });
});

app.get("/get_all_hospitals", (req, res) => {
  connection.query("SELECT * FROM hospitals", (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    } else {
      res.send({
        status: 200,
        message: "Fetched Hospitals Successfully",
        data: result,
      });
    }
  });
});

app.get("/get_all_bloodbanks", (req, res) => {
  connection.query("SELECT * FROM blood_banks", (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    } else {
      res.send({
        status: 200,
        message: "Fetched Bloodbanks Successfully",
        data: result,
      });
    }
  });
});

app.get("/get_remaining_donors", (req, res) => {
  const { my_id } = req.query;
  // get all donrs except me
  connection.query(
    "SELECT * FROM users WHERE id != ? AND active != 0 AND role_id != 1",
    [my_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        res.send({
          status: 200,
          message: "Fetched Donors Successfully",
          data: result,
        });
      }
    }
  );
});

app.post("/add_hospital", (req, res) => {
  const { name, address, phone, email, description } = req.body;
  connection.query(
    "INSERT INTO hospitals (h_name,h_email,h_phone,h_add,h_desc,dat) VALUES (?,?,?,?,?,?)",
    [
      name,
      email,
      phone,
      address,
      description,
      moment().format("YYYY/MM/DD HH:mm:ss"),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        res.send({
          status: 200,
          message: "Hospital Registered Successfully",
        });
      }
    }
  );
});

app.delete("/delete_hospital", (req, rest) => {
  const { id } = req.query;
  connection.query(
    "DELETE FROM hospitals WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        rest.send({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        rest.send({
          status: 200,
          message: "Hospital Deleted Successfully",
        });
      }
    }
  );
});

app.post("/add_bloodbank", (req, res) => {
  const { name, address, phone, email, description } = req.body;
  connection.query(
    "INSERT INTO blood_banks (b_name,b_email,b_phone,b_add,b_desc,dat) VALUES (?,?,?,?,?,?)",
    [
      name,
      email,
      phone,
      address,
      description,
      moment().format("YYYY/MM/DD HH:mm:ss"),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        res.send({
          status: 200,
          message: "Bloodbank Registered Successfully",
        });
      }
    }
  );
});

app.delete("/delete_bloodbank", (req, rest) => {
  const { id } = req.query;
  connection.query(
    "DELETE FROM blood_banks WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        rest.send({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        rest.send({
          status: 200,
          message: "Bloodbank Deleted Successfully",
        });
      }
    }
  );
});

app.get("/get_all_users", (req, res) => {
  connection.query("SELECT * FROM users WHERE  role_id != 1", (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    } else {
      res.send({
        status: 200,
        message: "Fetched Users Successfully",
        data: result,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
