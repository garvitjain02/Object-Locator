import React from 'react'
import { Button } from 'react-bootstrap'
import Typed from "react-typed";

const Signup = ()  => {
    let st1 = {
    width: '45%',
    marginTop: '5%',
    marginLeft: '40%',
    padding: '0',
    fontSize: '150%',
  };

    return (
    <>
    <form className='signup' method='post'>
        <h5 className='loghead'>Sign Up </h5>
        <input type = "text" name="user" id = "user" placeholder='Enter the UserName'/>
        <br/>
        <input type = "password" name="pass" id ="pass" placeholder='Enter the Password'/>
        <br/>
        <input type = "text" name = "fname" id ="fname" placeholder="Enter your full name"/>
        <br/>
        <input type ="email" name="email" id="email" placeholder="Enter Your email"/>
        <Button type="submit" className="btn btn-default btn-sm" style={st1}>Sign up</Button>

        <p id ="signbtn">Already have a account</p>

    </form>
    </>
)
}

export default Signup

