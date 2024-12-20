// Function to validate form submission
function validateForm() {
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));
  const accCode = document.getElementById("editKodeAcc").value;
  const accName = document.getElementById("editNamaAcc").value;
  const accType = document.getElementById("editAccType").value;
  const level = parseInt(document.getElementById("editLevel").value, 10);
  const group = document.getElementById("editGroupName").value;
  const parent = document.getElementById("editParentAcc");
  const ccy = document.getElementById("editCcy");

  let isValid = true;

  if (!accCode || accCode.length > 20) {
    document.getElementById("editKodeAccError").textContent =
      "Acc Code must not be empty and should be less than 20 characters.";
    document.getElementById("editKodeAccError").style.display = "block";
    isValid = false;
  } else {
    const parsedAccCode = parseFloat(accCode);
    if (isNaN(parsedAccCode)) {
      document.getElementById("editKodeAccError").textContent =
        "Acc Code must be a valid number.";
      document.getElementById("editKodeAccError").style.display = "block";
      isValid = false;
    } else {
      const existingIndex = tableData.findIndex(
        (row) => parseFloat(row["Kode Acc"]) === parsedAccCode
      );
      if (
        (isCreating && existingIndex !== -1) ||
        (isCreating && existingIndex !== editingIndex)
      ) {
        document.getElementById("editKodeAccError").textContent =
          "Acc Code must be unique and not already exist in the data.";
        document.getElementById("editKodeAccError").style.display = "block";
        isValid = false;
      }
    }
  }

  if (!accName || accName.length > 100) {
    document.getElementById("editNamaAccError").textContent =
      "Acc Name must not be empty and should be less than 100 characters.";
    document.getElementById("editNamaAccError").style.display = "block";
    isValid = false;
  }

  if (accType === "G" && level > 1 && parent) {
    document.getElementById("editParentAccError").textContent =
      "For General type, Parent should be empty if Level > 1.";
    document.getElementById("editParentAccError").style.display = "block";
    isValid = false;
  }

  if (!accType) {
    document.getElementById("editParentAccError").textContent =
      "Acc Type cannot be empty";
    document.getElementById("editParentAccError").style.display = "block";
    isValid = false;
  }

  if (level === 1 && !group) {
    document.getElementById("editGroupNameError").textContent =
      "For Level 1, Acc Group cannot be empty.";
    document.getElementById("editGroupNameError").style.display = "block";
    isValid = false;
  }

  if (level > 1 && !parent) {
    document.getElementById("editParentAccError").textContent =
      "For Level > 1, Acc Parent cannot be empty.";
    document.getElementById("editParentAccError").style.display = "block";
    isValid = false;
  }

  if (parent.value.length > 0 && parseFloat(parent.value) !== level - 1) {
    document.getElementById("editParentAccError").textContent =
      "Data can only be empty or level minus one.";
    document.getElementById("editParentAccError").style.display = "block";
    isValid = false;
  }

  const selectedCurrency = currencies.find(
    (currency) => currency.code === ccy.value
  );

  if (
    selectedCurrency &&
    selectedCurrency.std &&
    document.getElementById("editCurrencyModal").style.display === "none"
  ) {
    document.getElementById("editGainLossError").textContent =
      "Currency is using the standard, please use the others";
    document.getElementById("editGainLossError").style.display = "block";
    isValid = false;
  }

  if (
    document.getElementById("editStdCcy").checked &&
    parseFloat(document.getElementById("editRateCcy").value) !== 1
  ) {
    document.getElementById("editStdCcyError").textContent =
      "STD currency must have a rate of 1.";
    document.getElementById("editStdCcyError").style.display = "block";
    isValid = false;
  }

  if (!document.getElementById("editCcyCode").value) {
    document.getElementById("editCcyCodeError").textContent = "Cannot be Empty";
    document.getElementById("editCcyCodeError").style.display = "block";
    isValid = false;
  }

  if (!document.getElementById("editNameCcy").value) {
    document.getElementById("editNameCcyError").textContent = "Cannot be Empty";
    document.getElementById("editNameCcyError").style.display = "block";
    isValid = false;
  }

  if (!document.getElementById("editRateCcy").value) {
    document.getElementById("editRateCcyError").textContent = "Cannot be Empty";
    document.getElementById("editRateCcyError").style.display = "block";
    isValid = false;
  }
  return isValid;
}
