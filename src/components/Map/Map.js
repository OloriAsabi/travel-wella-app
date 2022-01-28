import React from 'react';
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";


import makeStyles from '../../makeStyles';
import useStyles from "./style";

const Map = ({ setCoordinates, setBounds, coords, places, setChildClicked, weatherData }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)')


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCmWDkfXbVlHFYnrhiyMXFoWscQHE9GU7w" }}
            center={coords}
            defaultCenter={coords}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            options={{disableDefaultUI: true, zoomControl: true, styles: makeStyles }}
            onChange={(e) => {
                setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
            }}
            onChildClick={(child) => setChildClicked(child)}
            >
                {places?.length && places?.map((place, i) => (
                    <div className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                    >
                        {!isDesktop ? 
                                <LocationOnOutlined color="primary" fontSize="large"/>
                             : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.small.url : 'https://raw.githubusercontent.com/OloriAsabi/book-images/main/src/PROGRAM/download-2.jpg'}
                                    alt={place.name}  
                                    />
                                     <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.length && weatherData?.list?.map((data, i) => (
                <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                    <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather" height="70px" />
                </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map