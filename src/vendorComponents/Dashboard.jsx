import {
  Avatar,
  Button,
  Dialog,
  Divider,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Box, width } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Auth, app } from "../MyComponent/FirebaseConnection";
import { getDatabase, onValue, ref, update, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import TopSellingProductsTable from "./statisticsComponent/TopSellingProductsTable";
import InventoryTable from "./statisticsComponent/InventoryTable";
import Test from "./statisticsComponent/test";
import OrderHistoryTable from "./statisticsComponent/OrderHistoryTable";
import OrderStatus from "./statisticsComponent/OrderStatus";
import Orders from "./statisticsComponent/Orders";

//icons
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";
import HistoryIcon from "@mui/icons-material/History";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddProduct from "./statisticsComponent/AddProduct";
//tabs

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 1,
            backgroundColor: "#e8f7fc",
            display: "flex",
            flexDirection: "column",
            height: 800,
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Dashboard() {
  const [value, setValue] = React.useState(0);

  const database = getDatabase(app);
  const [open, setOpen] = useState();
  const Navigate = useNavigate();

  //for input
  const [ShopOwnerName, setShopOwnerName] = useState("");
  const [ShopName, setShopName] = useState("");
  const [UID, setUID] = useState("B9K3lpXONeVI7loY3BzU2qxAHwk1");

  //vendor details
  const [ownerName, setOwnerName] = useState();

  //charts
  //pie chart
  const options = {
    labels: ["₹ Sales", "Orders", "Completed", "Cancelled Order"],
  };
  const series = [4, 5, 6, 1]; //our data

  //line chart
  const series1 = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  const options1 = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: ["#05f599"],
    markers: {
      colors: ["#05f599", "#ffff", "#ffff"],
    },
    title: {
      text: "",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  //charts

  useEffect(() => {
    const reference = ref(database, "Vendors/", "B9K3lpXONeVI7loY3BzU2qxAHwk1");
    onValue(reference, (snapshot) => {
      snapshot.forEach((details) => {
        const vendorShopName = details.child("shopName").val();
        let ownerName = details.child("shopOwnerName").val();
        if (
          vendorShopName === null ||
          (undefined && ownerName === null) ||
          undefined
        ) {
          setOpen(true);
        } else {
          setOwnerName(ownerName);
          setOpen(false);
        }
      });
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //uploadOwnerDetails
  function uploadOwnerDetails() {
    update(ref(database, "Vendors/" + UID), {
      shopName: ShopName,
      shopOwnerName: ShopOwnerName,
    });
    setOpen(false);
  }
  let now = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  //log out vendor
  function LogoutVendor() {
    Auth.signOut();
  }

  return (
    <div>
      <Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          {/* dialog for vendor details */}
          <Dialog open={open}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "50px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "unset",
                  color: "grey",
                  fontSize: "20px",
                  padding: "10px",
                }}
                variant="h5"
              >
                Give details about shop
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  marginTop: "20px",
                  flexDirection: "column",
                }}
              >
                <TextField
                  size="small"
                  label="Your good name*"
                  onChange={(event) => {
                    setShopOwnerName(event.target.value);
                  }}
                />
                <TextField
                  onChange={(event) => {
                    setShopName(event.target.value);
                  }}
                  sx={{
                    marginTop: "12px",
                  }}
                  size="small"
                  label="Shop name*"
                />

                <Button
                  size="small"
                  sx={{
                    backgroundColor: "#05f599",
                    color: "white",
                    fontSize: "15px",
                    padding: "10px",
                    textTransform: "inherit",
                    marginTop: "30px",

                    ":hover": {
                      backgroundColor: "#05f599",
                    },
                  }}
                  onClick={uploadOwnerDetails}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Box>

        {/* Tabs */}
        <div
          className="rgbColor"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                borderRadius: "10px",
                bgcolor: "background.paper",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                }}
              >
                <Avatar
                  sx={{
                    marginTop: "10px",
                    height: "60px",
                    width: "60px",
                  }}
                />

                {ownerName ? (
                  <Typography
                    sx={{
                      marginTop: "5px",
                      fontFamily: "Segoe UI",
                      color: "#a6a9ad",
                      fontWeight: 600,
                      width: 103,
                      fontSize: "15px",
                    }}
                  >
                    {"welcome back, " + ownerName}
                  </Typography>
                ) : null}

                <div
                  style={{
                    backgroundColor: "#dfe2e8",
                    height: "1px",
                    marginTop: "10px",
                    width: "100px",
                  }}
                ></div>
                <Tabs
                  textColor="inherit"
                  orientation="vertical"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#05f599",
                      width: 20,
                    },
                  }}
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    marginTop: "20px",
                    width: "200px",
                  }}
                >
                  <Tab
                    icon={<LeaderboardIcon />}
                    iconPosition="start"
                    sx={{
                      fontFamily: "Segoe UI",
                      textTransform: "inherit",
                      fontSize: "17px",

                      color: "GrayText",
                    }}
                    label="Statistics"
                    {...a11yProps(0)}
                  />
                  <Divider light />
                  <Tab
                    icon={<AssignmentIcon />}
                    iconPosition="start"
                    sx={{
                      fontFamily: "Segoe UI",
                      textTransform: "inherit",
                      fontSize: "17px",
                      color: "GrayText",
                    }}
                    label="Orders"
                    {...a11yProps(1)}
                  />
                  <Divider light />

                  <Tab
                    icon={<QueryStatsIcon />}
                    iconPosition="start"
                    sx={{
                      fontFamily: "Segoe UI",
                      textTransform: "inherit",
                      fontSize: "17px",
                      color: "GrayText",
                    }}
                    label="Order status"
                    {...a11yProps(2)}
                  />
                  <Divider light />
                  <Tab
                    icon={<HistoryIcon />}
                    iconPosition="start"
                    sx={{
                      fontFamily: "Segoe UI",
                      textTransform: "inherit",
                      fontSize: "17px",
                      color: "GrayText",
                    }}
                    label="Order history"
                    {...a11yProps(3)}
                  />

                  <Divider light />
                  <Tab
                    icon={<AddCircleOutlineIcon />}
                    iconPosition="start"
                    sx={{
                      fontFamily: "Segoe UI",
                      textTransform: "inherit",
                      fontSize: "17px",
                      color: "GrayText",
                    }}
                    label="Add products"
                    {...a11yProps(5)}
                  />

                  <Box
                    sx={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 17,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="small"
                      sx={{
                        backgroundColor: "#05f599",
                        color: "white",
                        fontSize: "15px",
                        padding: "5px",
                        fontWeight: "600",
                        width: "150px",
                        textTransform: "inherit",
                        ":hover": {
                          backgroundColor: "#05f599",
                        },
                      }}
                      onClick={LogoutVendor}
                    >
                      Log out
                    </Button>
                  </Box>
                </Tabs>
              </Box>

              {/* Tab1 analysis */}
              <TabPanel value={value} index={0}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    width: "100vh",
                  }}
                >
                  <Box
                    sx={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "Segoe UI",
                        fontSize: "25px",
                        fontWeight: "600",
                        marginTop: "10px",
                        color: "GrayText",
                      }}
                    >
                      Analytics overview
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "Segoe UI",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginRight: "50px",
                        marginTop: "5px",
                        color: "GrayText",
                      }}
                    >
                      {now}
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      marginTop: "10px",
                      width: "50px",
                    }}
                  />

                  {/* box for analytics */}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "1px",
                        }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            marginTop: "10px",
                            padding: "10px",
                            marginRight: "20px",
                            width: "150px",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: "Segoe UI",
                              fontSize: "17px",
                              fontWeight: "600",
                              marginTop: "10px",
                              color: "#a6a9ad",
                            }}
                          >
                            Total products
                          </Typography>

                          <h2
                            style={{
                              fontFamily: "Segoe UI",
                              color: "#a6a9ad",
                            }}
                          >
                            0
                          </h2>
                        </Paper>
                        <Paper
                          elevation={0}
                          sx={{
                            marginTop: "10px",
                            padding: "10px",
                            marginRight: "20px",
                            borderRadius: "5px",
                            width: "150px",
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: "Segoe UI",
                              fontSize: "17px",
                              fontWeight: "600",
                              marginTop: "10px",
                              color: "#a6a9ad",
                            }}
                          >
                            Orders
                          </Typography>

                          <h2
                            style={{
                              fontFamily: "Segoe UI",
                              color: "#a6a9ad",
                            }}
                          >
                            0
                          </h2>
                        </Paper>
                        <Paper
                          elevation={0}
                          sx={{
                            marginTop: "10px",
                            padding: "10px",
                            marginRight: "20px",
                            width: "150px",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: "Segoe UI",
                              fontSize: "17px",
                              fontWeight: "600",
                              marginTop: "10px",
                              color: "#a6a9ad",
                            }}
                          >
                            Sales
                          </Typography>

                          <h2
                            style={{
                              fontFamily: "Segoe UI",
                              color: "#a6a9ad",
                            }}
                          >
                            0
                          </h2>
                        </Paper>
                      </Box>

                      {/* box 2 analytics */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "1px",
                        }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            marginTop: "10px",
                            padding: "10px",
                            marginRight: "20px",
                            width: "150px",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: "Segoe UI",
                              fontSize: "17px",
                              fontWeight: "600",
                              marginTop: "10px",
                              color: "#a6a9ad",
                            }}
                          >
                            Total sales
                          </Typography>

                          <h2
                            style={{
                              fontFamily: "Segoe UI",
                              color: "#a6a9ad",
                            }}
                          >
                            0
                          </h2>
                        </Paper>
                        <Paper
                          elevation={0}
                          sx={{
                            marginTop: "10px",
                            padding: "10px",
                            marginRight: "20px",
                            borderRadius: "5px",
                            width: "150px",
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: "Segoe UI",
                              fontSize: "17px",
                              fontWeight: "600",
                              marginTop: "10px",
                              color: "#a6a9ad",
                            }}
                          >
                            Pending
                          </Typography>

                          <h2
                            style={{
                              fontFamily: "Segoe UI",
                              color: "#a6a9ad",
                            }}
                          >
                            0
                          </h2>
                        </Paper>
                        <Paper
                          elevation={0}
                          sx={{
                            marginTop: "10px",
                            padding: "10px",
                            marginRight: "20px",
                            width: "150px",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: "Segoe UI",
                              fontSize: "17px",
                              fontWeight: "600",
                              marginTop: "10px",
                              color: "#a6a9ad",
                            }}
                          >
                            Completed
                          </Typography>

                          <h2
                            style={{
                              fontFamily: "Segoe UI",
                              color: "#a6a9ad",
                            }}
                          >
                            0
                          </h2>
                        </Paper>
                      </Box>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        padding: "5px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontSize: "20px",
                          marginLeft: "10px",
                          marginBottom: "10px",
                          color: "GrayText",
                        }}
                      >
                        Your progress
                      </Typography>

                      <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="350"
                      />
                    </Paper>
                  </Box>

                  {/* third box */}
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "Segoe UI",
                        fontSize: "20px",
                        marginLeft: "10px",
                        color: "GrayText",
                      }}
                    >
                      Product trends by months
                    </Typography>
                    <Chart
                      height="400px"
                      type="line"
                      options={options1}
                      series={series1}
                    />
                  </Paper>

                  {/* forth box */}

                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "Segoe UI",
                        fontSize: "20px",
                        marginLeft: "10px",
                        color: "GrayText",
                      }}
                    >
                      Top selling products
                    </Typography>

                    {/* Table for top selling products */}
                    <TopSellingProductsTable />
                    {/* Table for top selling products */}
                  </Paper>
                </Box>
              </TabPanel>

              {/* Tab 2 */}
              <TabPanel value={value} index={2}>
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px",
                    width: "100vh",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                      margin: 2,
                      color: "GrayText",
                    }}
                  >
                    Orders
                  </Typography>

                  <Orders />
                </Paper>
              </TabPanel>
              {/* Tab 2 */}

              {/* Tab 2 */}
              <TabPanel value={value} index={4}>
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100vh",
                    justifyContent: "center",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                      color: "GrayText",
                      margin: 1,
                    }}
                  >
                    Order status
                  </Typography>
                  <OrderStatus />
                </Paper>
              </TabPanel>
              {/* Tab 2 */}

              {/* Tab 3 */}
              <TabPanel value={value} index={6}>
                {/* make box */}

                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100vh",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                      margin: 3,
                      color: "GrayText",
                    }}
                  >
                    Order history
                  </Typography>

                  <OrderHistoryTable />
                </Paper>
              </TabPanel>
              {/* Tab 3 */}

              {/* Tab 4 */}

              {/* Tab 5 */}
              <TabPanel value={value} index={8}>
                {/* make box */}

                <Box
                  elevation={0}
                  sx={{
                    width: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontSize: "20px",
                      marginLeft: "10px",
                      color: "GrayText",
                    }}
                  >
                    Add product
                  </Typography>
                  <AddProduct />
                </Box>
              </TabPanel>
              {/* Tab 5 */}
            </Box>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default Dashboard;
