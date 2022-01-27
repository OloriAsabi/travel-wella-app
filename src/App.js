import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./apiCalls";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";


function App() {
  const [places, setPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [childClicked, setChildClicked] = useState([])

  const [coords, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState("restaurants")
  const [rating, setRating] = useState("")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
      
    })
  }, [])

  console.log(coords)


  useEffect(() => {
   const filtered = places?.filter((place) => Number(place.rating) > rating)
   setFilteredPlaces(filtered);
  }, [rating, places])

  useEffect(() => {
    if (bounds) {
    setIsLoading(true)

    getWeatherData(coords.lat, coords.lng)
    .then((data) => {
      setWeatherData(data)
    })

    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        console.log({data})
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([])
        setRating('');
        setIsLoading(false)
      });
    }
  },[bounds, type])

  console.log(places)
  return (
    <>
    <CssBaseline/>
      <Header/>
      <Grid container spacing={3} style={{ width:"100%" }}>
        <Grid item xs={12} md={6}>
          <List 
          isLoading={isLoading}
          childClicked={childClicked}
          places={filteredPlaces?.length ? filteredPlaces : places}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={6}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map 
          setChildClicked={setChildClicked}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coords={coords}
          places={filteredPlaces?.length ? filteredPlaces : places}
          weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
