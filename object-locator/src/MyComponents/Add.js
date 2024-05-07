import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Form , Row , Col, Button} from 'react-bootstrap';
import axios from "axios";

const Add = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [category, setCategory] = useState("");
  const [picture, setPicture] = useState([]);

  const api_key = "493967971724379"
  const cloud_name = "dpgf5do9z"

  const submit = async (e) => {
    e.preventDefault();
    handleClose();

    const signatureResponse = await axios.get("http://localhost:8800/get-signature");
    const data = new FormData()
    data.append("file", document.querySelector("#file-field").files[0])
    data.append("api_key", api_key)
    data.append("signature", signatureResponse.data.signature)
    data.append("timestamp", signatureResponse.data.timestamp)

    const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: function (e) {
        console.log(e.loaded / e.total)
      }
    })
    console.log(cloudinaryResponse.data)

    try {
      await axios.post("http://localhost:8800/addItem", {
        uid: sessionStorage.getItem('token'),
        name: name,
        desc: desc,
        location: loc,
        category: category,
        photoData : {
          public_id: cloudinaryResponse.data.public_id,
          version: cloudinaryResponse.data.version,
          signature: cloudinaryResponse.data.signature
        }
      });
    } catch (err) {
      console.log(err);
    }
    window.location.replace('/');
  }

  return (
    <div>
      <Button variant="transparent" className="text-white" onClick={handleShow} style={{border:'none'}}>
        Add
      </Button>

      <Modal backdrop={false} fade={false} show={show} onHide={handleClose} style={{padding: '0%'}} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
        
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Item Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />
        </Form.Group>
      </Row>
 
      <Form.Group className="mb-3" controlId="formGridDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={(e) => setDesc(e.target.value)} placeholder="Describe about the item" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridLoc">
        <Form.Label>Location</Form.Label>
        <Form.Control onChange={(e) => setLoc(e.target.value)} placeholder="Enter location of item" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridImg">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={(e) => {
          const [file] = e.target.files;
          setPicture((picture) => [...picture, file]);
        }} id="file-field" />
      </Form.Group>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={submit}>
            Add
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default Add
