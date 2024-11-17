let sortOrder = "asc";
let sortColumn = "";

// Add click event listeners to table headers
const headers = document.querySelectorAll("#data-table th");
headers.forEach((header) => {
  header.addEventListener("click", () => {
    const column = header.textContent.trim();
    sortTable(column);
  });
});

function sortTable(column) {
  tableData.sort((a, b) => {
    if (a[column] < b[column]) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (a[column] > b[column]) {
      return sortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  sortOrder = sortOrder === "asc" ? "desc" : "asc";
  displayTable(tableData);
}
