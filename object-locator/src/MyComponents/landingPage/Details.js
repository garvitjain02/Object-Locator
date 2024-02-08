import React from 'react'
// import PropTypes from 'prop-types'
import img1 from '../../images/img1.jpg';
import '../style.css';
import Button from 'react-bootstrap/Button';
import Header from '../Header';
import { Link } from 'react-router-dom';
import Remove from './Remove';

const Details = props => {
  return (
    <div>
      <Header />
      <div className='detailsContent'>
        <div className='detailsContentLeft'>
            <img src={img1} alt="img1" />
        </div>

        <div className='detailsContentRight' style={{height:'33vw'}}>
            <h2>Item Name</h2>
            <h4>Location</h4>
            <p>Description</p>
            <p>See Previously Stored Locations</p>
            <Link to='/UpdateItem'><Button variant="primary" id='btn1'>Update</Button></Link>
            {/* <Button variant="danger" id='btn2' style={{border: '0'}}><Remove /></Button> */}
            <div style={{float: 'right', width: '81%', marginTop: '2%'}}>
            <Remove />
            </div>
        </div>
        
      </div>

    </div>
  )
}

Details.propTypes = {

}

export default Details
