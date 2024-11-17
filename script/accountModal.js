let isCreating = false;

// Open Modal for Creating
function openCreateModal() {
  isCreating = true; // This is a creation
  editingIndex = -1; // Reset editing index

  document.getElementById("editKodeAcc").value = "";
  document.getElementById("editNamaAcc").value = "";
  document.getElementById("editCcy").value = "";
  document.getElementById("editGroupName").value = "";
  document.getElementById("editAccType").value = "";
  document.getElementById("editLevel").value = "";
  document.getElementById("editDept").checked = "";
  document.getElementById("editGainLoss").checked = "";
  document.getElementById("editControlAcc").value = "";
  document.getElementById("editParentAcc").value = "";
  // Show the modal
  document.getElementById("editModal").style.display = "flex";
}

// Open Modal
function openEditModal(index) {
  editingIndex = index;
  const row = tableData[index];

  // Populate the form fields
  document.getElementById("editKodeAcc").value = row["Kode Acc"] || "";
  document.getElementById("editNamaAcc").value = row["Nama Acc"] || "";
  document.getElementById("editCcy").value = row["Ccy"] || "";
  document.getElementById("editGroupName").value = row["Group Name"] || "";
  document.getElementById("editAccType").value = row["Acc Type"] || "";
  document.getElementById("editLevel").value = row["Level"] || "";
  document.getElementById("editDept").value = row["Dept"] || "";
  document.getElementById("editGainLoss").value = row["Gain loss"] || "";
  document.getElementById("editControlAcc").value = row["Control Acc"] || "";
  document.getElementById("editParentAcc").value = row["Parent Acc"] || "";
  // Show the modal
  document.getElementById("editModal").style.display = "flex";
}

function closeAccountModal() {
  document.getElementById("editModal").style.display = "none";
  isCreating = false;
}

function saveChanges() {
  if (!validateForm()) {
    return;
  }
  const columns = [
    { key: "Kode Acc", id: "editKodeAcc" },
    { key: "Nama Acc", id: "editNamaAcc" },
    { key: "Ccy", id: "editCcy" },
    { key: "Group Name", id: "editGroupName" },
    { key: "Acc Type", id: "editAccType" },
    { key: "Level", id: "editLevel" },
    { key: "Dept", id: "editDept", isCheckbox: true },
    { key: "Gain loss", id: "editGainLoss", isCheckbox: true },
    { key: "Control Acc", id: "editControlAcc" },
    { key: "Parent Acc", id: "editParentAcc" },
  ];

  if (isCreating) {
    const newData = {
      "Kode Acc": parseFloat(document.getElementById("editKodeAcc").value),
      "Nama Acc": document.getElementById("editNamaAcc").value,
      Ccy: document.getElementById("editCcy").value,
      "Group Name": document.getElementById("editGroupName").value,
      "Acc Type": document.getElementById("editAccType").value,
      Level: parseFloat(document.getElementById("editLevel").value),
      Dept: document.getElementById("editDept").checked ? parseFloat(1) : "",
      "Gain loss": document.getElementById("editGainLoss").checked
        ? parseFloat(1)
        : "",
      "Control Acc": document.getElementById("editControlAcc").value,
      "Parent Acc": parseFloat(document.getElementById("editParentAcc").value),
    };

    tableData.unshift(newData);
  } else {
    columns.forEach((column) => {
      const element = document.getElementById(column.id);
      if (element) {
        tableData[editingIndex][column.key] = column.isCheckbox
          ? element.checked
            ? "1"
            : ""
          : element.value;
      }
    });
  }
  closeAccountModal();
  displayTable(tableData);
}
