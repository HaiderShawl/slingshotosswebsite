import React from 'react';

const Footer = () => {
    return (
        <div className="page-footer text-white">
        <div className="container p-5">
            <div className="row">
                
            </div>
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 p-5">
                <img src="/Images/logo.png" alt="" height="120" />
                <h3>Open Source Sunday</h3>

                <p className="pt-3">
                Level up your coding game by participating in our weekly open source challenges.
				</p>
                </div>
                <div className="col-xs- col-sm-6 col-md-6 p-5">
                <h5 className=" pt-3">Navigate</h5>

                <ul className="navbar-nav ml-auto">
                         <li><a className="nav-item nav-link text-white" href="/">Home</a></li>
                         <li><a className="nav-item nav-link text-white" href="/challenges">Challenges</a></li>                        
                     </ul>
                </div>
            </div>
    
            <div className="footer-copyright text-center pt-5">
                © 2021 Copyright: Slingshot OSS <br />
                Developed by <a href="https://www.linkedin.com/in/haidershawl/" className="text-white" target="_blank" rel="noreferrer">Haider Shawl</a>
            </div>
        </div>
    </div>
    )
}

export default Footer