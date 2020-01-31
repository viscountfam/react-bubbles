import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth"
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
          .get("colors")
          .then(res => {
              console.log("this is the response from the color api get request", res)
              setColorList(res.data)
          })
          .catch(err => {
            console.log("an error occurred when trying to make the API get request", err)
          })
  }, [])



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
