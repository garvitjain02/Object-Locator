import React from 'react'
import {Form , Row , Col, Button, Card} from 'react-bootstrap';
import Header from "./Header";
import LeftNav from "./LeftNav";

const Add = () => {
    return (
        <>
        <Header />
      <LeftNav />
        <Card className = 'border-1 p-4 rounded-0' style={{ width: '67rem' , background: '#9dc2b978', marginTop: "1%"}}>
            <Form>
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
      <Button type="submit" className="btn btn-default btn-sm">Add</Button>
    </Form>
        </Card>
        
        </>
    )
}

export default Add
