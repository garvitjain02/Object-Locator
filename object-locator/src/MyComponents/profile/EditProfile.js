import React from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import profile from '../../images/blanket.jpeg';
// import PropTypes from 'prop-types'
import {Card, Table, Container, Button} from 'react-bootstrap';
import "../style.css";
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const EditProfile = () => {
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
                  <td>Garvit Jain</td>
                </tr>
                <tr>
                  <td>EMAIL</td>
                  <td><Form.Control type='text' name='email' id='changeEmail'/></td>
                </tr>
                <tr>
                  <td>DATE OF BIRTH</td>
                  <td></td>
                </tr>
                <tr>
                  <td>USERNAME</td>
                  <td></td>
                </tr>
                <tr>
                  <td>PHONE NUMBER</td>
                  <td><Form.Control type='text' name='phone' id='phone'/></td>
                </tr>
                <tr>
                  <td>PASSWORD</td>
                  <td><Form.Control type='password' name='pass' id='changePass'/></td>
                </tr>
                <tr>
                  <td>PROFILE PICTURE</td>
                  <td><Form.Control type='file'/></td>
                </tr>
                </tbody>
              </Table>
          </Card.Body>
          <Card.Footer style={{textAlign: 'right'}}>
          <Link to='/MyProfile'><Button variant='danger' style={{marginRight: '1%'}}>Cancel</Button></Link>
            <Button  variant='primary' >Save Changes</Button>
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
