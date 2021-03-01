import React from "react";
import "../Styles/SearchPage.scss";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useState } from "react";
import { fetchJobResults } from "../Utils/fetches";
import Listing from "../Components/Listing";
import useGeoLocation from "react-ipgeolocation";
import { useEffect } from "react";
import useGeoIp from "usegeoip";
import { connect } from "react-redux";
import { searchJobs, noResults } from "../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    search: (position, location) => dispatch(searchJobs(position, location)),
  };
};
const mapStateToProps = (state) => {
  return state;
};

const SearchPage = ({ current, search, error_msg }) => {
  const [postion, setPostion] = useState("");
  const [location, setLocation] = useState("");
  //   const [country, setCountry] = useState("");
  const { city, countryCode } = useGeoIp();

  useEffect(() => {
    setLocation(city);
    console.log(current);
    console.log("ciao");
    // setCountry(country);
    // console.log(country);
  }, []);

  const handleSearch = async () => {
    try {
      const res = await search(postion, location);

      setLocation("");
      setPostion("");
    } catch (err) {
      console.log(err);
    }
  };
  const { jobs } = current;
  return (
    <div
      className={`searchPage ${current.jobs.length == 0 ? "no-results" : ""}`}
    >
      <div className="searchPage__box">
        <h1>
          Find job in {city && city}, {countryCode && countryCode}
        </h1>
        <div className="searchPage__inputs">
          <div>
            <SearchIcon />
            <input
              type="text"
              placeholder="Job title"
              name="position"
              onChange={(e) => setPostion(e.target.value)}
            />
          </div>
          <div>
            <LocationOnIcon />
            <input
              type="text"
              placeholder="City,state or ZIP"
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              value={location && location}
            />
          </div>

          <span className="searchPage__cta-btn" onClick={handleSearch}>
            {current.jobs.length == 0 ? "Search Jobs " : "New Research"}
          </span>
        </div>
      </div>
      <div>
        <b>
          {current.jobs.length !== 0 &&
            `Results for ${current.position} jobs in ${current.location}`}
          {error_msg && error_msg}
        </b>
      </div>
      {jobs.length > 0 &&
        jobs.map((res) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
