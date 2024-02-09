import React, { useState } from 'react'
import img1 from '../../images/img1.jpg';
import '../style.css';
import Button from 'react-bootstrap/Button';
import Header from '../Header';
import { Form, Row , Col } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

const EditDetails: FC<{}> = (props) => {
  const { state } = useLocation();
  const [name, setName] = useState(state.name);
  const [desc, setDesc] = useState(state.desc);
  const [loc, setLoc] = useState(state.location);
  const [category, setCategory] = useState(state.category);
  const [picture, setPicture] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/updateItem", {
        iid: state.iid,
        name: name,
        desc: desc,
        location: loc,
        category: category,
        picture: picture
      });
    } catch (err) {
      console.log(err);
    }
    window.location.replace ('/');
  }

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
            
            <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label style={{fontSize: '110%'}}>Item Name</Form.Label>
          <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Item Name" defaultValue={state.name} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCategory">
          <Form.Label style={{fontSize: '110%'}}>Category</Form.Label>
          <Form.Control type="text" onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" defaultValue={state.category} />
        </Form.Group>
      </Row>
 
      <Form.Group className="mb-3" controlId="formGridDesc">
        <Form.Label style={{fontSize: '110%'}}>Description</Form.Label>
        <Form.Control type='text' onChange={(e) => setDesc(e.target.value)} placeholder="Describe about the item" defaultValue={state.desc} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridLoc">
        <Form.Label style={{fontSize: '110%'}}>Location</Form.Label>
        <Form.Control type='text' onChange={(e) => setLoc(e.target.value)} placeholder="Enter location of item" defaultValue={state.location} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridImg">
        <Form.Label style={{fontSize: '110%'}}>Image</Form.Label>
        <Form.Control type="file" onChange={(e) => {
          const [file] = e.target.files;
          setPicture((picture) => [...picture, file]);
        }}/>
      </Form.Group>
            <Link to={'/'}><Button variant="primary" id='btn1' onClick={submit}>Update</Button></Link>
            <Link to='/'><Button variant="danger" id='btn2'>Cancel</Button></Link>
            </Form>
        </div>
        
      </div>

    </div>
  )
}

export default EditDetails
