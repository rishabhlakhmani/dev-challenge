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

module.exports.getRowInsertionIndex = getRowInsertionIndex;