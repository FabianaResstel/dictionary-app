import { useState, useEffect } from "react";
import axios from "axios";
import WordPicture from "./wordPicture";

import "./App.css";

const apiKey = `0d9d6fa642662e53t328bfec1ado0b77`;

function App() {
  const [word, setWord] = useState("book");
  const [result, setResult] = useState(null);
  const [photos, setPhotos] = useState([]);

  function displayMeaning(response) {
    setResult(response.data);
  }

  function displayPhotos(response) {
    setPhotos(response.data.photos);
  }

  function getMeaning(term) {
    let apiURL = `https://api.shecodes.io/dictionary/v1/define?word=${term}&key=${apiKey}`;
    axios.get(apiURL).then(displayMeaning);
  }

  function getPhotos(term) {
    let apiURL = `https://api.shecodes.io/images/v1/search?query=${term}&key=${apiKey}`;
    axios.get(apiURL).then(displayPhotos);
  }

  function newWord(event) {
    setWord(event.target.value);
  }

  function wordMeaning(event) {
    event.preventDefault();
    getMeaning(word);
    getPhotos(word);
  }

  useEffect(() => {
    getMeaning(word);
    getPhotos(word);
  }, []);

  return (
    <div className="container">
      <h1>Welcome to the Dictionary App</h1>
      <h2>Got a word on your mind?</h2>

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

      <WordPicture photos={photos} />

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
