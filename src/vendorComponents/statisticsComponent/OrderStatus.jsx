import {
  Avatar,
  Button,
  Chip,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Auth, app } from "../../MyComponent/FirebaseConnection";

//tabs initialize
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function OrderStatus() {
  //tbas variable
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [uid, setuid] = useState();
  const [activeOrderDetails, setActiveOrderDetails] = useState([]);
  const [pendingOrderDetails, setPendingOrderDetails] = useState([]);

  const database = getDatabase(app);

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setuid(user.uid);
      }
    });
    getActiveOrder();
    getPendingOrder();
  }, [uid]);

  //get active order
  function getActiveOrder() {
    const reference = ref(database, "Vendors/" + uid + "/" + "activeOrder");
    onValue(reference, (snapshort) => {
      const data = snapshort.val();
      if (data !== null) {
        setActiveOrderDetails(data);
      }
    });
  }

  //get Order shipping
  function getOrderShipping(details) {
    const refeOrderDispatch = ref(
      database,
      "Vendors/" + uid + "/" + "activeOrder/" + details.productId
    );
    remove(refeOrderDispatch).then(() => {
      //user order status
      orderStatusInfoToUser(details);

      // order send to pending
      ordersendtopending(details);
    });
  }

  //user order status
  function orderStatusInfoToUser(details) {
    const refUserInfo = ref(
      database,
      "Users/" + details.customerId + "/" + "myOrders/" + details.productId
    );
    update(refUserInfo, { status: "shipping" });
  }
  //user order status

  // order send to pending
  function ordersendtopending(details) {
    const refeSendToPendingOrder = ref(
      database,
      "Vendors/" + uid + "/" + "pendingOrder/" + details.productId
    );
    set(refeSendToPendingOrder, details).then(() => {
      update(refeSendToPendingOrder, { status: "Pending" });
      alert("Order ready for Shipping");

      //user order status
      orderStatusInfoToUser1(details);
    });
  }

  //user order status
  function orderStatusInfoToUser1(details) {
    const refUserInfo = ref(
      database,
      "Users/" + details.customerId + "/" + "myOrders/" + details.productId
    );
    update(refUserInfo, { status: "Dispatch" });
  }

  //get pending order
  function getPendingOrder() {
    const reference = ref(database, "Vendors/" + uid + "/" + "pendingOrder");
    onValue(reference, (snapshort) => {
      const data = snapshort.val();
      if (data !== null) {
        setPendingOrderDetails(data);
      }
    });
  }

  // get Order dispatch
  function getOrderDispatch(details) {
    const refeOrderShipping = ref(
      database,
      "Vendors/" + uid + "/" + "pendingOrder/" + details.productId
    );
    remove(refeOrderShipping).then(() => {
      //user order status
      orderStatusInfoToUser2(details);

      // order send to order history
      ordersendtoorderhistory(details);
    });
  }

  //user order status
  function orderStatusInfoToUser2(details) {
    const refUserInfo = ref(
      database,
      "Users/" + details.customerId + "/" + "myOrders/" + details.productId
    );
    update(refUserInfo, { status: "Completed" });
  }

  //order send to order history
  function ordersendtoorderhistory(details) {
    const refeSendToOrderHistory = ref(
      database,
      "Vendors/" + uid + "/" + "orderHistory/" + details.productId
    );
    set(refeSendToOrderHistory, details).then(() => {
      update(refeSendToOrderHistory, { status: "Completed" });
      alert("Order has completed");
    });
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", marginTop: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "#d9e2e1" }}>
            <Tabs
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#05f599",
                },
              }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{
                  fontFamily: "unset",
                  color: "GrayText",
                  fontSize: "18px",
                  textTransform: "inherit",
                }}
                label="Active"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  fontFamily: "unset",
                  color: "GrayText",
                  fontSize: "18px",
                  textTransform: "inherit",
                }}
                label="Pending"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          {/* tab 1 */}
          <TabPanel value={value} index={0}>
            <div className="d-flex justify-content-around">
              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "GrayText",
                }}
              >
                Image
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,

                  color: "GrayText",
                }}
              >
                Name
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Price
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Stock available
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Status
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Process
              </Typography>
            </div>

            <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
            <div className="col">
              {Object.values(activeOrderDetails).map((details) => {
                return (
                  <>
                    <div className="d-flex justify-content-around align-items-center border p-2 mt-2">
                      <Avatar
                        sx={{
                          height: 50,
                          width: 50,
                          border: "0.3px solid lightgray",
                        }}
                        src={details.image}
                      />

                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontSize: "15px",
                          width: 200,
                          fontWeight: 600,
                          color: "GrayText",
                        }}
                      >
                        {details.productName}
                      </Typography>

                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "GrayText",
                        }}
                      >
                        {"₹ " + details.originalPrice}
                      </Typography>

                      <Typography
                        color="#07d976"
                        variant="h3"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontSize: "15px",
                          fontWeight: 600,
                        }}
                      >
                        Available
                      </Typography>

                      <Chip
                        sx={{
                          backgroundColor: "#e8eda6",
                          color: "gray",
                        }}
                        label={details.status}
                      />

                      <Button
                        size="small"
                        sx={{
                          backgroundColor: "#05f599",
                          color: "white",
                          height: 35,
                          fontSize: "13px",
                          width: "150px",
                          textTransform: "inherit",
                          ":hover": {
                            backgroundColor: "#05f599",
                          },
                        }}
                        onClick={() => getOrderShipping(details)}
                      >
                        Ready for shipping
                      </Button>
                    </div>
                  </>
                );
              })}
            </div>
          </TabPanel>
          {/* tab 1 */}

          {/* tab 2 */}
          <TabPanel value={value} index={1}>
            <div className="d-flex justify-content-around">
              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "GrayText",
                }}
              >
                Image
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,

                  color: "GrayText",
                }}
              >
                Name
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Price
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Stock available
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Status
              </Typography>

              <Typography
                color="GrayText"
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Process
              </Typography>
            </div>
            <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
            <div className="col">
              {Object.values(pendingOrderDetails).map((details) => {
                return (
                  <>
                    <div className="d-flex justify-content-around align-items-center border p-2 mt-2">
                      <Avatar
                        sx={{
                          height: 50,
                          width: 50,
                          border: "0.3px solid lightgray",
                        }}
                        src={details.image}
                      />

                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontSize: "15px",
                          width: 200,
                          fontWeight: 600,
                          color: "GrayText",
                        }}
                      >
                        {details.productName}
                      </Typography>

                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "GrayText",
                        }}
                      >
                        {"₹ " + details.originalPrice}
                      </Typography>

                      <Typography
                        color="#07d976"
                        variant="h3"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontSize: "15px",
                          fontWeight: 600,
                        }}
                      >
                        Available
                      </Typography>

                      <Chip
                        sx={{
                          backgroundColor: "#e8eda6",
                          color: "gray",
                        }}
                        label={details.status}
                      />

                      <Button
                        size="small"
                        sx={{
                          backgroundColor: "#05f599",
                          color: "white",
                          height: 35,
                          fontSize: "13px",
                          width: "150px",
                          textTransform: "inherit",
                          ":hover": {
                            backgroundColor: "#05f599",
                          },
                        }}
                        onClick={() => getOrderDispatch(details)}
                      >
                        Ready for dispatch
                      </Button>
                    </div>
                  </>
                );
              })}
            </div>
          </TabPanel>
          {/* tab 2 */}
        </Box>
      </Box>
    </div>
  );
}

export default OrderStatus;
