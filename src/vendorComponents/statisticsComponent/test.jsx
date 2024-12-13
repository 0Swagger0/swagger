import { React, useEffect, useState } from "react";
import { Auth, app } from "../../MyComponent/FirebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue, set } from "firebase/database";

function Test() {
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
    const reference = ref(database, "Vendors/" + uid + "/");
    onValue(reference, (snapshort) => {
      const data = snapshort.child("products").val();
      Object.values(data).map((details) => {
        console.log(details);
      });
    });
  });

  return <div>test</div>;
}

export default Test;
