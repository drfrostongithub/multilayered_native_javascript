// Function to toggle fields based on Acc Type
function toggleFieldsBasedOnAccType() {
  const accType = document.getElementById("editAccType").value;

  if (accType === "G") {
    enableDisableFieldAccType(true);
  } else {
    enableDisableFieldAccType(false);
  }
}

function enableDisableFieldAccType(status) {
  const levelInput = document.getElementById("editLevel");
  const accControl = document.getElementById("editControlAcc");
  const Ccy = document.getElementById("editCcy");
  const Dept = document.getElementById("editDept");
  const gainLoss = document.getElementById("editGainLoss");
  const parentField = document.getElementById("editParentAcc");

  levelInput.disabled = status;
  levelInput.value = status ? parseFloat(1) : levelInput.value;
  parentField.disabled = status;
  parentField.value = status ? "" : parentField.value;
  accControl.disabled = status;
  accControl.value = status ? "" : accControl.value;
  Ccy.disabled = status;
  Ccy.value = status ? "" : Ccy.value;
  Dept.disabled = status;
  Dept.checked = status ? false : Dept.value;
  gainLoss.disabled = status;
  gainLoss.checked = status ? false : gainLoss.value;
}

// Function to adjust fields based on Level selection
function adjustFieldsBasedOnLevel() {
  const level = parseInt(document.getElementById("editLevel").value, 10);
  const groupField = document.getElementById("editGroupName");
  const parentField = document.getElementById("editParentAcc");
  const levelInput = document.getElementById("editLevel").value;

  if (level !== 1) {
    groupField.disabled = true;
    parentField.value = levelInput - 1;
    groupField.value = parentField.value;
  } else {
    groupField.disabled = false;
  }
}

// document
//   .getElementById("editCcy")
//   .addEventListener("change", adjustGainLossBasedOnCurrency);

// function adjustGainLossBasedOnCurrency() {
//   const ccy = document.getElementById("editCcy");
//   const gainLossCheckbox = document.getElementById("editGainLoss");
//   console.log("jalan bos");
//   if (ccy.value) {
// const selectedCurrency = currencies.find(
//   (currency) => currency.code === ccy.value
// );

// if (selectedCurrency && selectedCurrency.std) {
//   gainLossCheckbox.disabled = true;
//   document.getElementById("editGainLossError").textContent =
//     "Currency adalah mata uang dasar, tolong pilih yang lain";
//   document.getElementById("editGainLossError").style.display = "block";
// } else {
//       gainLossCheckbox.disabled = false;
//       document.getElementById("editGainLossError").style.display = "none";
//     }
//   } else {
//     // If no currency is selected, disable the Gain Loss checkbox
//     gainLossCheckbox.disabled = true;
//     document.getElementById("editGainLossError").style.display = "none";
//   }
// }
