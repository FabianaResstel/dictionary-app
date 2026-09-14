import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [word, setWord] = useState("book");
  const [result, setResult] = useState(null);

  function displayMeaning(response) {
    setResult(response.data);
  }

  function getMeaning(term) {
    let apiKey = `0d9d6fa642662e53t328bfec1ado0b77`;
    let apiURL = `https://api.shecodes.io/dictionary/v1/define?word=${term}&key=${apiKey}`;
    axios.get(apiURL).then(displayMeaning);
  }

  function newWord(event) {
    setWord(event.target.value);
  }

  function wordMeaning(event) {
    event.preventDefault();
    getMeaning(word);
  }

  useEffect(() => {
    getMeaning(word);
  }, []);

  return (
    <div className="container">
      <h1>Welcome to the Dictionary App</h1>
      <h2>What word are you curious about?</h2>

      <form onSubmit={wordMeaning}>
        <input onChange={newWord} type="text" placeholder="Enter a word..." />
        <button type="submit">Search</button>
      </form>

      {result && (
        <div className="result">
          <h3>{result.word}</h3>
          <p className="phonetic">{result.phonetic}</p>

          <p className="meaning">
            <strong>{result.meanings[0].partOfSpeech}:</strong>{" "}
            {result.meanings[0].definition}
          </p>

          {result.meanings[0].synonyms && (
            <p className="synonyms">
              <strong>Synonyms:</strong>{" "}
              {result.meanings[0].synonyms.join(", ")}
            </p>
          )}
        </div>
      )}
      <footer>
        <p>
          Coded by{" "}
          <a
            href="https://github.com/FabianaResstel/dictionary-app"
            target="_blank"
            rel="noreferrer"
          >
            Fabiana Resstel
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
