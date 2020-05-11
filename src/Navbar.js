import React from "react";
import SearchCondition from './SearchCondition.js';

const Navbar = ({ handleConditionSearch, favCount }) => {
  return (
    <div className="navigation-area">
      <nav className="navbar navbar-expand-md col-xs-12 container">
        <div>
          <a className="navbar-brand" href="/">
            <img src={require(`./logo.svg`)} alt="logo" />
            <h4>TrialGate</h4>
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="font-weight-light">MENU</span>
        </button>

        <div className="collapse navbar-collapse " id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-center" href="/">
                Browse All Trials
              </a>
            </li>
            <li className="nav-item text-center">
              <a className="nav-link" href="/favourites">
                My Favourites
                {favCount > 0 && <span> ({favCount})</span>}
              </a>
            </li>
          </ul>
        </div>

        <SearchCondition handleConditionSearch={handleConditionSearch} />
      </nav>
    </div>
  );
  
}




export default Navbar;
