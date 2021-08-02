"use strict";
var hours = [
   " 6:00 am ",
   " 7:00 am ",
   " 8:00 am ",
   " 9:00 am ",
   " 10:00 am ",
   " 11:00 am ",
   " 12:00 pm ",
   " 1:00 pm ",
   " 2:00 pm ",
   " 3:00 pm ",
   " 4:00 pm ",
   " 5:00 pm ",
   " 6:00 pm ",
   " 7:00 pm ",
];

function Branch(branchName, maxCust, minCust, avgCookie) {
  this.branchName = branchName;
  this.maxCustPerHour = maxCust;
  this.minCustPerHour = minCust;
  this.avgCookiesPerHour = avgCookie;
  this.custPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookies = 0;
}

Branch.prototype.calCust = function (maxCustPerHour, minCustPerHour) {
  this.custPerHour = calCustPerHour(maxCustPerHour, minCustPerHour);
};

Branch.prototype.calCookies = function (avgCookiesPerHour, custPerHour) {
  this.cookiesPerHour = calCookiesPerHour(avgCookiesPerHour, custPerHour)[0];
  this.totalCookies = calCookiesPerHour(avgCookiesPerHour, custPerHour)[1];
};

Branch.prototype.render = function () {
  var row = document.createElement("tr");
  table.appendChild(row);
  var branchHead = document.createElement("th");
  row.appendChild(branchHead);
  branchHead.textContent = this.branchName;

  for (var j = 0; j < this.cookiesPerHour.length; j++) {
    var tableData = document.createElement("td");
    row.appendChild(tableData);
    tableData.textContent = this.cookiesPerHour[j];
  }

  var branchTotal = document.createElement("th");
  row.appendChild(branchTotal);
  branchTotal.textContent = this.totalCookies;
};

function calCustPerHour(maxCustPerHour, minCustPerHour) {
  var randNum1;
  var customerNum = new Array();
  for (var i = 0; i < hours.length; i++) {
    randNum1 = Math.floor(
      Math.random() * (maxCustPerHour - minCustPerHour + 1) + minCustPerHour
    );
    customerNum[i] = randNum1;
  }
  return customerNum;
}

function header() {
  var headers = document.createElement("tr");
  table.appendChild(headers);
  var headEmpty = document.createElement("th");
  headers.appendChild(headEmpty);
  headEmpty.textContent = " ";
  for (var i = 0; i < hours.length; i++) {
    var headData = document.createElement("th");
    headers.appendChild(headData);
    headData.textContent = hours[i];
  }
  var headDataTotal = document.createElement("th");
  headers.appendChild(headDataTotal);
  headDataTotal.textContent = " Daily Location Total";
}

function footerSection() {
  var totalRow = document.createElement("tr");
  var footerCell = document.createElement("th");
  footerCell.textContent = "Totals";
  totalRow.appendChild(footerCell);

  var sum;
  for (var i = 0; i <= hours.length; i++) {
    var footerCell = document.createElement("th");
    sum = 0;
    for (var j = 0; j < locations.length; j++) {
      if (i == hours.length) {
        sum = sum + locations[j].totalCookies;
      } else {
        sum = sum + locations[j].cookiesPerHour[i];
      }
    }
    footerCell.textContent = sum;
    totalRow.appendChild(footerCell);
  }
  table.appendChild(totalRow);
}

function calCookiesPerHour(avgCookiesPerHour, custPerHour) {
  var cookies = [0];
  var totalCookies = 0;
  for (var i = 0; i < hours.length; i++) {
    cookies[i] = Math.round(custPerHour[i] * avgCookiesPerHour);
    totalCookies = totalCookies + cookies[i];
  }
  return [cookies, totalCookies];
}

var Seattle = new Branch("Seattle", 65, 23, 6.3);
Seattle.calCust(65, 23);
Seattle.calCookies(6.3, Seattle.custPerHour);

var Tokyo = new Branch("Tokyo", 24, 3, 1.2);
Tokyo.calCust(24, 3);
Tokyo.calCookies(1.2, Tokyo.custPerHour);

var Dubai = new Branch("Dubai", 38, 11, 3.7);
Dubai.calCust(38, 11);
Dubai.calCookies(3.7, Dubai.custPerHour);

var Paris = new Branch("Paris", 38, 20, 2.3);
Paris.calCust(38, 20);
Paris.calCookies(2.3, Paris.custPerHour);

var Lima = new Branch("Lima", 1.6, 2, 4.6);
Lima.calCust(16, 2);
Lima.calCookies(4.6, Lima.custPerHour);
var locations = [Seattle, Tokyo, Dubai, Paris, Lima];

var body = document.getElementById("salesBody");
var table = document.createElement("table");
body.appendChild(table);

var form = document.getElementById("createLocationForm");
console.log(form);
form.addEventListener("submit", getValue);

function getValue(event) {
  event.preventDefault();
  var name = event.target.locationName.value;
  var minCust = Number(event.target.minCust.value);
  var maxCust = Number(event.target.maxCust.value);
  var avgCookie = Number(event.target.avgCookie.value);
  console.log(name, maxCust, minCust, avgCookie);

  var newLocation = new Branch(name, maxCust, minCust, avgCookie);
  newLocation.calCust(maxCust, minCust);
  newLocation.calCookies(avgCookie, newLocation.custPerHour);
  locations.push(newLocation);

  table.innerHTML = " ";
  event.target.locationName.value = "";
  event.target.maxCust.value = "";
  event.target.minCust.value = "";
  event.target.avgCookie.value = "";

  header();
  for (var i = 0; i < locations.length; i++) {
    locations[i].render();
  }

  footerSection();
}


