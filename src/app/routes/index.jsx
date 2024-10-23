'use client'

import Image from "next/image";
/* icons for weather condition */
import Rain from "../images/rain.png"
import Sunny from "../images/sunny.png"
import Cloudy from "../images/cloud.png"
import Foggy from "../images/fog.png"

import { useState } from "react";
import "animate.css"

import Footer from "../components/footer";

export default function Index() {

  /* API Keys */
  const apis = {

    /* Openweather API key */
    weatherKey: "36f1ce1a3346eec15332db285205290f",
    weatherURL: "https://api.openweathermap.org/data/2.5",

    /* Geolocation API key */
    geoKey: "a3a5df4fabfb4cc4a15cda2ab1ddf2c8",
    geolocationURL: "https://ipgeolocation.abstractapi.com/v1/?api_key="

  }

  /* save data input */
  const [search, setSearch] = useState("");

  /* saved fetched data for weather */
  const [weather, setWeather] = useState("");

  /* saved fetched data for geolocation */
  const [geolocation, setGeolocation] = useState("");

  /* click to search for weather location */
  const searchPressed = () => {

    console.log(search)

    fetch(`${apis.weatherURL}/weather?q=${search}&units=metric&appid=${apis.weatherKey}`).then(response => response.json()).then(responseData => {
      setWeather(responseData);
      console.log(responseData);
    })

    fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apis.geoKey}`).then(res => res.json()).then(resData => {
      setGeolocation(resData);
    })

  }

  return (
    <>
        <div className="App bg-dark">

          <h1 className="text-5xl text-center text-white font-bold">
            Zed Weather App
          </h1>

          <div className="search-form">

            <input type="text" className="w-full rounded-md border-0 py-2 pl-4 pr-25 text-white ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6" placeholder="Enter City or Town" onChange={(e) => setSearch(e.target.value)}/>

            <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-white" type="button" onClick={searchPressed}>Search</button>

          </div>
          
          <div className="display">

            <div className="location-name text-center my-5">
              <span className="my-0 mx-auto text-4xl animate__animated animate__fadeInRight">{weather.name}</span>
            </div>

            {typeof weather.main !== "undefined" && geolocation.timezone ? (
              <div className="display-data flex gap-10 justify-center flex-wrap text-center">
                <div className="animate__animated animate__fadeInUp">
                  <span>
                    <p>Current-Time: {geolocation.timezone.current_time}</p>
                    <p>{geolocation.longitude}</p>
                    <p>{geolocation.latitude}</p>
                  </span>
                </div>
                <div className="temp-div">
                  <h4>temp</h4>
                    <section className="temp-icon">
                      <section className="text-center icon">
                        {
                        weather.weather[0].main == "Rain" ? ( <Image src={Rain} width={50} height={50} alt="rain" />
                        ) : weather.weather[0].main == "Clouds" ? ( <Image src={Cloudy} width={50} height={50} alt="cloud"/> ) : weather.weather[0].main == "Clear" ? ( <Image src={Sunny} width={50} height={50} alt="cloud"/> ) : ( "" )
                        }
                        <span>{weather.weather[0].main}</span>
                      </section>
                      <h2 className="text-2xl temp">{weather.main.temp} <sup>o</sup>C</h2>                  
                    </section>
                  <p>( Feels Like {weather.main.feels_like}  <sup>o</sup>C )</p>
                </div>
                <div>
                  <h4>humidity</h4>
                  <p className="text-3xl">{weather.main.humidity}%</p>
                  <p>( {weather.weather[0].description} )</p>
                </div>
                <div>
                  <h4>wind speed</h4>
                  <p>{weather.wind.speed} M/S</p>
                  <p>{weather.wind.deg}<sup>o</sup></p>
                </div>
              </div>
            ) : weather.massage == weather.massage ? ( 
            <div className="location-name text-center my-5">
              <span className="my-0 mx-auto text-4xl animate__animated animate__fadeInRight">City Not Found</span>
            </div> ) : search == "" ? (console.log("da")) : ( "" )
            }

          </div>
          <Footer />
        </div>
    </>
  );
}


{/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
</div> */}