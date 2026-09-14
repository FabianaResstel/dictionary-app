import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [word, setWord] = useState("");

  function displayMeaning(response) {
    console.log(response.data);
  }

  function newWord(event) {
    setWord(event.target.value);
  }

  function wordMeaning(event) {
    event.preventDefault();
    let apiKey = `0d9d6fa642662e53t328bfec1ado0b77`;
    let apiURL = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
    axios.get(apiURL).then(displayMeaning);
  }

  return (
    <div className="container">
      <h1>Welcome to the Dictionary App</h1>
      <h2> What word are you curious about?</h2>

      <form onSubmit={wordMeaning}>
        <input onChange={newWord} type="text" placeholder="Enter a word..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
