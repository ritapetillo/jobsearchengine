import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { resetResults } from "../actions";
import AppsIcon from "@material-ui/icons/Apps";
import "../Styles/Navbar.scss";

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetresults: () => dispatch(resetResults()),
  };
};
const NavBar = ({ favorites, resetresults }) => {
  console.log(favorites.length);
  return (
    <Navbar className="navBar">
      <Link to="/" onClick={resetresults} className="navBar__logo">
        <Navbar.Brand href="#home">
          <AppsIcon /> JoooB
        </Navbar.Brand>
      </Link>
      <Nav className="ml-auto">
        {/* <Nav.Link href="#home">Home</Nav.Link> */}
      </Nav>
      <Link to="/favorites">
        <FavoriteBorderIcon />
        {favorites?.length}
      </Link>
    </Navbar>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
