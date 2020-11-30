const lastChangeBidInAscOrder = [];

// Returns index to insert row in Ascending order
function getRowInsertionIndex(lastChangeBidValue, existingRowIndex) {
    if (existingRowIndex || existingRowIndex === 0) {
        lastChangeBidInAscOrder.splice(existingRowIndex, 1);
    }
    if (lastChangeBidInAscOrder.length === 0) {
        lastChangeBidInAscOrder.push(lastChangeBidValue);
        return 0;
    } else {
        for (let i = 0; i < lastChangeBidInAscOrder.length; i++) {
            if (lastChangeBidValue < lastChangeBidInAscOrder[i]) {
                lastChangeBidInAscOrder.splice(i, 0, lastChangeBidValue);
                return i;
            }
        }
        lastChangeBidInAscOrder.splice(lastChangeBidInAscOrder.length, 0, lastChangeBidValue);
        return lastChangeBidInAscOrder.length - 1;
    }
  }

  // populate data in every cell of a row
function populateRowCells(columns, row, data) {
    columns.forEach((key, index) => {
        const cell = row.insertCell(index);
        cell.innerHTML = data[key];
    });
}

// calculate mid price
function calculateMidPrice(bestBid, bestAsk) {
    return (bestBid + bestAsk)/2;
}

exports.getRowInsertionIndex = getRowInsertionIndex;
exports.populateRowCells = populateRowCells;
exports.calculateMidPrice = calculateMidPrice;