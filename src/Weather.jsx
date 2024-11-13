import React, { useEffect } from 'react'
import { useState } from 'react'
import './weather.css'

const Weather = () => {
    let [data,setdata]=useState(null)
    let [City,setCity]=useState("")

   let fetchApi =async()=>{
    // let city ="kolkata"
    let Apikey ='8e4880964545503d0902f221b35b9534'
    let apiUrl  = `https://api.openweathermap.org/data/2.5/weather?q=${City},&appid=${Apikey}&units=metric`
    try{
        let apiData = await fetch(apiUrl)
        // console.log(apiData);
        let finaldata = await apiData.json()
        // console.log(finaldata)
        if(finaldata.cod ===200){
            setdata(finaldata)
            console.log(finaldata);
        }
        else{
            setdata(null)
            alert("city name not found")
        }
    }
    catch(error){
        console.log(error,apiUrl) 
    }
}
let get_input=(e)=>{
    setCity(e.target.value)
}

// useEffect(()=>{
//     fetchApi()
// },[])

   return (
    <div className='container'> 
            <div className='inputt'>
          <div className='head'>
          <input type="text"
        placeholder='Enter the city' 
            onChange={get_input}
            className='padd'
        />
     <button onClick={fetchApi}>Search</button>
          </div>
                <br />
                <br />
            </div>
            {data &&(
            <>
              <div className='content'>        
            <h1>City Name :{data.name}</h1>
            <h1>City Temperature : {data.main.temp}</h1>    
            <h1>Country : {data.sys.country}</h1>

             <h1>Discription:{data.weather[0].description}</h1>   
             </div>
             </>    

    )}

             
     


    </div>
  )
}

export default Weather
