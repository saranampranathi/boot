import React, { useContext, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png' // we need to get logo image yet
import carrt from '../Assets/carrt.jpg'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const [Menu,setMenu]=useState("shop")
    //const api
    const {totalcart}=useContext(ShopContext);
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>LuxLane</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:"none" }} to='/'>Shop</Link>{Menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: "none" }} to='/mens'>Men</Link>{Menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: "none "}} to='/womens'>Women</Link>{Menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: "none" }} to='/kids'>Kids</Link>{Menu==="kids"?<hr/>:<></>}</li>

        </ul>
<div className="nav-login-cart">
  {localStorage.getItem('auth-token') ? (
    <button onClick={() => {
      localStorage.removeItem('auth-token');
      window.location.replace("/");
    }}>
      Logout
    </button>
  ) : (
    <Link to='/login'>
      <button>Login</button>
    </Link>
  )}

  <Link to='/cart'>
    <img src={carrt} alt="" />
  </Link>

  <div className="nav-cart-count">
    {totalcart()}
  </div>
</div>



    </div>
  )
}

export default Navbar