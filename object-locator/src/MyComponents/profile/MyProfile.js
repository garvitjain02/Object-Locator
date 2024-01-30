import React from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
// import PropTypes from 'prop-types'

const MyProfile = props => {
  return (
    <div>
      <Header />
      <LeftNav />
      <div className='myProfileDetails'>
        <h3>Personal Details :</h3>
        <hr />
        <pre>
        <h5>
          Name          : Garvit Jain <br />
          Date of Birth : <br />
          Username      : <br />
          Email         : <br />
          Phone Number  : <br />
        </h5>
        </pre>
      </div>
    </div>
  )
}

MyProfile.propTypes = {

}

export default MyProfile
