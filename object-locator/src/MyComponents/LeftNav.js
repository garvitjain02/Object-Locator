import React from "react";
import Nav from "react-bootstrap/Nav";
import "./style.css";

const LeftNav = () => {
  return (
    <>
      {/* bg-light */}
      <Nav
        className="d-md-block sidebar st1"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/home" className="leftNavLink">Furniture</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" className="leftNavLink">Electronics</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" className="leftNavLink">Miscellaneous</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default LeftNav;
