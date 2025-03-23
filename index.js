export function makeTableSortable(table) {
  const headers = Array.from(table.querySelectorAll("thead td")).map(td =>
    td.textContent.trim()
  );

  let originalData = getTableData();

  function getTableData() {
    return Array.from(table.querySelectorAll("tbody tr")).map(row => {
      const cells = Array.from(row.querySelectorAll("td")).map(td =>
        td.textContent.trim()
      );
      return Object.fromEntries(headers.map((key, i) => [key, cells[i]]));
    });
  }

  function renderTable(data) {
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    data.forEach(rowData => {
      const row = document.createElement("tr");
      headers.forEach(header => {
        const td = document.createElement("td");
        td.textContent = rowData[header];
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
  }

  function cycleSortDirection(currentDirection) {
    switch (currentDirection) {
      case null: return "asc";
      case "asc": return "desc";
      case "desc": return null;
    }
  }

  function sortData(data, column, direction) {
    if (!direction) return [...originalData];

    const isNumeric = data.every(row => {
      const val = row[column];
      return val !== "" && !isNaN(Number(val));
    });

    return [...data].sort((a, b) => {
      const aVal = isNumeric ? Number(a[column]) : String(a[column]);
      const bVal = isNumeric ? Number(b[column]) : String(b[column]);

      if (isNumeric) {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      } else {
        return direction === "asc"
          ? aVal.localeCompare(bVal, "nl", { sensitivity: "base" })
          : bVal.localeCompare(aVal, "nl", { sensitivity: "base" });
      }
    });
  }

  const headerCells = table.querySelectorAll("thead td");
  let currentSort = { column: null, direction: null };

  headerCells.forEach((cell, columnIndex) => {
    cell.addEventListener("click", () => {
      const columnName = headers[columnIndex];

      if (currentSort.column === columnName) {
        currentSort.direction = cycleSortDirection(currentSort.direction);
      } else {
        currentSort.column = columnName;
        currentSort.direction = "asc";
      }

      const sortedData = sortData(originalData, currentSort.column, currentSort.direction);
      renderTable(sortedData);

      headerCells.forEach(c => c.classList.remove("sorted-asc", "sorted-desc"));
      if (currentSort.direction === "asc") {
        cell.classList.add("sorted-asc");
      } else if (currentSort.direction === "desc") {
        cell.classList.add("sorted-desc");
      }
    });
  });

  renderTable(originalData);
}
