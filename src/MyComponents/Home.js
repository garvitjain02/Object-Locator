import React from 'react';
// import PropTypes from 'prop-types'
import bg from '../images/bg.jpg';
import bg1 from '../images/bg1.jpg';
import './style.css';
import Typed from "react-typed";
import Login from './Login';

const Home = props => {

  return (
    <>
    <div className="container">
        <img src={bg} alt="background" id="background"/>
        <div className="inner">
            <img src={bg1} alt="" id="bg1"/>
            <p id="heading"><Typed strings={['Unable To FIND Objects??']} typeSpeed={130} startDelay={3000} loop={true} /></p>

            <Login/>
        </div>
        
    </div>
    </>
  )
}

Home.propTypes = {

}

export default Home

