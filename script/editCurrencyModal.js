let editingIndexCurrency = -1;
let isCreatingCurrency = false;

function openCreateCurrency() {
  isCreatingCurrency = true;
  editingIndexCurrency = -1;

  document.getElementById("editCcyCode").value = "";
  document.getElementById("editNameCcy").value = "";
  document.getElementById("editRateCcy").value = "";
  document.getElementById("editStdCcy").value = "";
  // Show the modal
  document.getElementById("editCurrencyModal").style.display = "flex";
}

function openEditCurrency(index) {
  editingIndexCurrency = index;
  const row = currencies[index];
  document.getElementById("editCcyCode").value = row.code;
  document.getElementById("editNameCcy").value = row.name;
  document.getElementById("editRateCcy").value = row.rate;
  document.getElementById("editStdCcy").checked = row.std === 1;
  // Show the modal
  document.getElementById("editCurrencyModal").style.display = "flex";
}

function saveCurrencyChanges() {
  if (!validateForm()) {
    return;
  }
  const ccyCode = document.getElementById("editCcyCode").value;
  const ccyName = document.getElementById("editNameCcy").value;
  const ccyRate = parseFloat(document.getElementById("editRateCcy").value);
  const ccyStd = document.getElementById("editStdCcy").checked ? 1 : 0;

  if (isCreatingCurrency) {
    const existingIndex = currencies.findIndex((c) => c.code === ccyCode);
    if (existingIndex !== -1) {
      alert("Duplicate currency code found!");
      return;
    }

    currencies.unshift({
      code: ccyCode,
      name: ccyName,
      rate: ccyRate,
      std: ccyStd,
    });
  } else {
    currencies[editingIndexCurrency] = {
      code: ccyCode,
      name: ccyName,
      rate: ccyRate,
      std: ccyStd,
    };

    if (ccyStd) {
      currencies.forEach((c, i) => {
        if (i !== editingIndexCurrency) {
          c.std = 0;
        }
      });
    }
  }
  console.log(currencies);

  closeEditCurrencyModal();
  loadCurrencyList();
}

function closeEditCurrencyModal() {
  document.getElementById("editCurrencyModal").style.display = "none";
  isCreatingCurrency = false;
}
