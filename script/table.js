let tableData = [];
let editingIndex = -1;

// Fetch mock
fetch("../assets/mock.csv")
  .then((response) => response.text())
  .then((csvText) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        tableData = results.data;
        displayTable(tableData);
      },
    });
  });

const groupNameMap = {
  1: "Assets",
  2: "Liabilitas",
  3: "Capital",
  4: "Revenue",
  5: "COGS",
  6: "Expenses",
  7: "Other Revenue",
  8: "Other Expenses",
};
const controlAccMap = {
  0: "None",
  2: "Cash/Bank",
  3: "Acc Receivable",
  4: "Acc Payable",
  5: "Fixed Asset",
};
const gainLossAndDept = {
  1: "Y",
  0: "",
};
// Display Table
function displayTable(tableData) {
  const tableBody = document
    .getElementById("data-table")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tableData.length);

  for (let i = startIndex; i < endIndex; i++) {
    const row = tableData[i];
    const tr = document.createElement("tr");
    const columns = [
      "Kode Acc",
      "Nama Acc",
      "Ccy",
      "Group Name",
      "Acc Type",
      "Level",
      "Dept",
      "Gain loss",
      "Control Acc",
      "Parent Acc",
    ];
    columns.forEach((column) => {
      const td = document.createElement("td");
      td.textContent =
        column === "Group Name"
          ? groupNameMap[row[column]]
          : column === "Control Acc"
          ? controlAccMap[row[column]]
          : column === "Gain loss"
          ? gainLossAndDept[row[column]]
          : column === "Dept"
          ? gainLossAndDept[row[column]]
          : row[column] || "";
      tr.appendChild(td);
    });

    const actionsTd = document.createElement("td");
    actionsTd.innerHTML = `
      <button onclick="openEditModal(${i})">Edit</button>
      <button class="delete" onclick="deleteRow(${i})">Delete</button>
    `;
    tr.appendChild(actionsTd);
    tableBody.appendChild(tr);
  }
  updatePagination();
}

function deleteRow(index) {
  tableData.splice(index, 1);
  displayTable(tableData);
}
