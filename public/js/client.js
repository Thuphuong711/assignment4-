console.log("The file client.js is loaded.");

async function ajaxGET(url) {
  let res = null;
  res = await fetch(url);
  return await res.text();
}

async function getListFood() {
  const data = await ajaxGET("http://localhost:8000/food?format=html");
  //   console.log(data);

  document.getElementById("list-food").innerHTML = data;
}
getListFood();

async function getListJsonFood() {
  let listFood = [];
  const res = await fetch("http://localhost:8000/food?format=json");
  listFood = await res.json();

  // let str = "<ul>"
  // for (let i = 0; i < parsedData.length; i++) {
  //     str += "<li>" + parsedData[i] + "</li>";
  // }
  // str += "</ul>";
  const clientWidth = document.getElementById("container").clientWidth;
  console.log(clientWidth > 300 && clientWidth < 400)
  if (clientWidth > 300 && clientWidth < 600) {
    let str = "<ul>";
    str += "<li>";
    str += "hello";
    str += "</li>";
    str += "</ul>";
    document.getElementById("info-json").innerHTML = str;
  } else {
    let str = "<table>";
    str += "<tr>";
    str += "<th>Name</th>";
    str += "<th>Cuisine</th>";
    str += "<th>Time</th>";
    str += "<th>Serving</th>";
    str += "<th>Rate</th>";
    str += "</tr>";
    for (let i = 0; i < listFood.length; i++) {
      str += "<tr>";
      str += "<td>" + listFood[i].name + "</td>";
      str += "<td>" + listFood[i].des + "</td>";
      str += "</tr>";
    }
    str += "</table>";
    document.getElementById("info-json").innerHTML = str;
  }
}

getListJsonFood();

async function getTable() {
  const data = await ajaxGET("http://localhost:8000/table?format=html");
  console.log(data);
  document.getElementById("table").innerHTML = data;
}

document.getElementById("show-table").addEventListener("click", function (e) {
  getTable();
});

document.getElementById("hide-table").addEventListener("click", function (e) {
  document.getElementById("table").innerHTML = "<div></div>";
});
