const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm.trim() !== "") {
    const filteredData = tableData.filter((row) => {
      return Object.values(row).some((value) => {
        return String(value).toLowerCase().includes(searchTerm);
      });
    });
    currentPage = 1;
    displayTable(filteredData);
    disablePagination();
  } else {
    // If search term is empty, display the original tableData
    currentPage = 1;
    displayTable(tableData);
    enablePagination();
  }
});
