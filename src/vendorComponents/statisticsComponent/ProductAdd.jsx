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
import { uuidv4 } from "@firebase/util";
import Banner from "../../Image/Banner.jpg";

//category od all products
const Categories = [
  "Fashion",
  "Electronics",
  "Beauty & Kids",
  "Home & Kitchen",
];

const BeautyAndKidsCategories = [
  "Makeup",
  "Haircare",
  "Kids Boy",
  "Kids Girl",
  "Skincare & Bodycare",
  "Appliances",
  "Men Grooming",
  "Beauty Gift & Makeupset",
];

const Makeup = [
  "Lipstick",
  "Lip Liner",
  "Mascara",
  "Eyeliner",
  "Kajal",
  "Fondation",
  "Compact",
  "Nail Polish",
  "Primer",
  "Eyeshadow",
  "Lip Gloss",
];

const Haircare = [
  "Shampoo",
  "Conditioner",
  "Hair Oil",
  "Hair Cream",
  "Hair Color",
  "Hair Gel",
];

const KidsBoy = [
  "Shirts & T-shirts",
  "Shorts & 3/4ths",
  "Denims &Trousers",
  "Joggers & Track Pants",
];

const KidsGirl = [
  "Jeans",
  "Leggings",
  "Outerwear",
  "Skirts & Shorts",
  "Tops & T-shirts",
  "Dresses & Frocks",
];

const SkinCareAndBodyCare = [
  "Face Moisturiser",
  "Cleanser",
  "Masks & Peel",
  "Sunscream",
  "Serum",
  "Face Wash",
  "Body Lotion",
  "Body Wash",
  "Body Scrub",
  "Hand Cream",
];

const Appliances = ["Hair Straightener", "Hair Dryer"];

const MenGrooming = ["Trimmers", "Beard Oil", "Hair Wax"];

const BeautyGiftAndMakeupSet = ["Beauty Gift", "Makeup Kit"];

//Beauty and Kids categories

//Home and Kitchen categories
const HomeAndKitchenCategories = [
  "For Bed",
  "Home Decor",
  "Cushions & Pillows",
  "Bath",
  "Dining",
  "Flooring",
  "Storage",
];
const ForBed = [
  "Bedsheets",
  "Bedding Sets",
  "Blankets",
  "Dohars & Quilts",
  "Comforters",
  "Bed Covers",
  "Mattress Protectors",
  "Quilt & Duvet Covers",
];

const HomeDecor = [
  "Wall Decor",
  "Wall Shelves",
  "Clocks",
  "Photo Frames",
  "Mirrors",
  "Wall Lamp",
  "Outdoor Lamp",
  "Table Lamp",
  "Home Fragnance",
  "Plants & Flowers",
];

const CushionsAndPillows = [
  "Cushions",
  "Pillows",
  "Bed Wedges",
  "Neck Pillows",
  "Bolsters",
  "Cushion Covers",
  "Pillow Covers",
];
const Bath = [
  "Bath Towels",
  "Hand & Face Towels",
  "Beach Towels",
  "Towels Set",
  "Bath Rugs",
  "Bath Robes",
  "Bathroom Accessories",
  "Shower Curtains",
];

const Dining = [
  "Serveware & Drinkware",
  "Table Linen Sets",
  "Table Covers & Runners",
  "Table Napkins",
  "Placemats & Coasters",
];

const Flooring = [
  "Floor Runners",
  "Carpets",
  "Floor Mats & Dhurries",
  "Door Mats",
];

const Storage = [
  "Bins",
  "Hangers",
  "Organisers",
  "Hooks & Holders",
  "Laundry Bags",
];
//Home and Kitchen categories

// electonics categories
const ElectonicsCategories = [
  "Laptops",
  "Desktop",
  "Storages",
  "Tablets",
  "Cameras & Accessories",
  "Computer Peripherals",
  " Health & Persional Care",
  "Laptops Accessories",
  " Desktop Accessories",
  "Gaming Accessories",
];

//fashion gender categories

const FashionCategoriesGender = ["Men", "Women"];

//Fashion categories
//men categories
const MenCategories = [
  "Western Wear",
  "Innerwear SleeperWear",
  "Footer Wear",
  "Bottom Wear",
];

//women categories
const WomenCategories = [
  "Enthic Wear",
  "Western Wear",
  "Jevellery",
  "Footer Wear Women",
];

//men Sub Categories
// menu items
const WesternWear = [
  "Jeckets & coats",
  "Jeans",
  "Shirts",
  "T-Shirt",
  "Suits",
  "Pants",
  "Casual Shirt",
  "Formal Shirt",
  "Trouser & Pants",
  "Sweatshirts & Hoodies",
];

const InnerwearSleeperWear = [
  "Vests",
  "Thermals",
  "Boxers",
  "Briefs & Trunks",
  "Sleepwear & Loungewear",
];

