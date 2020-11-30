const { getRowInsertionIndex, populateRowCells, calculateMidPrice } = require("./utils");

describe('getRowInsertionIndex', () => {
    test('should return 0th index if no data is there', () => {
        expect(getRowInsertionIndex(2)).toBe(0);
    })

    test('should return sorted index for new row', () => {
        getRowInsertionIndex(1);
        getRowInsertionIndex(5);
        // will insert at index 2
        expect(getRowInsertionIndex(3)).toBe(2);
    })

    test('should delete existing row and insert new row on appropriate index', () => {
        // delete row at index 2 and insert data at index 0 as -1 is the smallest value
        expect(getRowInsertionIndex(-1, 2)).toBe(0);
    })
})

describe('populateRowCells', () => {
    test('should pupate data in every cell', () => {
        const columns = ['col1', 'col2'];
        const data = {'col1': 1, 'col2': 2}

        document.body.innerHTML =
        '<table id="currency-table">' +
        '  <tbody>' +
        '  </tbody>' +
        '</table>';
        const tbodyRef = document.getElementById("currency-table").querySelector("tbody");
        const row = tbodyRef.insertRow(0);
        populateRowCells(columns, row, data);
        expect(document.getElementById("currency-table").rows[0].cells[0].innerHTML).toBe("1");
    })
})

describe('calculateMidPrice', () => {
    test('should calculate mid of 2 numbers', () => {
        expect(calculateMidPrice(2,4)).toBe(3);
    })
})
