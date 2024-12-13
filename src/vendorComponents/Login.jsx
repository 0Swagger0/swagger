import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Input,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { React, useState, useEffect } from "react";
import Lottie from "react-lottie";
import PropTypes from "prop-types";
import WorkAnimation from "../LottieAnimation/lf30_editor_kkcqev7t.json";
import "../App.css";

//icons
import googleIcon from "../Image/googleIcon.svg";
import facebookIcon from "../Image/facebookIcon.svg";
import twitterIcon from "../Image/twitterIcon.svg";

//firebase
import {
  app,
  Auth,
  SignInWithPhoneNumber,
} from "../MyComponent/FirebaseConnection";
import { RecaptchaVerifier, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// firebase
import { getDatabase, set, ref } from "firebase/database";

//Tabs
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
        <Box sx={{ marginTop: "17px" }}>
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

function Login() {
  //navigation variable
  const Navigate = useNavigate();
  //veriable
  const database = getDatabase(app);

  //vendor details

  const [number, setNumber] = useState(0);
  const [OTP, setOTP] = useState("");
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(0);
  const [open1, setOpen1] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleChange = (Event, newValue) => {
    setValue(newValue);
  };

  // lottie Animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: WorkAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //alert dialog
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  //check user is available
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        //logged
        Navigate("/dashboard", { replace: true });
        // ...
      }
    });
  }, []);

  // get otp
  const gettingOTP = () => {
    setOpen1(true);

    // adding vendor data in firebase realtime
    const reference = ref(
      database,
      "Vendors/" + "B9K3lpXONeVI7loY3BzU2qxAHwk1"
    );
    set(reference, {
      accountType: "vendor",
      phone: number,
      uid: "B9K3lpXONeVI7loY3BzU2qxAHwk1",
    })
      .then(() => {
        Navigate("/dashboard", { replace: true });
        setOpen1(false);
      })
      .catch(() => {});
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "unset",
            color: "GrayText",
            fontSize: "18px",
          }}
        >
          Vendor Login !
        </Typography>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            padding: "10px",
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box>
            <Lottie options={defaultOptions} height="300px" width="300px" />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginRight: "17px",
              marginLeft: "17px",
              backgroundColor: "#f0f0f0",
            }}
          />

          <Box sx={{ width: "100%" }}>
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
                  label="Login"
                  {...a11yProps(0)}
                />
              </Tabs>
            </Box>
            {/* Tab 1 */}
            <TabPanel value={value} index={0}>
              {/* visible input */}
              {visible === false ? (
                <Paper
                  className="borderBlack"
                  variant="outlined"
                  sx={{
                    alignItems: "center",
                    flexDirection: "row",
                    display: "flex",
                    padding: "3px",
                    width: "300px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "unset",
                      fontSize: "14px",
                      marginLeft: "5px",
                      color: "#a1a09f",
                    }}
                    variant="body2"
                  >
                    +91
                  </Typography>
                  <Divider
                    sx={{
                      backgroundColor: "#f0f0f0",
                      marginLeft: "7px",
                      marginRight: "5px",
                    }}
                    orientation="vertical"
                    variant="middle"
                    flexItem
                  />
                  <input
                    className="inputOutlineNone"
                    placeholder="Mobile Number*"
                    onChange={(Event) => {
                      Event.preventDefault();
                      setNumber(Event.target.value);
                    }}
                  />
                </Paper>
              ) : null}

              {/* visible input */}
              {visible === true ? (
                <Paper
                  className="borderBlack"
                  variant="outlined"
                  sx={{
                    alignItems: "center",
                    flexDirection: "row",
                    display: "flex",
                    padding: "3px",
                    width: "300px",
                  }}
                >
                  <input
                    className="inputOutlineNone"
                    placeholder="OTP"
                    onChange={(Event) => {
                      Event.preventDefault();
                      setOTP(Event.target.value);
                    }}
                  />
                </Paper>
              ) : null}

              {/* continuing read policy */}
              <Box
                sx={{
                  marginTop: "50px",
                  width: "200px",
                }}
              >
                <p className="paragraph">
                  To Continuing, I agree to the vendor{" "}
                  <span className="paragraph1">Tearms</span> of use &
                  <span className="paragraph1">Policy</span>
                </p>
              </Box>
              {/* continue Button */}

              {/* visible button */}
              {visible === false ? (
                <button className="buttonShape" onClick={gettingOTP}>
                  Continue
                </button>
              ) : null}
              {/* visible button */}
              {visible === true ? (
                <button className="buttonShape" onClick={gettingOTP}>
                  Submit
                </button>
              ) : null}
            </TabPanel>
            {/* Tab 2 */}
          </Box>
        </Paper>
      </Box>
      <div id="recaptcha-container" className="justify-center flex"></div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          OTP Sent Successfully!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open1}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Login;
