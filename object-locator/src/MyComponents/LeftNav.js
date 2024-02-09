import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

const LeftNav = () => {
  const [cat, setCat] = useState([]);

  useEffect (() => {
    const categories = async () => {
      try {
        const res = await axios.post("http://localhost:8800/getCategories", {
          uid: sessionStorage.getItem("token"),
        });
        setCat (res.data);
      } catch (err) {
        console.log(err);
      }
    };
    categories ();
  }, []);

  return (
    <>
      {/* bg-light */}
      <Nav
        className="d-md-block sidebar st1"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        {cat.map((c) => (
          <Nav.Item>
          <Link to={'/Category'} state={c} className="leftNavLink">{c.category}</Link>
        </Nav.Item>
        ))}
      </Nav>
    </>
  );
};

export default LeftNav;
