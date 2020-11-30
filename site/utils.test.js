const { getRowInsertionIndex } = require("./utils");

test('getRowInsertionIndex should return 0th index if no data is there', () => {
    expect(getRowInsertionIndex(2)).toBe(0);
})

test('getRowInsertionIndex should return sorted index for new row', () => {
    getRowInsertionIndex(1);
    getRowInsertionIndex(5);
    // will insert at index 2
    expect(getRowInsertionIndex(3)).toBe(2);
})

test('getRowInsertionIndex should delete existing row and insert new row on appropriate index', () => {
    // delete row at index 2 and insert data at index 0 as -1 is the smallest value
    expect(getRowInsertionIndex(-1, 2)).toBe(0);
})
