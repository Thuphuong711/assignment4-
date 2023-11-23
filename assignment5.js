// https://expressjs.com/en/guide/routing.html

// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

// http://localhost:8000
app.get("/", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/html/index.html", "utf8");
  res.send(doc);
});

//  http://localhost:8000/food?format=json
app.get("/food", function (req, res) {
//   let name = req.query["name"];
//   let color = req.query["color"]
//   res.send({ name, color });


  let formatOfResponse = req.query["format"];
  if (formatOfResponse == "html") {
      // MIME type
      res.setHeader("Content-Type", "text/html");
      res.send(fs.readFileSync("./app/data/food.html", "utf8"));

  } else if (formatOfResponse == "json") {
      // MIME type
      res.setHeader("Content-Type", "application/json");
      res.send(fs.readFileSync("./app/data/food.js", "utf8"));

  } else {
      // just send JSON message
      res.send({ status: "fail", msg: "Wrong format!" });
  }
});


//table
app.get("/table", function(req,res){
    res.setHeader("Content-type","text/html");
    res.send(fs.readFileSync("./app/data/table.html","utf-8"));
});

// app.get("/helloHTML", function (req, res) {
//   // hard-coded HTML
//   res.send("<html><head><title>Hi!</head><body><p>Hello!</p></body></html>");
// });

// app.get("/date", function (req, res) {
//   // set the type of response:
//   res.setHeader("Content-Type", "application/json");
//   let options = {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   let d = new Date();

//   res.send({ currentTime: d.toLocaleDateString("en-US", options) });
// });

// for resource not found (i.e., 404)
app.use(function (req, res, next) {
  // this could be a separate file too - but you'd have to make sure that you have the path
  // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
  res
    .status(404)
    .send(
      "<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>"
    );
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
  console.log("Assignment 5 is on the " + port + "port!");
});
