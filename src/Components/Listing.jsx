import React, { useState, useMemo, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { addToFavorite, removeFromFavorite } from "../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (favorite) => dispatch(addToFavorite(favorite)),
    removeFavorite: (favorite) => dispatch(removeFromFavorite(favorite)),
  };
};
const mapStateToProps = (state) => {
  return state;
};

const Listing = ({
  listing,
  id,
  company,
  logo,
  url,
  location,
  title,
  contract,
  favorites,
  addFavorite,
  removeFavorite,
}) => {
  const [isFavorite, setFavorite] = useState(false);
  const handleFavorites = async () => {
    setFavorite(!isFavorite);
    if (isFavorite) {
      removeFavorite(listing);
      console.log(favorites);
    } else {
      addFavorite(listing);
      console.log(favorites);
    }
  };

  useEffect(() => {
    //on loading of component, check if the given posting is between favorites
    const isFav = favorites.some((fav) => fav.id == id);
    setFavorite(isFav);
  }, []);

  const favorite = useMemo(
    () =>
      isFavorite ? (
        <FavoriteIcon onClick={handleFavorites} />
      ) : (
        <FavoriteBorderIcon onClick={handleFavorites} />
      ),
    [isFavorite]
  );
  return (
    <Row className="mt-4 ml-3">
      <Col sm={12} md={1}>
        <img src={logo} alt="" className="img-fluid" />
      </Col>
      <Col sm={12} md={11}>
        <div className="d-flex justify-content-between">
          <Link to={`/jobs/${id}`}>
            {" "}
            <h4>{company}</h4>
          </Link>
          {favorite}
        </div>
        <span>
          <LocationOnIcon />
          {location}
        </span>
        <div className="mt-3">
          <h6>Position: {title}</h6>
          <h6>Type: {contract}</h6>
        </div>
        <div>
          <small>
            <a href={url}>Company Website</a>
          </small>
        </div>
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
