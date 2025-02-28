import React, { useState,useRef } from "react";
import "../App.css";

export default function JokeGen() {
  const [joke, setJoke] = useState("");
  const [category, setCategory] = useState("Programming"); // Initial category
  const jokeDivRef = useRef(null)


  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const fetchApi = () => {
    fetch(`https://v2.jokeapi.dev/joke/${category}?type=single`)
      .then((res) => res.json())
      .then((data) => setJoke(data.joke));


      if (jokeDivRef.current) {
        jokeDivRef.current.style.border = "2px solid black"; 
        jokeDivRef.current.style.padding = "5px"; 
      }

  };

  return (
    <div id="container">
      <h1 className="text-center">Joke Generating WebApp</h1>

      <div className="radios d-flex align-items-center flex-column mt-5">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="jokeCategory"
            id="flexRadioDefault1"
            value="Programming" 
            checked={category === "Programming"}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Programming
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="jokeCategory" 
            id="flexRadioDefault2"
            value="Misc" 
            checked={category === "Misc"}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Misc
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="jokeCategory" 
            id="flexRadioDefault3"
            value="Dark" 
            checked={category === "Dark"}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault3">
            Dark
          </label>
        </div>
        
      </div>

      <div className="button mt-4 text-center">
        <button type="button" className="btn btn-dark" onClick={fetchApi}>
          Generate Joke
        </button>
      </div>

      <div className="joke text-center mt-5" ref={jokeDivRef}>
        <p>{joke}</p>
      </div>
    </div>
  );
}