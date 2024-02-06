// import React from 'react'
// import Header from '../Header'
// import LeftNav from '../LeftNav'
// // import PropTypes from 'prop-types'

// const MyProfile = props => {
//   return (
//     <div>
//       <Header />
//       <LeftNav />
//       <div className='myProfileDetails'>
//         <h3>Personal Details :</h3>
//         <hr />
//         <pre>
//         <h5>
//           Name          : Garvit Jain <br />
//           Date of Birth : <br />
//           Username      : <br />
//           Email         : <br />
//           Phone Number  : <br />
//         </h5>
//         </pre>
//       </div>
//     </div>
//   )
// }


// MyProfile.propTypes = {

// }

// export default MyProfile

import React from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import profile from '../../images/blanket.jpeg';
// import PropTypes from 'prop-types'
import {Card, Table, Container, Button} from 'react-bootstrap';
import "../style.css";

const MyProfile = props => {
  return (
    <div>
      <Header />
      <LeftNav />
      <div className='myProfileDetails'>
        <Card className='mt-2 border-1 rounded-0 shadow-sm'>
          <Card.Body>
            <h3>Personal Details</h3>
              <Table responsive striped hover bordered={true} className='text-center mt-5'>
                <tbody>
                  <tr>
                  <td>NAME</td>
                  <td>Garvit Jain</td>
                </tr>
                <tr>
                  <td>EMAIL</td>
                  <td></td>
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
                  <td></td>
                </tr>
                </tbody>
              </Table>
          </Card.Body>
          <Card.Footer className='text-center'>
                        <Button  color='warning' >Update Profile</Button>
          </Card.Footer>
        </Card>
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
