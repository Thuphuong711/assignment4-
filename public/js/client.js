console.log("The file client.js is loaded.");

async function ajaxGET(url) {
  let res = null;
  res = await fetch(url);
  if (res.ok) {
    return await res.text();
  } else {
    return "<div></div>";
  }
}


//JAX call to the server, where the server sends a snippet of JSON
async function getListJsonFood() {
  let listFood = [];
  const res = await fetch("http://localhost:8000/food?format=json");
  listFood = await res.json();

  const clientWidth = document.getElementById("container").clientWidth;
  // if (clientWidth > 300 && clientWidth < 600) {
  //   let str = "<ul>";
  //   str += "<li>";
  //   str += "hello";
  //   str += "</li>";
  //   str += "</ul>";
  //   document.getElementById("info-json").innerHTML = str;
  // } else {
    let str = "<table>";
    str += "<tr>";
    str += "<th>Name</th>";
    str += "<th>Time</th>";
    str += "<th>Serving</th>";
    str += "<th>Rating</th>";
    str += "<th>Cuisine</th>";
    str += "</tr>";
    for (let i = 0; i < listFood.length; i++) {
      str += "<tr>";
      str += "<td>" + listFood[i].name + "</td>";
      str += "<td>" + listFood[i].time + "</td>";
      str += "<td>" + listFood[i].serving + "</td>";
      str += "<td>" + listFood[i].rating + "</td>";
      str += "<td>" + listFood[i].cuisine + "</td>";
      str += "</tr>";
    }
    str += "</table>";
    document.getElementById("info-json").innerHTML = str;
 // }
}

async function getTable() {
  const data = await ajaxGET("http://localhost:8000/table?format=html");
  // console.log(data);
  document.getElementById("table").innerHTML = data;
}

document.getElementById("show-table").addEventListener("click", function (e) {
  getTable();
});

document.getElementById("hide-table").addEventListener("click", function (e) {
  document.getElementById("table").innerHTML = "<div></div>";
});

getListJsonFood();
getListFood();

//AJAX call to the server, where the server sends a snippet of HTML
async function getListFood() {
  const data = await ajaxGET("http://localhost:8000/food?format=html");
  //   console.log(data);
  document.getElementById("list-food").innerHTML = data;
}