import React from "react";

const Searcher = ({ nameToSearch, setNameToSearch }) => {
  return (
    <div className="container">
      <br />
      <label for="search"> Buscar</label>
      <input
        type="text"
        name="search"
        autoFocus
        value={nameToSearch}
        onChange={(event) => setNameToSearch(event.target.value)}
      />
    </div>
  );
};

export default Searcher;