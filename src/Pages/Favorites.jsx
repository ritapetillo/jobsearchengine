import React from "react";
import { connect } from "react-redux";
import Listing from "../Components/Listing";
import { addToFavorite, removeFromFavorite } from "../actions";

const mapStateToProps = (state) => {
  return state;
};

const Favorites = ({ favorites, addFavorite, removeFavorite }) => {
  return (
    <div>
      <h2>Favorites</h2>

      {favorites?.map((res) => (
        <Listing
          listing={res}
          key={res.id}
          company={res.company}
          logo={res.company_logo}
          url={res.company_url}
          location={res.location}
          title={res.title}
          contract={res.type}
          id={res.id}
        />
      ))}
    </div>
  );
};

export default connect(mapStateToProps, null)(Favorites);
