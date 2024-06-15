import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="country-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.cca3} className="countryCard">
              <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
              <p>{country.name.common}</p>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default App;
