import React from "react";
import favImage from '../black-heart.svg'
import notFavImage from '../black-heart-not-filled.svg'

const Weather = (props) => {
    return (
      <div className="city">
        <div className="city-name">
          <h2>{props.city}</h2>
          <img
            className={props.isFavorite ? "display" : "not-display"}
            onClick={props.toggleFavorite}
            src={favImage}
            alt=""
            title="Избранное"
          />

          <img
            className={props.isFavorite ? "not-display" : "display"}
            onClick={props.toggleFavorite}
            src={notFavImage}
            alt=""
            title="Избранное"
          />
        </div>

        <div className="city-weather">
          <div className="city-weather-descr">
            <div className="city-temperature">
              <span>{props.temperature}</span>°C
            </div>
            <div className="city-weather-state">{props.name}</div>
            <div className="city-humidity">
              Humidity: <span>{props.humidity}</span>%
            </div>
          </div>
          <img className="weather-icon" src={props.icon} alt={props.name} />
        </div>
      </div>
    );
};

export default Weather;