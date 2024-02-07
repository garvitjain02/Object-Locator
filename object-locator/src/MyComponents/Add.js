import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Form , Row , Col, Button} from 'react-bootstrap';

const Add = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Form.Control type="text" placeholder="Enter Item Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" placeholder="Enter category" />
        </Form.Group>
      </Row>
 
      <Form.Group className="mb-3" controlId="formGridDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Describe about the item" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridLoc">
        <Form.Label>Location</Form.Label>
        <Form.Control placeholder="Enter location of item" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridImg">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default Add
