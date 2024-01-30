import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import glyphicon from "../images/search.png";
import axios from "axios";

const Login = () => {
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
  };

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
        sessionStorage.setItem("token", true);
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
      </form>
    </>
  );
};

export default Login;
