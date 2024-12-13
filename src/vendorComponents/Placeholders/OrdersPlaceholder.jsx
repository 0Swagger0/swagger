import { Button, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  update,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { app, Auth } from "../../MyComponent/FirebaseConnection";

function OrdersPlaceholder() {
  const [uid, setuid] = useState();
  const [productDetails, setProductDetails] = useState([]);

  const database = getDatabase(app);
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setuid(user.uid);
      }
    });
    getAllProduct();
  }, [uid]);

  //get all products
  function getAllProduct() {
    const reference = ref(database, "Vendors/" + uid + "/" + "orders");
    onValue(reference, (snapshort) => {
      const data = snapshort.val();
      if (data !== null) {
        setProductDetails(data);
      }
    });
  }

  //get ready order
  function getOrderReady(details) {
    const refeReady = ref(
      database,
      "Vendors/" + uid + "/" + "activeOrder/" + details.productId
    );
    set(refeReady, details).then(() => {
      update(refeReady, { status: "Active" });
      //remove order from orders
      removeOrder(details);
      getinformUserAboutOrder(details);
    });
  }

  // inform user about product
  function getinformUserAboutOrder(details) {
    const refUserInfo = ref(
      database,
      "Users/" + details.customerId + "/" + "myOrders/" + details.productId
    );
    update(refUserInfo, { status: "Ready for shipping" });
  }
  //inform user about product

  //remove order
  function removeOrder(details) {
    const refeRemove = ref(
      database,
      "Vendors/" + uid + "/" + "orders/" + details.productId
    );
    remove(refeRemove).then(() => {
      alert("order confirmed");
    });
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="row ">
        {Object.values(productDetails).map((details) => {
          return (
            <>
              <div className="col">
                <div className="border p-3">
                  <img
                    src={details.image}
                    alt="image"
                    height={200}
                    width={200}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Segoe UI",
                        fontSize: "20px",
                        fontWeight: 600,
                        marginBottom: 1,
                        marginTop: 2,
                        color: "GrayText",
                      }}
                    >
                      Products details
                    </Typography>
                    <Divider />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 2,
                      }}
                    >
                      <div className="col">
                        <div className="row">
                          <span className="text-black-50">Product name:</span>
                          <h6>{details.productName}</h6>
                        </div>
                        <div className="row">
                          <span className="text-black-50">Quantity:</span>
                          <h6>{details.quantity}</h6>
                        </div>

                        <div className="row">
                          <span className="text-black-50">Date</span>
                          <h6>
                            {new Date().setMilliseconds(details.productId)}
                          </h6>
                        </div>

                        <div className="row">
                          <span className="text-black-50">
                            Payment option:{" "}
                          </span>
                          <h6>{details.payment}</h6>
                        </div>
                      </div>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Segoe UI",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "GrayText",
                        }}
                      >
                        {"₹ " + details.originalPrice}
                      </Typography>

                      <Button
                        size="large"
                        sx={{
                          backgroundColor: "#05f599",
                          color: "white",
                          width: 200,
                          fontSize: "15px",
                          padding: "10px",
                          textTransform: "inherit",

                          ":hover": {
                            backgroundColor: "#05f599",
                          },
                        }}
                        onClick={() => getOrderReady(details)}
                      >
                        Order confirm
                      </Button>
                    </Box>
                  </Box>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersPlaceholder;
