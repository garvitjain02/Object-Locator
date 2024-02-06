import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import bg from '../images/bg.png';
import bg1 from '../images/bg1.jpg';
import Typed from "react-typed";
// import { Button } from 'react-bootstrap';
import './style.css';
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    let st1 = {
        width: '45%',
        marginTop: '5%',
        marginLeft: '40%',
        padding: '0',
        fontSize: '150%',
      };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/signup", {
        name: name,
        email: email,
        phone: user,
        password: pass,
      });
      console.log(name);
      console.log(email);
      console.log(user);
      console.log(pass);
      console.log(res.data);
      if (res.data.status === 200)
      {
        sessionStorage.setItem("token", true);
        window.location.replace('/');
      }
      else
      {
        document.getElementById("wrong").style.display = "block";
      }
    } catch (err) {
      console.log(err);
    }
  };

      return (
        <>
        <div className="container">
            <img src={bg} alt="background" id="background"/>
            <div className="inner">
                <img src={bg1} alt="" id="bg1"/>
                <p id="heading"><Typed strings={['Unable To FIND Objects??']} typeSpeed={100} backSpeed={20} startDelay={3000} loop={true} showCursor={false} /></p>
    
                <form className='signup' method='post' onSubmit={submit}>
                <p id="wrong">*Invalid Details</p>
                <h5 className='loghead'>Sign Up </h5>
                <input type = "text" name = "fname" id ="fname" onChange={(e) => setName(e.target.value)} placeholder="Full Name"/>
        <br/>
        <input type ="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <br/>
        
        <input type = "text" name="user" id = "user" onChange={(e) => setUser(e.target.value)} placeholder='Phone Number'/>
        <br/>
        <input type = "password" name="pass" id ="pass" onChange={(e) => setPass(e.target.value)} placeholder='Password'/>
        
        <Button type="submit" className="btn btn-default btn-sm" style={st1}>Sign up</Button>

        <Link to='/'><p id ="signbtn">Already have a account</p></Link> 

    </form>
               
            </div>
            
        </div>
        </>
      )
}

export default Register
