const express = require("express");
let router = express.Router();

const path = require("path");
const fs = require("fs");

const bodyParser = require("body-parser");

// const uuid = require("uuid/v4");
const shortid = require("shortid");
let usersDataBase = require("../db/all-users.json");

const checkUser = user => {
  const userName = user.user;
  const userPhone = user.telephone.replace(/\s/g, "");
  const userPass = user.password;
  const userEmail = user.email;
  if (
    typeof userName === "string" &&
    !isNaN(Number(userPhone)) &&
    typeof userPass === "string" &&
    typeof userEmail === "string"
  )
    return true;
  else return false;
};

const saveUser = user => {
  console.log("user :", user);

  const usersDataBasePath = path.join(
    __dirname,
    "../",
    "db/",
    "/all-users.json"
  );

  const userDirPath = path.join(
    __dirname,
    "../",
    "db/",
    "users",
    `/${user.user}`
  );

  fs.readFile(usersDataBasePath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let users = JSON.parse(data);
      user.id = shortid.generate();
      users.push(user);
      usersResult = JSON.stringify(users);
      fs.writeFile(usersDataBasePath, usersResult, "utf-8", err => {
        if (err) {
          return console.log(err);
        }
        console.log("New user already saved!");
      });
      fs.mkdir(userDirPath, err => {
        if (err) {
          return console.log(err);
        }
      });
    }
  });
};

router.post("/*", (req, res) => {
  // let body = "";

  // req.on("data", data => {
  //   body = body + data;
  //   console.log("Incoming data!");
  // });

  // req.on("end", () => {

  // });

  const userToCheckAndSave = req.body;

  if (checkUser(userToCheckAndSave)) {
    console.log("Validation: success.");
    saveUser(userToCheckAndSave);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ status: "success", user: userToCheckAndSave }));
    res.end();
  } else {
    console.log("Validation: error.");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ status: "Error! Check type of input value!" }));
    res.end();
  }
});

router.get("/", (req, res) => {
  console.log("object :", req);
  let userId = req.url.slice(req.url.lastIndexOf("/") + 1);
  const userById = usersDataBase.find(user => user.id.toString() === userId);
  console.log("userId :", userId);

  if (userById) {
    res.setHeader("Content-Type", "application/json");
    res.send(userById);
    res.end();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({
        status: "not found"
      })
    );
    res.end();
  }
});

module.exports = router;
