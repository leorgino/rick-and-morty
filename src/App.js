import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Searcher from "./components/Searcher";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";

function App() {
  const [characters, setCharacters] = useState([]);
  const [nameToSearch, setNameToSearch] = useState('');
  const [info, setInfo] = useState({});

  const initialUrl = "https://rickandmortyapi.com/api/character";

  const fetchCharacters = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);

        if (data.info) {
          setInfo(data.info);
        } else {
          setInfo({});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const constructUrl = (baseUrl, name) => {
    const url = new URL(baseUrl);
    if (name) {
      url.searchParams.append("name", name);
    }
    return url.toString();
  };

  const onPrevious = () => {
    if (info.prev) {
      fetchCharacters(info.prev);
    }
  };

  const onNext = () => {
    if (info.next) {
      fetchCharacters(info.next);
    }
  };

  useEffect(() => {
    const url = constructUrl(initialUrl, nameToSearch);
    fetchCharacters(url);
  }, [nameToSearch]);

  useEffect(() => {
    fetchCharacters(initialUrl);
  }, []);

  return (
    <>
      <Navbar brand="Rick and Morty App" />
      <Searcher
        nameToSearch={nameToSearch}
        setNameToSearch={setNameToSearch}
      />
      <div className="container mt-5">
        <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext} />
        <Characters characters={characters} />
        <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext} />
      </div>
    </>
  );
}

export default App;
