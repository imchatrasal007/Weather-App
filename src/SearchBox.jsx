import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Searchbox.css";
import { useState } from 'react';

export default function SearchBox( {updateInfo}){
    let [city,setcity]=useState("");
    let [error,seterror]=useState(false);
   const API_KEY="a094aaa46326c934d58dab25a4aeeb88";
   const API_URL="https://api.openweathermap.org/data/2.5/weather";
   
   let getWeatherInfo= async ()=>{
    try{
    let response=await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    let jsonResponse=await response.json();
    console.log(jsonResponse);
    let result={
        city:city,
        temp:jsonResponse.main.temp,
        tempMin:jsonResponse.main.temp_min,
        tempMax:jsonResponse.main.temp_max,
        humidity:jsonResponse.main.humidity,
        feelsLike:jsonResponse.main.feels_like,
        weather:jsonResponse.weather[0].description,
    };
    console.log(result);
    return result;
    }catch(err){
        throw err;
    }
   };

    let handleChange=(event)=>{
     setcity(event.target.value);
    };

    let handleSubmit= async (event)=>{
    try{
     event.preventDefault();
     console.log(city);
     setcity("");
     let newInfo=await getWeatherInfo();
     updateInfo(newInfo);
     }catch(err){
        seterror(true);
     }
    };
     return (
        <>
        <h2>Welcome To Weather App!</h2>
        <div className="SearchBox">
        <form onSubmit={handleSubmit}>
        <TextField 
        id="city" 
        label="City Name" 
        variant="outlined" 
        required
        value={city}
        onChange={handleChange}
        />
        <br></br><br></br>
        <Button variant="contained" type="Submit" >Search</Button>
        {error && <p>No Such Place Exists!</p>}
        </form>
        </div>
    </>
 );
};