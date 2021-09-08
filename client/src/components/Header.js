import React from 'react';
import Cookies from 'js-cookie'

function Header(props) {
    return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top .bg-gradient" style={{backgroundColor:"#020202"}}>
    <div className="container-fluid"> 
        <a href="/" className="d-inline-flex align-items-center text-dark"  style={{'textDecoration': 'none'}}>
            <img src="/Images/logo.png" className="m-2" height="80" alt="logo"/>
            <h3 className="pt-3 text-white d-inline" style={{overflow: "auto",whiteSpace: "nowrap",}}>Open Source Sunday</h3>
        </a>

              
        <ul className="nav justify-content-end m-3">
            <li className="nav-item">
                <a className="nav-link text-white" href="/challenges">Challenges</a>
            </li>
            <li className="nav-item">
                {Cookies.get('token') === undefined?
                <a className="nav-link text-white" href="https://discord.com/api/oauth2/authorize?client_id=884129859373269073&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fredirect&response_type=code&scope=identify%20email">Login</a>
                : <a className="nav-link text-white" href="/userpage">Account</a>
                }
            </li>
        </ul>
    </div>
    </nav>
)}

export default Header