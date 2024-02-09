import React, { useEffect, useState } from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import profile from '../../images/blanket.jpeg';
// import PropTypes from 'prop-types'
import {Card, Table, Container, Button} from 'react-bootstrap';
import "../style.css";
import { Link } from 'react-router-dom';
import axios from "axios";

const MyProfile = () => {
  const [prof, setProf] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post("http://localhost:8800/getProfile", {
          uid: sessionStorage.getItem("token"),
        });
        setProf(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  console.log(prof);

  return (
    <div>
      <Header />
      <LeftNav />
      <div className='myProfileDetails'>
      {prof.map((profile) => (
        <Card className='mt-2 border-1 rounded-0 shadow-sm'>
          <Card.Body>
            <h3>Personal Details</h3>
              <Table responsive striped hover bordered={true} className='text-center mt-5'>
                <tbody>
                  <tr>
                  <td>NAME</td>
                  <td>{profile.name}</td>
                </tr>
                <tr>
                  <td>EMAIL</td>
                  <td>{profile.email}</td>
                </tr>
                <tr>
                  <td>DATE OF BIRTH</td>
                  <td>{profile.DOB}</td>
                </tr>
                <tr>
                  <td>PHONE NUMBER</td>
                  <td>{profile.phone}</td>
                </tr>
                </tbody>
              </Table>
          </Card.Body>
          <Card.Footer className='text-center'>
            <Link to={'/EditProfile'} state={profile}>
            <Button  color='warning' >Update Profile</Button>
            </Link>
          </Card.Footer>
        </Card>
        ))}
      </div>
      <div className='ProfilePic'>
        <Container className='text-center mt-5 mr-2 pd-2'>
          <img src ={profile} style={{ maxWidth: '200px', maxHeight: '200px' }} alt = "profile" />
        </Container>
        
      </div>
    </div>
  )
}

MyProfile.propTypes = {

}

export default MyProfile
