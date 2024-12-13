import { React, useEffect, useState } from "react";
import { DropzoneArea } from "react-mui-dropzone";
import { Box } from "@mui/system";
import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  FormControlLabel,
  Input,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Auth, app } from "../../MyComponent/FirebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";
import {
  getStorage,
  ref as storeRef,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

//category od all products
const Categories = [
  "Fashion",
  "Electronics",
  "Mobiles",
  "Beauty & Kids",
  "Home & Kitchen",
];

function AddProduct() {
  //validation input
  const [ProductName, setProductName] = useState("");
  const [prodcutDesribtion, setProdcutDesribtion] = useState("");
  const [productCategories, setProductCategories] = useState("");

  //for price and discount
  const [originalPrice, setOriginalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [Weight, setWeight] = useState("");

  //getting product image
  const [productImage, setProductImage] = useState();
  //firebase base storage refernce
  const storage = getStorage(app);

  //uuid
  //firebase database initilize
  const database = getDatabase(app);
  const [uid, setuid] = useState();

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setuid(user.uid);
      }
    });
  }, [uid]);

  let uuid = new Date().valueOf().toString();
  const reference = ref(database, "Vendors/" + uid + "/" + "products/" + uuid);

  function ValodationOfAllInput(e) {
    e.preventDefault();
    set(reference, {
      productName: ProductName,
      productId: uuid,
      vendorId: uid,
      wieght: Weight,
      Category: productCategories,
      describtion: prodcutDesribtion,
      originalPrice: originalPrice,
      stockQuantity: quantity,
      image: productImage,
    }).then(() => {
      setProdcutDesribtion("");
      setOriginalPrice("");
      setProductCategories("");
      setProductImage("");
      setQuantity("");
      setProductName("");
    });
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Segoe UI",
              marginTop: 2,
              color: "GrayText",
            }}
          >
            Add products
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginTop: 1,
              fontFamily: "Segoe UI",
              color: "GrayText",
            }}
          >
            This information will describe more about the product
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginTop: 1,
                  fontFamily: "Segoe UI",
                  color: "GrayText",
                }}
              >
                Products Information
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 1,
                  }}
                >
                  {/* input 1 */}
                  <TextField
                    value={ProductName}
                    InputLabelProps={{
                      style: {
                        fontFamily: "Segoe UI",
                        fontSize: 17,
                        color: "GrayText",
                      },
                    }}
                    inputProps={{
                      style: {
                        height: 27,
                        fontFamily: "Segoe UI",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "GrayText",
                      },
                    }}
                    sx={{
                      width: 350,
                      marginRight: 5,
                    }}
                    variant="outlined"
                    label="Product name"
                    color="primary"
                    onChange={(event) => {
                      setProductName(event.target.value);
                    }}
                  />

                  {/* input 2 */}
                  <TextField
                    value={Weight}
                    InputLabelProps={{
                      style: {
                        fontFamily: "Segoe UI",
                        fontSize: 17,
                        color: "GrayText",
                      },
                    }}
                    inputProps={{
                      style: {
                        height: 27,
                        fontFamily: "Segoe UI",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "GrayText",
                      },
                    }}
                    sx={{
                      width: 350,
                      marginRight: 5,
                    }}
                    variant="outlined"
                    label="Wieght"
                    color="primary"
                    onChange={(event) => {
                      setWeight(event.target.value);
                    }}
                  />
                </Box>

                {/* describtion and category box */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 1,
                  }}
                >
                  {/* describtion  */}

                  <Box
                    sx={{
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: 1,
                          fontFamily: "Segoe UI",
                          color: "GrayText",
                        }}
                      >
                        Decribtion(optional)*
                      </Typography>

                      <TextField
                        multiline
                        value={prodcutDesribtion}
                        inputProps={{
                          style: {
                            height: 200,
                            fontFamily: "Segoe UI",
                            fontSize: 15,
                            fontWeight: 600,
                            color: "GrayText",
                          },
                        }}
                        sx={{
                          width: 350,
                          marginTop: 1,
                          marginRight: 5,
                        }}
                        variant="outlined"
                        color="primary"
                        onChange={(event) => {
                          setProdcutDesribtion(event.target.value);
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: 1,
                          fontFamily: "Segoe UI",
                          color: "GrayText",
                        }}
                      >
                        Desribe your categories*
                      </Typography>
                      <Autocomplete
                        disablePortal
                        options={Categories}
                        id="combo-box-demo"
                        sx={{ width: 350, marginTop: 1 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Categories" />
                        )}
                        onChange={(Event, value) => {
                          setProductCategories(value);
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* pricing box */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ flexDirection: "column", display: "flex" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: 1,
                        marginBottom: 2,
                        fontFamily: "Segoe UI",
                        color: "GrayText",
                      }}
                    >
                      Pricing
                    </Typography>
                    <TextField
                      value={originalPrice}
                      sx={{
                        width: 350,
                        marginRight: 2,
                      }}
                      label="Original price"
                      placeholder="₹"
                      type="number"
                      onChange={(event) => {
                        setOriginalPrice(event.target.value);
                      }}
                    />
                    <TextField
                      value={quantity}
                      sx={{
                        width: 350,
                        marginRight: 2,
                        marginTop: 2,
                      }}
                      label="Stock quantity"
                      placeholder="Example 30,40,50"
                      type="number"
                      onChange={(event) => {
                        setQuantity(event.target.value);
                      }}
                    />
                  </Box>
                </Box>
                {/* pricing box */}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  marginTop: 1,
                  marginBottom: 2,
                  fontFamily: "Segoe UI",
                  color: "GrayText",
                }}
              >
                Media
              </Typography>

              <DropzoneArea
                filesLimit={4}
                acceptedFiles={["image/*"]}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => {
                  files.map((path) => {
                    const imageRef = storeRef(
                      storage,
                      "productImages/" + uid + "/" + path.name
                    );
                    uploadBytes(imageRef, path).then(() => {
                      getDownloadURL(imageRef).then((url) => {
                        if (url !== null) {
                          setProductImage(url);
                        }
                      });
                    });
                  });
                }}
              />
              <Button
                fullWidth
                sx={{
                  height: 50,
                  marginTop: 5,
                  fontFamily: "Segoe UI",
                  textTransform: "inherit",
                  backgroundColor: "#05f599",
                  color: "white",
                  ":hover": {
                    color: "white",
                    backgroundColor: "#05f599",
                  },
                }}
                onClick={ValodationOfAllInput}
              >
                + ADD PRODUCT
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default AddProduct;
