// This is a reusable component that displays a list of items in a table.
//It uses the react-table library to handle the sorting and filtering of the data.
//The List component takes two props: dataRaw and columns. The dataRaw prop is an array of objects that contains the data to be displayed in the table.
//The columns prop is an array of objects that contains the configuration for each column in the table.
//The List component uses the useTable hook from the react-table library to create a table with the specified data and columns.
//It then renders the table using the MDBTable component from the mdb-react-ui-kit library.
//The List component is used in the UserModal component to display the user's profile information in a table format.
import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useTable, useSortBy, useFilters } from "react-table";

export default function List({ dataRaw, columns }) {
  const data = React.useMemo(() => dataRaw, [dataRaw]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters, useSortBy);

  return (
    <>
      <MDBTable {...getTableProps()}>
        <MDBTableHead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="fw-bold mb-1"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </MDBTableHead>
        <MDBTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr>
                {row.cells.map((cell) => {
                  return <td className={cell.id}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
