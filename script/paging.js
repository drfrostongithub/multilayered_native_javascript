const itemsPerPage = 15;
let currentPage = 1;

// Update Pagination Controls
function updatePagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add(currentPage === i ? "active" : null);
      button.addEventListener("click", () => {
        currentPage = i;
        displayTable(tableData);
      });
      paginationContainer.appendChild(button);
    }
  }
}

function disablePagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.style.display = "none";
}

function enablePagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.style.display = "block";
}
