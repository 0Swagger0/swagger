import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDatabase, onValue, ref } from "firebase/database";
import { app, Auth } from "../../MyComponent/FirebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

function createData(id, date, status, customer, product, revenue) {
  return {
    id,
    date,
    status,
    customer,
    product,
    revenue,
  };
}

// const rows = [
//   createData(
//     "25684",
//     "6/04/2022",
//     "paid",
//     "Arjun meena",
//     "Cool casual shirt",
//     "₹" + "399"
//   ),
// ];

const OrderListTable = () => {
  const [uid, setuid] = useState();
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  const database = getDatabase(app);
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setuid(user.uid);
      }
    });
    getOrderHistory();
  }, [uid]);

  // get order history
  function getOrderHistory() {
    const reference = ref(database, "Vendors/" + uid + "/" + "orderHistory");
    onValue(reference, (snapshort) => {
      const data = snapshort.val();
      if (data !== null) {
        setOrderHistoryData(data);
      }
    });
  }

  return (
    <div>
      <TableContainer sx={{ width: "100%" }}>
        <Table aria-label="simple table" sx={{ marginTop: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 600, color: "#a6a9ad" }}
                align="center"
              >
                ID
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: "#a6a9ad" }}
                align="center"
              >
                STATUS
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: "#a6a9ad" }}
                align="center"
              >
                DATE
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: "#a6a9ad" }}
                align="center"
              >
                CUSTOMER
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: "#a6a9ad" }}
                align="center"
              >
                PRODUCT
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: "#a6a9ad" }}
                align="center"
              >
                REVENUE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(orderHistoryData).map((details) => {
              const date = new Date(parseInt(details.productId));
              let d = date.getDate().toString();
              let m = date.getMonth().toString();
              let y = date.getFullYear().toString();
              let Name;

              // user details
              const refeuser = ref(
                database,
                "Users/" + details.customerId + "/"
              );
              onValue(refeuser, (snapshort) => {
                const name = snapshort.child("userName").val();
                Name = name;
              });
              return (
                <>
                  <TableRow
                    key={details.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell align="center">{details.productId}</TableCell>
                    <TableCell align="center">{details.status}</TableCell>
                    <TableCell align="center">
                      {d + "/" + m + "/" + y}
                    </TableCell>
                    <TableCell align="center">{Name}</TableCell>
                    <TableCell align="center">{details.productName}</TableCell>
                    <TableCell align="center">
                      {"₹" + details.originalPrice}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderListTable;
