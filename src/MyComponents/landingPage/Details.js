import React from 'react'
// import PropTypes from 'prop-types'
import Header from '../Header';
import img1 from '../../images/img1.jpg';
import '../style.css';
import Button from 'react-bootstrap/Button';

const Details = props => {
    let st = {
        margin: '1%'
    };

  return (
    <div style={st}>
      <Header/>
      
      <div className='detailsContent'>
        <div className='detailsContentLeft'>
            <img src={img1} alt="img1" />
        </div>

        <div className='detailsContentRight'>
            <h2>Item Name</h2>
            <h4>Location</h4>
            <p>Description</p>
            <p>See Previously Stored Locations</p>
            <Button variant="primary" id='btn1'>Update</Button>
            <Button variant="danger" id='btn2'>Remove</Button>
        </div>
        
      </div>

    </div>
  )
}

Details.propTypes = {

}

export default Details
