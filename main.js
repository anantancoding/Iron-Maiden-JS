let data = response.results;

function renderTable(data) {
  // we take the table
  let table = document.getElementById("table");
  table.innerHTML = "";
  // we create the table head
  let thead = document.createElement("thead");
  // we create the table head cells and add text to them
  let th1 = document.createElement("th");
  th1.innerHTML = "Year";
  let th2 = document.createElement("th");
  th2.innerHTML = "Title";
  let th3 = document.createElement("th");
  th3.innerHTML = "Country";
  let th4 = document.createElement("th");
  th4.innerHTML = "Cover";

  // append the table head cells to the table head
  thead.appendChild(th1);
  thead.appendChild(th2);
  thead.appendChild(th3);
  thead.appendChild(th4);
  // append the table head to the table
  table.appendChild(thead);
  let tbody = document.createElement("tbody");
  for (let i = 0; i < data.length; i++) {
    /* console.log("item " + i, data[i]); */
    var tr = document.createElement("tr");

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.innerHTML = checkYear(data, i);
    td2.innerHTML = data[i].title;
    td3.innerHTML = checkCountry(data, i);
    // create image
    var img = checkMediaType(data, i);
    td4.appendChild(img);

    /* if (data[i].cover_image.slice(-3) !== "gif") {
      var img = document.createElement("img");
      img.src = data[i].cover_image;

      img.width = 50;
      td3.appendChild(img);
    } else {
      var placeholder =
        "https://www.maas-natur.de/media/bb/65/10/1620865384/P155_P157.jpg";
      var img = document.createElement("img");
      img.src = placeholder;
      img.width = 50;
      td3.appendChild(img);
    } */

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
}

renderTable(data);

function checkMediaType(data, i) {
  if (data[i].cover_image.slice(-3) !== "gif") {
    var img = document.createElement("img");
    img.src = data[i].cover_image;

    img.width = 50;
    return img;
  } else {
    var placeholder =
      "https://www.maas-natur.de/media/bb/65/10/1620865384/P155_P157.jpg";
    var img = document.createElement("img");
    img.src = placeholder;
    img.width = 50;
    return img;
  }
}
function checkYear(data, i) {
  if (data[i].year === undefined) {
    var placeholder = "year not available";
    return placeholder;
  } else {
    return data[i].year;
  }
}
// create checkCountry function
function checkCountry(data, i) {
  if (data[i].country === undefined) {
    var placeholder = "country not available";
    return placeholder;
  } else {
    return data[i].country;
  }
}

function chooseTableColumn(buttonValue) {
  console.log(buttonValue);
  // select the table body
  let table = document.getElementById("table");
  // remove everything inside the table body
  table.innerHTML = "";

  if (buttonValue === "year") {
    let thead = document.createElement("thead");
    let th = document.createElement("th");
    th.innerHTML = "Year";
    thead.appendChild(th);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    for (let i = 0; i < data.length; i++) {
      var tr = document.createElement("tr");

      var td = document.createElement("td");
      td.innerHTML = checkYear(data, i);
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  } else if (buttonValue === "title") {
    let thead = document.createElement("thead");
    let th = document.createElement("th");
    th.innerHTML = "Title";
    thead.appendChild(th);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    for (let i = 0; i < data.length; i++) {
      var tr = document.createElement("tr");

      var td = document.createElement("td");
      td.innerHTML = data[i].title;
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  } else if (buttonValue === "country") {
    let thead = document.createElement("thead");
    let th = document.createElement("th");
    th.innerHTML = "Country";
    thead.appendChild(th);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    for (let i = 0; i < data.length; i++) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.innerHTML = data[i].country;
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  } else if (buttonValue === "cover_image") {
    let thead = document.createElement("thead");
    let th = document.createElement("th");
    th.innerHTML = "Covers";
    thead.appendChild(th);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    for (let i = 0; i < data.length; i++) {
      var tr = document.createElement("tr");

      var td = document.createElement("td");
      var img = checkMediaType(data, i);
      td.appendChild(img);
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  } else {
    renderTable(data);
  }
}

// eaxtract all buttons
var buttons = document.querySelectorAll(".btn");
console.log(buttons);
// loop over the button list
buttons.forEach((button) => {
  console.log(button);
  // add an event to each button individually
  button.addEventListener("click", function (e) {
    // call chooseTableColumn function and send the event target value
    chooseTableColumn(e.target.value);
  });
});

function createSelectOptions() {
  var years = [];
  data.forEach((object) => {
    if (object.year !== undefined) {
      years.push(object.year);
    }
  });

  var singleYears = [];
  years.forEach((year) => {
    if (!singleYears.includes(year)) {
      singleYears.push(year);
    }
  });
  singleYears.sort();
  console.log(singleYears);
  // create option elements and append them to select element

  const select = document.getElementById("choose-list");
  singleYears.forEach((singleYear) => {
    const option = document.createElement("option");
    option.innerHTML = singleYear;
    option.value = singleYear;
    select.appendChild(option);
  });
}

// function creatEvents(years) {
//   const select = document.getElementById("singelYears");
//   const checkboxes = document.querySelectorAll("input[type='checkbox']");
//   select.addEventListener("change", function () {
//     Filter(singelYears);
//   });
// }
createSelectOptions();

const select = document.getElementById("choose-list");

select.addEventListener("change", function () {
  filterByYear(select.value);
});

function filterByYear(year) {
  console.log(`data`, data);
  // morden JS spike
  console.log(year);
  var filterData = data.filter((album) => {
    return (year !== "all" && album.year === year) || year === "all";
    //   || means "or" && means "and"
  });
  console.log(filterData);
  renderTable(filterData);
}

/*
var headBtn = document.getElementById("head-btn");

headBtn.addEventListener("click", function () {
  console.log("button");
});

tbody.addEventListener("click", function () {
  console.log("tbody");
   tbody.innerHTML = ""
}); */
