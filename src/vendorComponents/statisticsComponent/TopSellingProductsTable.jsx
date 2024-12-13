import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  ProductName,
  ProdcutsId,
  AddedDate,
  Price,
  StockStatus,
  StockQuantity
) {
  return {
    ProductName,
    ProdcutsId,
    AddedDate,
    Price,
    StockStatus,
    StockQuantity,
  };
}

const rows = [
  createData(
    "T-Shirt",
    "11154",
    "24 / 03 / 2022",
    "₹" + "999",
    "in stock",
    "84"
  ),
];

function TopSellingProductsTable() {
  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table" sx={{ marginTop: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Product name
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Product id
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Date added
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Stock Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ProductName}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="center">{row.ProductName}</TableCell>
                <TableCell align="center">{row.ProdcutsId}</TableCell>
                <TableCell align="center">{row.AddedDate}</TableCell>
                <TableCell align="center">{row.Price}</TableCell>
                <TableCell align="center">{row.StockStatus}</TableCell>
                <TableCell align="center">{row.StockQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TopSellingProductsTable;
