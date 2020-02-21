const fs = require("fs");
const path = require("path");

const saveUser = user => {
  const userName = user.username;
  const fileUser = path.join(
    __dirname,
    "../../",
    "db",
    "/users",
    `${userName}.json`
  );

  fs.writeFile(fileUser, JSON.stringify(user), function(err) {
    if (err) throw err;
    console.log(`New ${userName}.json was created`);
  });

  // fs.access(fileUser, function(error) {
  //   if (error) {
  //     fs.writeFile(fileUser, JSON.stringify(user), function(err) {
  //       if (err) throw err;
  //       console.log(`New ${userName}.json was created`);
  //     });
  //   } else {
  //     console.log("Username already exists! Choose another one and try again!");
  //   }
  // });
};

const checkUser = user => {
  const userName = user.username;
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

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body = body + data;
      console.log("Incoming data!!!!");
    });

    request.on("end", function() {
      const user = JSON.parse(body);
      if (checkUser(user)) {
        const fileUser = path.join(
          __dirname,
          "../../",
          "db",
          "/users",
          `${user.username}.json`
        );

        fs.stat(fileUser, function(err, stat) {
          if (err == null) {
            console.log("Error! User already exists!");
          } else if (err.code == "ENOENT") {
            saveUser(user);
            console.log("New user registered");
          }
        });

        const success = {
          status: "success",
          user: user
        };

        response.writeHead(200, {
          "Content-type": "application/json"
        });
        response.write(JSON.stringify(success));
        response.end();
      } else {
        const error = {
          status: "error"
        };

        response.writeHead(400, {
          "Content-type": "application/json"
        });
        response.write(JSON.stringify(error));
        response.end();
      }
    });
  }
};

module.exports = signUpRoute;
