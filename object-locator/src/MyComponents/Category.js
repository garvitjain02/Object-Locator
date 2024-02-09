import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Form, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import LeftNav from './LeftNav';
import img1 from "../images/img1.jpg";

const Category: FC<{}> = (props) => {
    const { state } = useLocation();
    console.log (state);
    const [items, setItems] = useState([]);

    // const getItems = async () => {
    //     try {
    //         const res = await axios.post("http://localhost:8800/getCategoryItems", {
    //           uid: sessionStorage.getItem("token"),
    //           category: state.category
    //         });
    //         setItems(res.data);
    //       } catch (err) {
    //         console.log(err);
    //       }
    // }

    useEffect(() => {
        const getItems = async () => {
          try {
            const res = await axios.post("http://localhost:8800/getCategoryItems", {
              uid: sessionStorage.getItem("token"),
              category: state.category
            });
            setItems(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getItems();
      }, [state.category]);

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
    <>
      <Header />
      <LeftNav />
      {items.map((item) => (
        <div className="itemBlock">
          <Link to={"/Details"} state={item} style={{ color: "black" }}>
            <div className="itemImageLogo">
              <img src={img1} alt="img" />
            </div>
            <div className="itemDesc">
              <h3>{item.name}</h3>
              <h5>{item.location}</h5>
              <p>{item.desc}</p>
            </div>
            {/* <h3>{props.ItemName}</h3> */}
          </Link>
          <div className="itemButtons">
            <Link to={"/UpdateItem"} state={item}>
              <Button variant="primary">Update</Button>
            </Link>

            <div>
              <Button
                variant="danger"
                onClick={(e) => {
                  setId(item.iid);
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
      ))}
    </>
  )
}

export default Category
