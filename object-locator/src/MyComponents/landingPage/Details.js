import React, { useState } from "react";
// import img1 from "../../images/img1.jpg";
import "../style.css";
import Button from "react-bootstrap/Button";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import { Form, Modal } from "react-bootstrap";
import axios from "axios";

const Details: FC<{}> = (props) => {
  const { state } = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [id, setId] = useState();

  const submit = async (e) => {
    try {
      axios.post("http://localhost:8800/removeItem", {
        id: id,
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="detailsContent">
        <div className="detailsContentLeft">
          <img src={state.image} alt="img1" />
        </div>

        <div className="detailsContentRight" style={{ height: "33vw" }}>
          <h2>{state.name}</h2>
          <h4>{state.location}</h4>
          <p>{state.desc}</p>
          {/* <p>See Previously Stored Locations</p> */}
          <Link to={"/UpdateItem"} state={state}>
            <Button variant="primary" id="btn1">
              Update
            </Button>
          </Link>
          {/* <Button variant="danger" id='btn2' style={{border: '0'}}><Remove /></Button> */}
          <div style={{ float: "right", width: "81%", marginTop: "2%" }}>
            {/* <Remove /> */}

            <Button
              variant="danger"
              onClick={(e) => {
                setId(state.iid);
                handleShow();
              }}
            >
              Remove
            </Button>

            <Modal
              backdrop={false}
              fade={false}
              show={show}
              onHide={handleClose}
              style={{ padding: "0%" }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header
                style={{ backgroundColor: "rgb(16 94 98)" }}
                closeButton
              >
                <Modal.Title>Remove Item</Modal.Title>
              </Modal.Header>
              <Form>
                <Modal.Body
                  style={{
                    paddingTop: "1%",
                    paddingBottom: "5%",
                    fontSize: "110%",
                  }}
                >
                  Do you really want to remove this Item?
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "whitesmoke" }}>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Link to={"/"}>
                    <Button type="submit" variant="danger" onClick={submit}>
                      Remove
                    </Button>
                  </Link>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {};

export default Details;
