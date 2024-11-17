const currencies = [
  { code: "IDR", name: "Indonesian Rupiah", std: 1, rate: 1.0 },
  { code: "MYR", name: "Malaysian Ringgit", rate: 2.5 },
  { code: "SGD", name: "Singapura Dollar", rate: 5.0 },
  { code: "YEN", name: "Yen Jepang", rate: 78 },
  { code: "USD", name: "Dollar Amerika", rate: 13.42 },
];

function loadCurrencyList() {
  const currencyTable = document.querySelector("#currencyModal tbody");
  currencyTable.innerHTML = "";

  currencies.forEach((currency, i) => {
    const row = document.createElement("tr");
    const codeCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const rateCell = document.createElement("td");
    const stdCell = document.createElement("td");
    const editButton = document.createElement("button");

    codeCell.textContent = currency.code;
    nameCell.textContent = currency.name;
    rateCell.textContent = currency.rate;
    stdCell.textContent = currency.std === 1 ? "Y" : "";

    editButton.addEventListener("click", () => {
      openEditForm(currency);
    });

    const actionsTd = document.createElement("td");
    actionsTd.innerHTML = `
      <button onclick="openEditCurrency(${i})">Edit</button>
      <button class="delete" onclick="deleteCurrencyRow(${i})">Delete</button>
    `;

    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(rateCell);
    row.appendChild(stdCell);
    row.appendChild(actionsTd);

    currencyTable.appendChild(row);

    row.addEventListener("click", () => {
      document.getElementById("editCcy").value = currency.code;
      document.getElementById(
        "currencySelect"
      ).value = `${currency.code} Selected !`;
    });
  });
}

function openCurrencyModal() {
  document.getElementById("currencyModal").style.display = "flex";
  loadCurrencyList();
}

function closeCurrencyModal() {
  document.getElementById("currencyModal").style.display = "none";
}

function deleteCurrencyRow(index) {
  currencies.splice(index, 1);
  loadCurrencyList();
}
