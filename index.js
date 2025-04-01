export function makeTableSortable(table, options = {}) {

  const allowUnsorted = options.allowUnsorted === true;
  const sortStringLocale = options.sortStringLocale || "en";
  const sortStringBase = ["base", "accent", "case", "variant"].includes(options.sortStringBase)
    ? options.sortStringBase
    : "base";

  const headers = Array.from(table.querySelectorAll("thead th"))
    .map(th => th.textContent.trim());

  let originalData = getTableData();

  let currentSort = { column: null, direction: null };

  if (!allowUnsorted) {
    // Start with "asc" sorting in the first column.
    const firstTH = document.querySelector('.sortable-table thead th');
    if (firstTH) {
      firstTH.classList.add('sorted-asc');
    }
    const firstColumnName = headers[0];
    currentSort = { column: firstColumnName, direction: "asc" };
    originalData = sortData(originalData, firstColumnName, "asc");
  }

  function getTableData() {
    return Array.from(table.querySelectorAll("tbody tr")).map(row => {
      const cells = Array.from(row.querySelectorAll("td")).map(td => ({
        text: td.textContent.trim(),
        html: td.innerHTML
      }));
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
        const cellText = rowData[header].text;
        td.innerHTML = rowData[header].html;
        if (cellText !== "" && !isNaN(Number(cellText))) {
          td.classList.add("text-align-right");
        }
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
  }

  function cycleSortDirection(currentDirection) {
    if (allowUnsorted) {
      switch (currentDirection) {
        case null: return "asc";
        case "asc": return "desc";
        case "desc": return null;
      }
    } else {
      switch (currentDirection) {
        case "asc": return "desc";
        case "desc": return "asc";
      }
    }
  }

  function sortData(data, column, direction) {

    if (allowUnsorted) {
      if (!direction) return [...originalData];
    }

    const isNumeric = data.every(row => {
      const val = row[column].text;
      return val !== "" && !isNaN(Number(val));
    });

    return [...data].sort((a, b) => {
      const aVal = isNumeric ? Number(a[column].text) : String(a[column].text);
      const bVal = isNumeric ? Number(b[column].text) : String(b[column].text);

      if (isNumeric) {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      } else {
        return direction === "asc"
          ? aVal.localeCompare(bVal, sortStringLocale, { sensitivity: sortStringBase })
          : bVal.localeCompare(aVal, sortStringLocale, { sensitivity: sortStringBase });
      }
    });

  }

  const headerCells = table.querySelectorAll("thead th");

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