const FooterWear = [
  "Sports Shoes",
  "Formal Shoes",
  "Sneakers",
  "Sandals & Floaters",
  "Flip Flops",
  "Socks",
];

const BottomWear = [
  "Jeans",
  "Shorts",
  "Track Pants & Joggers",
  "Casual Trousers",
  "Formal Trousers",
];
//men Sub Categories
// menu items

//women sub categories
const WesternWearWomen = [
  "Dresses",
  "T-shirts",
  "Tops",
  "Jeans",
  "Shorts & Skirts",
  "Jackets & Coats",
  "Swearshirt & Hoodies",
  "Sweaters",
];

const EnthicWear = [
  "Kurtas",
  "Dress",
  "Material",
  "Salwars & ChuridarsKurtis",
  "Tunics",
  "Sarees",
  "Dupattas",
  "Kurta Suit Sets",
  "Blouses",
  "Leggings",
  "Skirts & Ghagras",
  "Shawls & Wraps",
  "Palazzos & Culottes",
];

// jevelley box
const Jevellery = [
  "Fashion Jevellery",
  "Earrings",
  "Gold Jevellery",
  "Selver Jevellary",
  "Diamond Jevellery",
];

const FootWearWomen = [
  "Heels",
  "Boots",
  "Casual Shoes",
  "Flats",
  "Sport Shoes",
  "Flat Sandales",
  "Flip Flop & Sleppers",
];
//women sub categories

//fashion size
const MenSize = [
  { size: "XXS" },
  { size: "XS" },
  { size: "S" },
  { size: "M" },
  { size: "L" },
  { size: "XL" },
  { size: "2XL" },
  { size: "3XL" },
];
const KidsSize = [
  { size: "XS 4-5 years" },
  { size: "S 6-7 years" },
  { size: "M 8-9 years" },
  { size: "L 10-11 years" },
  { size: "XL 12-13 years" },
];

//stock menu
const stockMenu = [{ size: "In stock" }, { size: "Out of stock" }];

//pant size
const pantSize = [
  { size: "28" },
  { size: "32" },
  { size: "34" },
  { size: "36" },
  { size: "38" },
  { size: "40" },
];
const ShoesSize = [
  { size: "4" },
  { size: "5" },
  { size: "6" },
  { size: "7" },
  { size: "8" },
  { size: "9" },
  { size: "10" },
  { size: "11" },
  { size: "12" },
];

