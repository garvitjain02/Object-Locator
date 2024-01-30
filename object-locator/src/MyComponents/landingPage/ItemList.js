import React from 'react'
// import PropTypes from 'prop-types'
import '../style.css';
import img1 from '../../images/img1.jpg';
import Button from 'react-bootstrap/Button';

const ItemList = props => {
  return (
    <div className='itemBlock'>

        <div className='itemImageLogo'>
            <img src={img1} alt="img" />
        </div>

        <div className='itemDesc'>
            <h3>Item Name</h3>
            <h5>Location</h5>
            <p>Description</p>
        </div>
      {/* <h3>{props.ItemName}</h3> */}
      
        <div className='itemButtons'>
            <Button variant="primary">Update</Button>
            <Button variant="danger">Remove</Button>
        </div>

    </div>
  )
}

ItemList.propTypes = {

}

export default ItemList
