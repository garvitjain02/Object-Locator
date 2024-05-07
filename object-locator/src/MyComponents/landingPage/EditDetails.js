import React, { useState } from 'react'
// import img1 from '../../images/img1.jpg';
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

  const api_key = "493967971724379"
  const cloud_name = "dpgf5do9z"

  const submit = async (e) => {
    e.preventDefault();
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
      await axios.post("http://localhost:8800/updateItem", {
        iid: state.iid,
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
    window.location.replace ('/');
  }

  return (
    <div>
      <Header />
      <div className='detailsContent'>
        <div className='detailsContentLeft'>
            <img src={state.image} alt="img1" />
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
        }} id='file-field' />
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