function ProductAdd() {
  //check categories input seleted
  const [checkIsFashion, setCheckIsFashion] = useState(false);
  const [checkIsElectronics, setCheckIsElectronics] = useState(false);
  const [checkIsBeautyAndKids, setCheckIsBeautyAndKids] = useState(false);
  const [checkIsHomeAndKitchen, setCheckIsHomeAndKitchen] = useState(false);

  //check sub categories
  // fashion
  const [checkIsMen, setCheckIsMen] = useState(false);
  const [checkIsWomen, setCheckIsWomen] = useState(false);

  //check men categories
  const [checkWesternWear, seCheckWesternWear] = useState(false);
  const [checkInnerwearSleeperWear, setCheckInnerwearSleeperWear] =
    useState(false);
  const [checkFooterWear, seCheckFooterWear] = useState(false);
  const [checkBottomWear, seCheckBottomWear] = useState(false);
  //check men categories

  //check women categories
  const [checkEnthicWear, seCheckEnthicWear] = useState(false);
  const [checkWesternWearWomen, setCheckWesternWearWomen] = useState(false);
  const [checkJevellery, seCheckJevellery] = useState(false);
  const [checkFootWearWomen, seCheckFootWearWomen] = useState(false);
  //check women categories

  //Home & Kitchen categories checkconst
  const [checkIsForBed, setCheckIsForBed] = useState(false);
  const [checkIsHomeDecor, setCheckIsHomeDecor] = useState(false);
  const [checkIsCushionsAndPillows, setCheckIsCushionsAndPillows] =
    useState(false);
  const [checkIsBath, setCheckIsBath] = useState(false);
  const [checkIsDining, setCheckIsDining] = useState(false);
  const [checkIsFlooring, setCheckIsFlooring] = useState(false);
  const [checkIsStorage, setCheckIsStorage] = useState(false);
  //Home & Kitchen categories checkconst

  //Beauty and kids categories checkconst
  const [checkIsMakeup, setCheckIsMakeup] = useState(false);
  const [checkIsHaircare, setCheckIsHaircare] = useState(false);
  const [checkIsKidsBoy, setCheckIsKidsBoy] = useState(false);
  const [checkIsKidsGirl, setCheckIsKidsGirl] = useState(false);
  const [checkIsSkincareAndBodycare, setCheckIsSkincareAndBodycare] =
    useState(false);
  const [checkIsAppliances, setCheckIsAppliances] = useState(false);
  const [checkIsMenGrooming, setCheckIsMenGrooming] = useState(false);
  const [checkIsBeautyGiftAndMakeupset, setCheckIsBeautyGiftAndMakeupset] =
    useState(false);
  //Beauty and kids categories checkconst

  //validation input
  const [validProductName, setValidProductName] = useState("");
  const [prodcutDesribtion, setProdcutDesribtion] = useState("");
  const [productCategories, setProductCategories] = useState("");

  //for price and discount
  const [originalPrice, setOriginalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [stockAvailable, setstockAvailable] = useState("");
  const [Weight, setWeight] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountedNote, setDiscountedNote] = useState("");

  const [fashionCategory, setFashionCategory] = useState({
    Gender: "",
    WomenCategory: "",
    MenCategory: "",
    Size: "",
  });

  const [womenFashionCategory, setWomenFashionCategory] = useState({
    EthnicWearCategory: "",
    WesternWearCategory: "",
    JevelleryCategory: "",
    FooterWearWomenCategory: "",
  });

  //in men category
  const [westernWearMenCategory, setWesternWearMenCategory] = useState("");
  const [innerwearSleeperWearMenCategory, setInnerwearSleeperWearMenCategory] =
    useState("");
  const [footerWearMenCategory, setFooterWearMenCategory] = useState("");
  const [bottomWearMenCategory, setBottomWearMenCategory] = useState("");

  //electronics category
  const [electronicsCategory, setElectronicsCategory] = useState("");

  //beauty and kiks category
  const [beautyAndKidsCategory, setBeautyAndKidsCategory] = useState({
    Category: "",
    MakeupCategory: "",
    HaircareCategory: "",
    KidsBoyCategory: "",
    KidsGirlCategory: "",
    SkincareAndBodycareCategory: "",
    AppliancesCategory: "",
    MenGroomingCategory: "",
    BeautyGiftAndMakeupsetCategory: "",
  });

  //home and kitchen category
  const [homeAndKitechnCategory, setHomeAndKitchenCategory] = useState({
    Category: "",
    ForBedCategory: "",
    HomeDecorCategory: "",
    CushionsAndPillowsCategory: "",
    BathCategory: "",
    DiningCategory: "",
    FlooringCategory: "",
    StorageCategory: "",
  });

  //validation true false
  const [errorForProductName, setErrorForProductName] = useState(false);
  const [errorForDescribtion, setErrorForDescribtion] = useState(false);
  const [errorForCategories, setErrorForCategories] = useState(false);
  const [errorForFashion, setErrorForFashion] = useState({
    errorGender: false,
    errorMenCategory: false,
    errorWomenCategory: false,
  });

  //getting product image
  const [productImage, setProductImage] = useState("");
  //firebase base storage refernce
  const storage = getStorage(app);

  // check switch
  const [isProductInDiscount, setisProductInDiscount] = useState(false);
  //uuid
  const [UUID, setuuid] = useState();
  //firebase database initilize
  const database = getDatabase(app);
  const [uid, setuid] = useState();

  onAuthStateChanged(Auth, (user) => {
    if (user) {
      setuid(user.uid);
    }
  });

  //validation function by pressing button
  function ValodationOfAllInput() {
    //product name validation

    if (!validProductName) {
      setErrorForProductName(true);
    } else {
      setErrorForProductName(false);
    }

    if (!prodcutDesribtion) {
      setErrorForDescribtion(true);
    } else {
      setErrorForDescribtion(false);
    }

    if (!productCategories) {
      setErrorForCategories(true);
    } else {
      setErrorForCategories(false);
    }

    if (!fashionCategory.Gender) {
      setErrorForFashion({ ...errorForFashion, errorGender: true });
    } else {
      setErrorForFashion({ ...errorForFashion, errorGender: false });
    }

    let uuid = new Date().valueOf().toString();
    const reference = ref(
      database,
      "Vendors/" + uid + "/" + "products/" + uuid
    );

    if (productCategories === "Fashion") {
      if (fashionCategory.Gender === "Men") {
        //fashion product store in databse
        if (fashionCategory.MenCategory === "Western Wear") {
          if (isProductInDiscount) {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "men",
              category: fashionCategory.MenCategory,
              inCategory: westernWearMenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              image: productImage,
              stockAvailable: stockAvailable,
              discountedPrice: discountedPrice,
              discountedNote: discountedNote,
              weight: Weight,
            }).then(() => {
              console.log("Done");
            });
          } else {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "men",
              category: fashionCategory.MenCategory,
              inCategory: westernWearMenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              image1: productImage,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
            });
          }
        } else if (fashionCategory.MenCategory === "Innerwear SleeperWear") {
          if (isProductInDiscount) {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "men",
              category: fashionCategory.MenCategory,
              inCategory: innerwearSleeperWearMenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              discountedPrice: discountedPrice,
              discountedNote: discountedNote,
              weight: Weight,
            }).then(() => {
              console.log("Done");
            });
          } else {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "men",
              category: fashionCategory.MenCategory,
              inCategory: innerwearSleeperWearMenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
            });
          }
        } else if (fashionCategory.MenCategory === "Footer Wear") {
          if (isProductInDiscount) {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "men",
              category: fashionCategory.MenCategory,
              inCategory: footerWearMenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              discountedPrice: discountedPrice,
              discountedNote: discountedNote,
              weight: Weight,
            }).then(() => {
              console.log("Done");
            });
          } else {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "men",
              category: fashionCategory.MenCategory,
              inCategory: footerWearMenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
            });
          }
        } else if (fashionCategory.MenCategory === "Bottom Wear") {
          if (isProductInDiscount) {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "men",
              category: fashionCategory.MenCategory,
              inCategory: bottomWearMenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              discountedPrice: discountedPrice,
              discountedNote: discountedNote,
              weight: Weight,
            }).then(() => {
              console.log("Done");
            });
          } else {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "men",
              category: fashionCategory.MenCategory,
              inCategory: bottomWearMenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
            });
          }
        }
      } else if (fashionCategory.Gender === "Women") {
        if (fashionCategory.WomenCategory === "Western Wear") {
          if (isProductInDiscount) {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "women",
              category: fashionCategory.WomenCategory,
              inCategory: womenFashionCategory.WesternWearCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              discountedPrice: discountedPrice,
              discountedNote: discountedNote,
              weight: Weight,
            }).then(() => {
              console.log("Done");
            });
          } else {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "women",
              category: fashionCategory.WomenCategory,
              inCategory: womenFashionCategory.WesternWearCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              weight: Weight,
            });
          }
        } else if (fashionCategory.WomenCategory === "Enthic Wear") {
          if (isProductInDiscount) {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "women",
              category: fashionCategory.WomenCategory,
              inCategory: womenFashionCategory.EthnicWearCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              discountedPrice: discountedPrice,
              discountedNote: discountedNote,
              weight: Weight,
            }).then(() => {
              console.log("Done");
            });
          } else {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "women",
              category: fashionCategory.WomenCategory,
              inCategory: womenFashionCategory.EthnicWearCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              weight: Weight,
            });
          }
        } else if (fashionCategory.WomenCategory === "Jevellery") {
          if (isProductInDiscount) {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "women",
              category: fashionCategory.WomenCategory,
              inCategory: womenFashionCategory.JevelleryCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              discountedPrice: discountedPrice,
              discountedNote: discountedNote,
              weight: Weight,
            }).then(() => {
              console.log("Done");
            });
          } else {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "women",
              category: fashionCategory.WomenCategory,
              inCategory: womenFashionCategory.JevelleryCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              weight: Weight,
            });
          }
        } else if (fashionCategory.WomenCategory === "Footer Wear Women") {
          if (isProductInDiscount) {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "women",
              category: fashionCategory.WomenCategory,
              inCategory: womenFashionCategory.FooterWearWomenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              discountedPrice: discountedPrice,
              discountedNote: discountedNote,
              weight: Weight,
            }).then(() => {
              console.log("Done");
            });
          } else {
            set(reference, {
              productName: validProductName,
              productCategory: "fashion",
              gender: "women",
              category: fashionCategory.WomenCategory,
              inCategory: womenFashionCategory.FooterWearWomenCategory,
              describtion: prodcutDesribtion,
              size: fashionCategory.Size,
              originalPrice: originalPrice,
              stockQuantity: quantity,
              stockAvailable: stockAvailable,
              weight: Weight,
            });
          }
        }
      }
      // electronics product store in databse
    } else if (productCategories === "Electronics") {
      if (isProductInDiscount) {
        set(reference, {
          productName: validProductName,
          productCategory: productCategories,
          inCategory: electronicsCategory,
          describtion: prodcutDesribtion,
          originalPrice: originalPrice,
          stockQuantity: quantity,
          stockAvailable: stockAvailable,
          discountedPrice: discountedPrice,
          discountedNote: discountedNote,
          weight: Weight,
        }).then(() => {
          console.log("Done");
        });
      } else {
        set(reference, {
          productName: validProductName,
          productCategory: productCategories,
          inCategory: electronicsCategory,
          describtion: prodcutDesribtion,
          originalPrice: originalPrice,
          stockQuantity: quantity,
          stockAvailable: stockAvailable,
          weight: Weight,
        });
      }

      //Beauty and kids product store in databse
    } else if (productCategories === "Beauty & Kids") {
      if (homeAndKitechnCategory.Category === "Makeup") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.MakeupCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.MakeupCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Haircare") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.HaircareCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.HaircareCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Kids Boy") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.KidsBoyCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.KidsBoyCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Kids Girl") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.KidsGirlCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.KidsGirlCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Skincare & Bodycare") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.SkincareAndBodycareCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.SkincareAndBodycareCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Appliances") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.AppliancesCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.AppliancesCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Men Grooming") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.MenGroomingCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.MenGroomingCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (
        homeAndKitechnCategory.Category === "Beauty Gift & Makeupset"
      ) {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.BeautyGiftAndMakeupsetCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: beautyAndKidsCategory.Category,
            inCategory: beautyAndKidsCategory.BeautyGiftAndMakeupsetCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      }

      // Home and kitchen product store in databse
    } else if (productCategories === "Home & Kitchen") {
      if (homeAndKitechnCategory.Category === "For Bed") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.ForBedCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.ForBedCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Home Decor") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.HomeDecorCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.HomeDecorCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Cushions & Pillows") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.CushionsAndPillowsCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.CushionsAndPillowsCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Bath") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.BathCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.BathCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Dining") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.DiningCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.DiningCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Flooring") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.FlooringCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.FlooringCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      } else if (homeAndKitechnCategory.Category === "Storage") {
        if (isProductInDiscount) {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.StorageCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            discountedPrice: discountedPrice,
            discountedNote: discountedNote,
            weight: Weight,
          }).then(() => {
            console.log("Done");
          });
        } else {
          set(reference, {
            productName: validProductName,
            productCategory: productCategories,
            category: homeAndKitechnCategory.Category,
            inCategory: homeAndKitechnCategory.StorageCategory,
            describtion: prodcutDesribtion,
            originalPrice: originalPrice,
            stockQuantity: quantity,
            stockAvailable: stockAvailable,
            weight: Weight,
          });
        }
      }
    }
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
                    error={errorForProductName}
                    helperText={
                      errorForProductName ? "Please enter product name" : null
                    }
                    onChange={(event) => {
                      setValidProductName(event.target.value);
                    }}
                  />

                  {/* input 2 */}
                  <TextField
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
                        error={errorForDescribtion}
                        helperText={
                          errorForDescribtion
                            ? "Write somthing about the product"
                            : null
                        }
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
                        id="combo-box-demo"
                        options={Categories}
                        sx={{ width: 350, marginTop: 1 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Categories"
                            error={errorForCategories}
                            helperText={
                              errorForCategories
                                ? "Please select category"
                                : null
                            }
                          />
                        )}
                        onChange={(Event, value) => {
                          setProductCategories(value);
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: 2,
                          fontFamily: "Segoe UI",
                          color: "GrayText",
                        }}
                      >
                        Sub categories
                      </Typography>
                      {/* fashion categories input */}
                      {productCategories === "Fashion" ? (
                        <>
                          <Autocomplete
                            options={FashionCategoriesGender}
                            sx={{ width: 350, marginTop: 2 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Gender of fashion"
                                error={errorForFashion.errorGender}
                                helperText={
                                  errorForFashion.errorGender
                                    ? "please select category"
                                    : null
                                }
                              />
                            )}
                            onChange={(Event, value) => {
                              setFashionCategory({
                                ...fashionCategory,
                                Gender: value,
                              });
                            }}
                          />

                          {/* men categories input show */}
                          {fashionCategory.Gender === "Men" ? (
                            <>
                              <Autocomplete
                                options={MenCategories}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Men fashion categories"
                                  />
                                )}
                                onChange={(Event, value) => {
                                  setFashionCategory({
                                    ...fashionCategory,
                                    MenCategory: value,
                                  });
                                }}
                              />

                              {fashionCategory.MenCategory ===
                              "Western Wear" ? (
                                <Autocomplete
                                  options={WesternWear}
                                  sx={{ width: 350, marginTop: 2 }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Western Wear"
                                    />
                                  )}
                                  onChange={(Event, value) => {
                                    setWesternWearMenCategory(value);
                                  }}
                                />
                              ) : null}

                              {fashionCategory.MenCategory === "Bottom Wear" ? (
                                <Autocomplete
                                  options={BottomWear}
                                  sx={{ width: 350, marginTop: 2 }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Bottom Wear"
                                    />
                                  )}
                                  onChange={(event, value) => {
                                    setBottomWearMenCategory(value);
                                  }}
                                />
                              ) : null}

                              {fashionCategory.MenCategory === "Footer Wear" ? (
                                <Autocomplete
                                  options={FooterWear}
                                  sx={{ width: 350, marginTop: 2 }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Footer Wear"
                                    />
                                  )}
                                  onChange={(Event, value) => {
                                    setFooterWearMenCategory(value);
                                  }}
                                />
                              ) : null}

                              {fashionCategory.MenCategory ===
                              "Innerwear SleeperWear" ? (
                                <Autocomplete
                                  options={InnerwearSleeperWear}
                                  sx={{ width: 350, marginTop: 2 }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Innerwear SleeperWear "
                                    />
                                  )}
                                  onChange={(Event, value) => {
                                    setInnerwearSleeperWearMenCategory(value);
                                  }}
                                />
                              ) : null}
                            </>
                          ) : null}

                          {/* Women categories input show */}
                          {fashionCategory.Gender === "Women" ? (
                            <>
                              <Autocomplete
                                options={WomenCategories}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Women fashion categories"
                                  />
                                )}
                                onChange={(Event, value) => {
                                  setFashionCategory({
                                    ...fashionCategory,
                                    WomenCategory: value,
                                  });
                                }}
                              />

                              {fashionCategory.WomenCategory ===
                              "Western Wear" ? (
                                <Autocomplete
                                  options={WesternWearWomen}
                                  sx={{ width: 350, marginTop: 2 }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Western Wear Women"
                                    />
                                  )}
                                  onChange={(Event, value) => {
                                    setWomenFashionCategory({
                                      ...womenFashionCategory,
                                      WesternWearCategory: value,
                                    });
                                  }}
                                />
                              ) : null}

                              {fashionCategory.WomenCategory ===
                              "Enthic Wear" ? (
                                <Autocomplete
                                  options={EnthicWear}
                                  sx={{ width: 350, marginTop: 2 }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Enthic Wear"
                                    />
                                  )}
                                  onChange={(Event, value) => {
                                    setWomenFashionCategory({
                                      ...womenFashionCategory,
                                      EthnicWearCategory: value,
                                    });
                                  }}
                                />
                              ) : null}

                              {fashionCategory.WomenCategory ===
                              "Footer Wear Women" ? (
                                <Autocomplete
                                  options={FootWearWomen}
                                  sx={{ width: 350, marginTop: 2 }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="FootWear Women"
                                    />
                                  )}
                                  onChange={(Event, value) => {
                                    setWomenFashionCategory({
                                      ...womenFashionCategory,
                                      FooterWearWomenCategory: value,
                                    });
                                  }}
                                />
                              ) : null}

                              {fashionCategory.WomenCategory === "Jevellery" ? (
                                <Autocomplete
                                  options={Jevellery}
                                  sx={{ width: 350, marginTop: 2 }}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Jevellery" />
                                  )}
                                  onChange={(Event, value) => {
                                    setWomenFashionCategory({
                                      ...womenFashionCategory,
                                      JevelleryCategory: value,
                                    });
                                  }}
                                />
                              ) : null}
                            </>
                          ) : null}
                        </>
                      ) : null}

                      {/* Electronics categories */}
                      {productCategories === "Electronics" ? (
                        <>
                          <Autocomplete
                            options={ElectonicsCategories}
                            sx={{ width: 350, marginTop: 2 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Electronics categories"
                              />
                            )}
                            onChange={(Event, value) => {
                              setElectronicsCategory(value);
                            }}
                          />
                        </>
                      ) : null}

                      {/* Home and Kitchen categories */}
                      {productCategories === "Home & Kitchen" ? (
                        <>
                          <Autocomplete
                            options={HomeAndKitchenCategories}
                            sx={{ width: 350, marginTop: 2 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Home & Kitchen Categories"
                              />
                            )}
                            onChange={(Event, value) => {
                              setHomeAndKitchenCategory({
                                ...homeAndKitechnCategory,
                                Category: value,
                              });
                            }}
                          />

                          <>
                            {/* For bed categories */}
                            {homeAndKitechnCategory.Category === "For Bed" ? (
                              <Autocomplete
                                options={ForBed}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="For Bed" />
                                )}
                                onChange={(Event, value) => {
                                  setHomeAndKitchenCategory({
                                    ...homeAndKitechnCategory,
                                    ForBedCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* homr decore categories */}
                            {homeAndKitechnCategory.Category ===
                            "Home Decor" ? (
                              <Autocomplete
                                options={HomeDecor}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Home Decore" />
                                )}
                                onChange={(Event, value) => {
                                  setHomeAndKitchenCategory({
                                    ...homeAndKitechnCategory,
                                    HomeDecorCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Cushions And Pillows categories */}
                            {homeAndKitechnCategory.Category ===
                            "Cushions & Pillows" ? (
                              <Autocomplete
                                options={CushionsAndPillows}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Cushions & Pillows"
                                  />
                                )}
                                onChange={(Event, value) => {
                                  setHomeAndKitchenCategory({
                                    ...homeAndKitechnCategory,
                                    CushionsAndPillowsCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* bath And Pillows categories */}
                            {homeAndKitechnCategory.Category === "Bath" ? (
                              <Autocomplete
                                options={Bath}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Bath" />
                                )}
                                onChange={(Event, value) => {
                                  setHomeAndKitchenCategory({
                                    ...homeAndKitechnCategory,
                                    BathCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Dining And Pillows categories */}
                            {homeAndKitechnCategory.Category === "Dining" ? (
                              <Autocomplete
                                options={Dining}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Dining" />
                                )}
                                onChange={(Event, value) => {
                                  setHomeAndKitchenCategory({
                                    ...homeAndKitechnCategory,
                                    DiningCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Dining And Pillows categories */}
                            {homeAndKitechnCategory.Category === "Flooring" ? (
                              <Autocomplete
                                options={Flooring}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Flooring" />
                                )}
                                onChange={(Event, value) => {
                                  setHomeAndKitchenCategory({
                                    ...homeAndKitechnCategory,
                                    FlooringCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Dining And Pillows categories */}
                            {homeAndKitechnCategory.Category === "Storage" ? (
                              <Autocomplete
                                options={Storage}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Storage" />
                                )}
                                onChange={(Event, value) => {
                                  setHomeAndKitchenCategory({
                                    ...homeAndKitechnCategory,
                                    StorageCategory: value,
                                  });
                                }}
                              />
                            ) : null}
                          </>
                        </>
                      ) : null}

                      {/* Beauty and Kids categories */}
                      {productCategories === "Beauty & Kids" ? (
                        <>
                          <Autocomplete
                            options={BeautyAndKidsCategories}
                            sx={{ width: 350, marginTop: 2 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Beauty and kids categories"
                              />
                            )}
                            onChange={(Event, value) => {
                              setBeautyAndKidsCategory({
                                ...beautyAndKidsCategory,
                                Category: value,
                              });
                            }}
                          />

                          <>
                            {/* Makeup categories */}
                            {beautyAndKidsCategory.Category === "Makeup" ? (
                              <Autocomplete
                                options={Makeup}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Makeup" />
                                )}
                                onChange={(Event, value) => {
                                  setBeautyAndKidsCategory({
                                    ...beautyAndKidsCategory,
                                    MakeupCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Haircare categories */}
                            {beautyAndKidsCategory.Category === "Haircare" ? (
                              <Autocomplete
                                options={Haircare}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Haircare" />
                                )}
                                onChange={(Event, value) => {
                                  setBeautyAndKidsCategory({
                                    ...beautyAndKidsCategory,
                                    HaircareCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Kids Boy categories */}
                            {beautyAndKidsCategory.Category === "Kids Boy" ? (
                              <Autocomplete
                                options={KidsBoy}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Kids Boy" />
                                )}
                                onChange={(Event, value) => {
                                  setBeautyAndKidsCategory({
                                    ...beautyAndKidsCategory,
                                    KidsBoyCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Kids Girl categories */}
                            {beautyAndKidsCategory.Category === "Kids Girl" ? (
                              <Autocomplete
                                options={KidsGirl}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Kids Girl" />
                                )}
                                onChange={(Event, value) => {
                                  setBeautyAndKidsCategory({
                                    ...beautyAndKidsCategory,
                                    KidsGirlCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Skincare & Bodycare categories */}
                            {beautyAndKidsCategory.Category ===
                            "Skincare & Bodycare" ? (
                              <Autocomplete
                                options={SkinCareAndBodyCare}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Skincare & Bodycare"
                                  />
                                )}
                                onChange={(Event, value) => {
                                  setBeautyAndKidsCategory({
                                    ...beautyAndKidsCategory,
                                    SkincareAndBodycareCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Appliances categories */}
                            {beautyAndKidsCategory.Category === "Appliances" ? (
                              <Autocomplete
                                options={Appliances}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Appliances" />
                                )}
                                onChange={(Event, value) => {
                                  setBeautyAndKidsCategory({
                                    ...beautyAndKidsCategory,
                                    AppliancesCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Men Grooming categories */}
                            {beautyAndKidsCategory.Category ===
                            "Men Grooming" ? (
                              <Autocomplete
                                options={MenGrooming}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Men Grooming" />
                                )}
                                onChange={(Event, value) => {
                                  setBeautyAndKidsCategory({
                                    ...beautyAndKidsCategory,
                                    MenGroomingCategory: value,
                                  });
                                }}
                              />
                            ) : null}

                            {/* Beauty gift & Makeupset categories */}
                            {beautyAndKidsCategory.Category ===
                            "Beauty Gift & Makeupset" ? (
                              <Autocomplete
                                options={BeautyGiftAndMakeupSet}
                                sx={{ width: 350, marginTop: 2 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Beauty gift & Makeupset"
                                  />
                                )}
                                onChange={(Event, value) => {
                                  setBeautyAndKidsCategory({
                                    ...beautyAndKidsCategory,
                                    BeautyGiftAndMakeupsetCategory: value,
                                  });
                                }}
                              />
                            ) : null}
                          </>
                        </>
                      ) : null}

                      {/*  */}
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Products media */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 1,
                  marginTop: 2,
                }}
              >
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
                  filesLimit={1}
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

                {productCategories === "Fashion" ? (
                  <>
                    {/* Fashion men size rendering */}
                    {westernWearMenCategory === "Shirts" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}
                    {westernWearMenCategory === "T-Shirt" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}
                    {westernWearMenCategory === "Jeckets & coats" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}
                    {westernWearMenCategory === "Suits" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}
                    {westernWearMenCategory === "Casual Shirt" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}
                    {westernWearMenCategory === "Formal Shirt" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}
                    {westernWearMenCategory === "Sweatshirts & Hoodies" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {/* pats size rendering */}
                    {westernWearMenCategory === "Jeans" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={pantSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {westernWearMenCategory === "Pants" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={pantSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}
                    {westernWearMenCategory === "Trouser & Pants" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={pantSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {/* inner sizing */}
                    {checkInnerwearSleeperWear ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {/* footer sizing */}
                    {checkFooterWear ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={ShoesSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {/* bottom sizing */}
                    {fashionCategory.MenCategory === "Bottom Wear" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={pantSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {/* women sizing */}
                    {fashionCategory.WomenCategory === "Enthic Wear" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory ===
                    "Footer Wear Women" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={ShoesSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory === "Jeans" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={pantSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Select size"
                            />
                          )}
                          onChange={(event, value) => {
                            setFashionCategory({
                              ...fashionCategory,
                              Size: value,
                            });
                          }}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory ===
                    "Shorts & Skirts" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={pantSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory === "Dresses" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory === "T-shirts" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory === "Tops" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory ===
                    "Jackets & Coats" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory ===
                    "Swearshirt & Hoodies" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </>
                    ) : null}

                    {womenFashionCategory.WesternWearCategory === "Sweaters" ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 4,
                            marginBottom: 2,
                            fontFamily: "Segoe UI",
                            color: "GrayText",
                          }}
                        >
                          Select size
                        </Typography>

                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={MenSize}
                          getOptionLabel={(option) => option.size}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Sizes"
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </>
                    ) : null}
                  </>
                ) : null}

                {/* kids boy sizing */}
                {beautyAndKidsCategory.Category === "Kids Boy" ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: 4,
                        marginBottom: 2,
                        fontFamily: "Segoe UI",
                        color: "GrayText",
                      }}
                    >
                      Select size
                    </Typography>

                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={KidsSize}
                      getOptionLabel={(option) => option.size}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Sizes"
                          placeholder="Select size"
                        />
                      )}
                      onChange={(event, value) => {
                        setFashionCategory({
                          ...fashionCategory,
                          Size: value,
                        });
                      }}
                    />
                  </>
                ) : null}

                {/* Kids girl sizing */}
                {beautyAndKidsCategory.Category === "Kids Girl" ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: 4,
                        marginBottom: 2,
                        fontFamily: "Segoe UI",
                        color: "GrayText",
                      }}
                    >
                      Select size
                    </Typography>

                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={KidsSize}
                      getOptionLabel={(option) => option.size}
                      defaultValue={[KidsSize[0]]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Sizes"
                          placeholder="Size"
                        />
                      )}
                    />
                  </>
                ) : null}

                <Typography
                  variant="h6"
                  sx={{
                    marginTop: 4,
                    marginBottom: 2,
                    fontFamily: "Segoe UI",
                    color: "GrayText",
                  }}
                >
                  Pricing
                </Typography>

                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      color="success"
                      onChange={(event) => {
                        setisProductInDiscount(event.target.checked);
                      }}
                    />
                  }
                  label="Product in discount ?"
                  labelPlacement="end"
                />

                {/* pricing box */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ flexDirection: "column", display: "flex" }}>
                    <TextField
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

                  {isProductInDiscount ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        sx={{
                          width: 350,
                          marginLeft: 2,
                        }}
                        label="Discounted price"
                        placeholder="₹"
                        type="number"
                        onChange={(event) => {
                          setDiscountedPrice(event.target.value);
                        }}
                      />
                      <TextField
                        sx={{
                          marginTop: 2,
                          width: 350,
                          marginLeft: 2,
                        }}
                        label="Example 10%"
                        type="number"
                        placeholder="Discount in percentage"
                        onChange={(event) => {
                          setDiscountedNote(event.target.value);
                        }}
                      />
                    </Box>
                  ) : null}
                </Box>
                {/* pricing box */}

                {/* stock check */}

                <Typography
                  variant="h6"
                  sx={{
                    marginTop: 4,
                    marginBottom: 2,
                    fontFamily: "Segoe UI",
                    color: "GrayText",
                  }}
                >
                  stock Availability
                </Typography>

                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={stockMenu}
                  getOptionLabel={(option) => option.size}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="In stock"
                      placeholder="Tags"
                    />
                  )}
                  onChange={(event, value) => {
                    setstockAvailable(value);
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
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ProductAdd;
