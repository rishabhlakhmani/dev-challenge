/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require("./site/index.html");
// Apply the styles in style.css to the page.
require("./site/style.css");

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

const { getRowInsertionIndex, populateRowCells, calculateMidPrice } = require("./site/utils");

// Change this to get detailed logging from the stomp library
global.DEBUG = false;
const url = "ws://localhost:8011/stomp";
const client = Stomp.client(url);
client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg);
  }
};

const columns = [
  "name",
  "bestBid",
  "bestAsk",
  "openBid",
  "openAsk",
  "lastChangeAsk",
  "lastChangeBid",
];

const midPrireObj = {};

function connectCallback() {
    subscription = client.subscribe("/fx/prices", callback);
}

function callback(message) {
    if (message.body){
        const currencyData = JSON.parse(message.body);
        const tbodyRef = document.getElementById("currency-table").querySelector("tbody");
        if(!(currencyData.name in midPrireObj)) {
            midPrireObj[currencyData.name] = Array(30).fill(0);
        }
        createRow(tbodyRef, currencyData);
    }
}

// Add new row or update existing row
function createRow(tbodyRef, currencyData) {
    let row, rowInsertionIndex;
    const existingRow = document.getElementById(currencyData.name);
    if (!!existingRow) {
        const exitingRowIndex = existingRow.rowIndex - 1;
        tbodyRef.deleteRow(exitingRowIndex);
        rowInsertionIndex = getRowInsertionIndex(currencyData.lastChangeBid,exitingRowIndex);
    } else {
        rowInsertionIndex = getRowInsertionIndex(currencyData.lastChangeBid);
    }
    row = tbodyRef.insertRow(rowInsertionIndex);
    row.id = currencyData.name;
    populateRowCells(columns, row, currencyData);
    const sparkLineCell  = row.insertCell(columns.length);
    const key = currencyData.name;
    const midPrice = calculateMidPrice(currencyData.bestBid, currencyData.bestAsk);
    updateMidPrice(midPrice, key);
    Sparkline.draw(sparkLineCell, midPrireObj[key]);
}

// Update sparkLine cell for every row
function updateSparkLine() {
    for(key in midPrireObj) {
        const sparkLineCell = document.getElementById(key).cells[columns.length];
        const lastMidPrice = midPrireObj[key][midPrireObj[key].length - 1];
        updateMidPrice(lastMidPrice, key);
        Sparkline.draw(sparkLineCell, midPrireObj[key])
    }
}

// update sparkline every second
setInterval(updateSparkLine, 1000);

// update midPrice object property
function updateMidPrice(midPrice, key) {
    midPrireObj[key].shift();
    midPrireObj[key].push(midPrice);
}

client.connect({}, connectCallback, function (error) {
    console.log(error.headers.message);
});
