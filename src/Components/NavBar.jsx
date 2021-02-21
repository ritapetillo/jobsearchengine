import React,{useEffect} from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect,useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { logUserIn, logUserOut, resetResults } from "../actions";
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
  const dispatch = useDispatch()
  const isLogged = useSelector(state=> state.user.isLogged)
  const user = useSelector(state=> state.user.profile)


  useEffect(() => {
    dispatch(logUserIn())
    console.log(isLogged)
  }, [dispatch])
 
  return (
    <Navbar className="navBar">
      <Link to="/" onClick={resetresults} className="navBar__logo">
        <Navbar.Brand href="#home">
          <AppsIcon /> JoooB
        </Navbar.Brand>
      </Link>
      <Nav className="ml-auto">
       {!isLogged ?  <Nav.Link href="http://localhost:3001/api/users/auth/google">LOGIN</Nav.Link> :<> <Nav.Link className="">Hi {user?.firstName}</Nav.Link> <Nav.Link onClick={()=>dispatch(logUserOut())}>LOGOUT</Nav.Link></>}
      </Nav>
      <Link to="/favorites">
        <FavoriteBorderIcon />
        {favorites?.length}
      </Link>
    </Navbar>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
