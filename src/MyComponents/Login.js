import React from 'react'

const Login = () => {
  return (
    <>
    <form action="" className='login'>
        <input type="text" name="user" id="user" placeholder='Username/Email' />
        <br/>
        <input type="password" name="pass" id="pass" placeholder='Password' />
        <br/>
        <input type="submit" name="submit" id="submit" value="Find" />
    </form>
    </>
  )
}

export default Login
