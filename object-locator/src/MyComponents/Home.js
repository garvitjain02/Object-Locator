import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import glyphicon from "../images/search.png";
import axios from "axios";
// import PropTypes from 'prop-types'
import bg from '../images/bg.png';
import bg1 from '../images/bg1.jpg';
import './style.css';
import Typed from "react-typed";
import { Link } from "react-router-dom";
// import Login from './Login';

const Home = props => {
  let st = {
    width: "30%",
    marginBottom: "4%",
  };

  let st1 = {
    width: "45%",
    marginTop: "10%",
    marginLeft: "40%",
    padding: "0",
    fontSize: "150%",
    marginBottom: "10%"
  };

  let reg  = {
    color: 'white',
    textDecoration: 'none',
    marginLeft: "32%"
  }

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/login", {
        username: user,
        password: pass,
      });
      console.log(user);
      console.log(pass);
      console.log(res.data.value);
      console.log(sessionStorage.getItem("token"));
      if (res.data.value) {
        sessionStorage.setItem("token", res.data.id);
        window.location.reload();
      }
      else {
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

            <form className="login" method="post" onSubmit={submit}>
        <p id="wrong">*Incorrect Credentials</p>
        <input
          type="text"
          name="user"
          id="user"
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username/Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
        <br />
        <input
          type="password"
          name="pass"
          id="pass"
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        <br />
        <Button type="submit" className="btn btn-default btn-sm" style={st1}>
          Find <img src={glyphicon} alt="search glyphicon" style={st} />
        </Button>
        <Link to='/signup' style={reg}>New User Register</Link>
        </form>
           
        </div>
        
    </div>
    </>
  )
}

Home.propTypes = {

}

export default Home

