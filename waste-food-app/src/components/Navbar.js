import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
// import { app } from 'firebase';

export default function Navbar() {
  function logout(e) {
    console.log('ok');
    localStorage.clear();

  }
  return (
    <React.Fragment>
      <NavStyler>
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container">
            <div className="w-60">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link to="/" className="navbar-brand navbar-text-custom" href="#">Anti-WasteFoodApp</Link>
              </div>
            </div>
            <div className="w-40">
              <Link to='/addItem'>
                <button className="btn  my-2 my-sm-0 navbar-btn-custom">Add Food</button>
              </Link>
              <Link to="/addPerson">
                <button className="btn  my-2 my-sm-0 navbar-btn-custom">Add Friends</button>
              </Link>
              <Link to="/">
                <button className="btn  my-2 my-sm-0 navbar-btn-custom">Foods list</button>
              </Link>
              <Link to="/login">
                <button className="btn  my-2 my-sm-0 navbar-btn-custom" onClick={logout}>Logout</button>
              </Link>
            </div>
          </div>
        </nav>
      </NavStyler>
    </React.Fragment>
  )
}
const NavStyler = styled.div`
.navbar-custom{
    background:var(--lightGreen) !important;
    
}
.navbar-text-custom{
    color:var(--darkGray) !important;
    text-transform:uppercase;
    letter-spacing:1px;
}
.navbar-btn-custom{
    background:var(--myPurple);
    color:var(--darkGray);
    margin:0px 5px;
  }
.navbar-btn-custom:hover{
    background:var(--myLightPurple);
    color:var(--lightGray);
  }
`
