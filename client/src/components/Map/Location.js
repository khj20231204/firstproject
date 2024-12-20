import React from "react";
import PropTypes from "prop-types";

const Location = ({ location, error }) => {
  return (
    <div>
      현재 나의 위치 
      {location ? (
        <code>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </code>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p className="errorMessage">Location Error: {error}</p>}
    </div>
  );
};

Location.propTypes = {
  location: PropTypes.object,
  error: PropTypes.string,
}; 

export default Location;
