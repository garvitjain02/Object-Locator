import React, { useState } from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import profile from '../../images/blanket.jpeg';
// import PropTypes from 'prop-types'
import {Card, Table, Container, Button} from 'react-bootstrap';
import "../style.css";
import { Form } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";


const EditProfile: FC<{}> = (props) => {
  const { state } = useLocation();
  console.log(state);

  const [email, setEmail] = useState(state.email);
  const [phone, setPhone] = useState(state.phone);
  const [pass, setPass] = useState(state.password);
  const [picture, setPicture] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/updateProfile", {
        uid: sessionStorage.getItem('token'),
        email: email,
        phone: phone,
        pass: pass,
        picture: picture
      });
    } catch (err) {
      console.log(err);
    }
    window.location.replace('/MyProfile');
  }

  return (
    <div>
        <Form>
      <Header />
      <LeftNav />
      <div className='myProfileDetails'>
        <Card className='border-1 rounded-0 shadow-sm'>
          <Card.Body>
            <h3>Personal Details</h3>
              <Table responsive striped hover bordered={true} className='text-center mt-3'>
                <tbody>
                  <tr>
                  <td>NAME</td>
                  <td>{state.name}</td>
                </tr>
                <tr>
                  <td>EMAIL</td>
                  <td><Form.Control type='text' name='email' id='changeEmail' onChange={(e) => setEmail(e.target.value)} defaultValue={state.email} style={{textAlign: 'center'}} /></td>
                </tr>
                <tr>
                  <td>DATE OF BIRTH</td>
                  <td>{state.DOB}</td>
                </tr>
                <tr>
                  <td>PHONE NUMBER</td>
                  <td><Form.Control type='text' name='phone' id='phone'  onChange={(e) => setPhone(e.target.value)} defaultValue={state.phone} style={{textAlign: 'center'}} /></td>
                </tr>
                <tr>
                  <td>PASSWORD</td>
                  <td><Form.Control type='password' name='pass' id='changePass'  onChange={(e) => setPass(e.target.value)} style={{textAlign: 'center'}} /></td>
                </tr>
                <tr>
                  <td>PROFILE PICTURE</td>
                  <td><Form.Control type='file' onChange={(e) => {
          const [file] = e.target.files;
          setPicture((picture) => [...picture, file]);
        }}/></td>
                </tr>
                </tbody>
              </Table>
          </Card.Body>
          <Card.Footer style={{textAlign: 'right'}}>
          <Link to='/MyProfile'><Button variant='danger' style={{marginRight: '1%'}}>Cancel</Button></Link>
          <Link to='/MyProfile'><Button  variant='primary' onClick={submit}>Save Changes</Button></Link>
          </Card.Footer>
        </Card>
      </div>
      <div className='ProfilePic'>
        <Container className='text-center mt-5 mr-2 pd-2'>
          <img src ={profile} style={{ maxWidth: '200px', maxHeight: '200px' }} alt = "profile" />
        </Container>
        
      </div>
      </Form>
    </div>
  )
}

export default EditProfile
