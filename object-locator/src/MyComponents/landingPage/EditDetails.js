import React from 'react'
import img1 from '../../images/img1.jpg';
import '../style.css';
import Button from 'react-bootstrap/Button';
import Header from '../Header';
import { Form, Row , Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const EditDetails = () => {
  return (
    <div>
      <Header />
      <div className='detailsContent'>
        <div className='detailsContentLeft'>
            <img src={img1} alt="img1" />
        </div>
        <h2 style={{marginLeft: '39%', marginBottom: '0%'}}>Update Item</h2>
        <div className='detailsContentRight'>
            
            <Form>
            {/* <h2>Item Name</h2>
            <h4>Location</h4>
            <p>Description</p>
            <p>See Previously Stored Locations</p> */}
            <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label style={{fontSize: '110%'}}>Item Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Item Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCategory">
          <Form.Label style={{fontSize: '110%'}}>Category</Form.Label>
          <Form.Control type="text" placeholder="Enter category" />
        </Form.Group>
      </Row>
 
      <Form.Group className="mb-3" controlId="formGridDesc">
        <Form.Label style={{fontSize: '110%'}}>Description</Form.Label>
        <Form.Control placeholder="Describe about the item" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridLoc">
        <Form.Label style={{fontSize: '110%'}}>Location</Form.Label>
        <Form.Control placeholder="Enter location of item" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridImg">
        <Form.Label style={{fontSize: '110%'}}>Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
            <Button variant="primary" id='btn1'>Update</Button>
            <Link to='/'><Button variant="danger" id='btn2'>Cancel</Button></Link>
            </Form>
        </div>
        
      </div>

    </div>
  )
}

export default EditDetails
