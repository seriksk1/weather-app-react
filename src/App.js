import React, { useEffect, useState } from 'react'
import SearchForm from './components/SearchForm.js'
import Weather from './components/Weather.js'
import './App.css'

const App = () => {

    const API_KEY = "ff9d437b8a5c1fdf6bc59832839e29b8";
    const [weather, setWeather] = useState({})

    const getWeather = (e) => {
      let city = e.target.city.value;
      search(city);
      e.preventDefault();
    };

    const search = (city) => {
      if (!city) {
        console.log("Город не найден")
        return 
      } else {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              setWeather({ ...weather, isNotFound: true, isVisible: false });
              throw Error("Wrong city");
            }
          })
          .then((data) => {
            setWeather({
              city: data.name,
              name: data.weather[0].main,
              temperature: Math.round(data.main.temp),
              humidity: data.main.humidity,
              icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              isVisible: true,
              isNotFound: false,
              isFavorite: currentIsFavorite(city),
            });
          })
          .catch((error) => {
            console.log(error)
          });
        }
    }

    const toggleFavorite = () => {
      if (!currentIsFavorite(weather.city)) {
        localStorage.setItem("userCity", weather.city)
      } else {
        localStorage.removeItem("userCity")
      }
      setWeather({ ...weather, isFavorite: !weather.isFavorite })
    }

    const currentIsFavorite = (city) => {
        return localStorage.getItem("userCity") === city
    }

    useEffect(() => {
        if (localStorage.getItem("userCity") !== null){
            search(localStorage.getItem("userCity"))
        }
    }, [])

    return (
      <div className="app-wrapper">
        <h1>Weather App</h1>
        <div className="app">
          <SearchForm getWeather={getWeather} />
          {weather.isVisible ? (
            <Weather
              city={weather.city}
              name={weather.name}
              temperature={weather.temperature}
              humidity={weather.humidity}
              icon={weather.icon}
              isFavorite={weather.isFavorite}
              toggleFavorite={toggleFavorite}
            />
          ) : null}
        </div>
        {weather.isNotFound ? <p className="error">City wasn't found</p> : null}
      </div>
    );
    
}

export default App