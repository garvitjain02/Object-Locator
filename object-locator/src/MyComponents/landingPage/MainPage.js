import React, { useEffect, useState } from "react";
import "../style.css";
import img1 from "../../images/img1.jpg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Header from "../Header";
import LeftNav from "../LeftNav";
import axios from "axios";

const MainPage = () => {
  const [items, setItems] = useState([]);

  useEffect (()=>{
    const getItems = async ()=>{
      try {
        const res = await axios.get("http://localhost:8800/getItems");
        setItems (res.data);
      }
      catch (err)
      {
        console.log(err);
      }
    };
    getItems ();
  }, []);

  console.log (items);

  // const blobToImage = (blob) => {
  //   return (resolve => {
  //     const url = URL.createObjectURL(blob)
  //     let img = new Image()
  //     img.onload = () => {
  //       URL.revokeObjectURL(url)
  //       resolve(img)
  //     }
  //     img.src = url
  //     console.log(url);
  //   })
  // }

//   const blobToImage = (blob) => {
//     return (const myFile = new File([blob], 'image.jpeg', {
//       type: blob.type,
//   })
// );
//   }

  return (
    <>
      <Header />
      <LeftNav />
          {items.map((item)=>(
            <Link to="/Details">
            <div className="itemBlock">
              <div className="itemImageLogo">
                <img src={img1} alt="img" />
              </div>
            <div className="itemDesc">
            <h3>{item.name}</h3>
            <h5>{item.location}</h5>
            <p>{item.desc}</p>
          </div>
          {/* <h3>{props.ItemName}</h3> */}

          <div className="itemButtons">
            <Button variant="primary">Update</Button>
            <Button variant="danger">Remove</Button>
          </div>
        </div>
      </Link>
          ))}
          
    </>
  );
};

export default MainPage;
