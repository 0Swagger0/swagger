import { Grid, Paper, TextField } from "@mui/material";
import { Box, padding } from "@mui/system";
import { React, useEffect, useState } from "react";
import { Auth, app } from "../../MyComponent/FirebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue, set } from "firebase/database";
import "../../App.css";
import {
  getStorage,
  ref as storeRef,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const detailsArray = [
  {
    category: "",
    describtion: "",
    gender: "",
    image: "",
    inCategory: "",
    originalPrice: "",
    productCategory: "",
    productName: "",
    size: {
      size: "",
    },
  },
];

const InventoryTable = () => {
  //firebase database initilize
  const database = getDatabase(app);
  const [uid, setuid] = useState();

  const [productDetails, setProductDetails] = useState([]);

  onAuthStateChanged(Auth, (user) => {
    if (user) {
      setuid(user.uid);
    }
  });

  useEffect(() => {
    const reference = ref(database, "Vendors/" + uid + "/" + "products");
    onValue(reference, (snapshort) => {
      snapshort.forEach((child) => {
        const data = child.val();
        setProductDetails(data);
      });
    });
  });

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 2,
          }}
        >
          {productDetails.map((details) => {
            return (
              <>
                <p>{details.productName}</p>
              </>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default InventoryTable;
