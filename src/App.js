import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(20);
  const [error, setError] = useState(null);
  const [sortingOption, setSortingOption] = useState("");
  const [filterValues, setFilterValues] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v2/all?fields=name,region,area"
        );
        setCountries(response.data);
        setAllCountries(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (sortingOption === "Ascending(A-Z)") {
      const countriesAsc = [...countries].sort((prev, next) =>
        prev.name > next.name ? 1 : -1
      );
      setCountries(countriesAsc);
    } else if (sortingOption === "Descending(Z-A)") {
      const countriesDesc = [...countries].sort((prev, next) =>
        prev.name > next.name ? -1 : 1
      );
      setCountries(countriesDesc);
    }
  }, [sortingOption]);

  useEffect(() => {
    if (
      filterValues.includes("smLithuania") &&
      filterValues.includes("oceania")
    ) {
      const lithuania = allCountries.filter(
        (country) => country.name === "Lithuania"
      );
      const countriesSmLithuania = allCountries.filter(
        (country) => country.area < lithuania[0].area
      );
      const smLithuaniaOceania = countriesSmLithuania.filter(
        (country) => country.region === "Oceania"
      );
      setCountries(smLithuaniaOceania);
    } else if (filterValues.includes("smLithuania")) {
      const lithuania = allCountries.filter(
        (country) => country.name === "Lithuania"
      );
      const countriesSmLithuania = allCountries.filter(
        (country) => country.area < lithuania[0].area
      );
      setCountries(countriesSmLithuania);
    } else if (filterValues.includes("oceania")) {
      const oceania = allCountries.filter(
        (country) => country.region === "Oceania"
      );
      setCountries(oceania);
    } else {
      setCountries(allCountries);
      setSortingOption("Ascending(A-Z)");
    }
  }, [filterValues]);

  const lastPostIndex = currentPage * countriesPerPage;
  const firstPostIndex = lastPostIndex - countriesPerPage;
  const currentCountries = countries.slice(firstPostIndex, lastPostIndex);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div className="app">
      <Filters
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Country Name</th>
              <th>Region</th>
              <th>Area</th>
            </tr>
          </thead>
          <tbody>
            {currentCountries.map((country, index) => {
              return (
                <tr key={index}>
                  <td>{(currentPage - 1) * countriesPerPage + index + 1}</td>
                  <td>{country.name}</td>
                  <td>{country.region}</td>
                  <td>{country.area}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        totalCountries={countries.length}
        countriesPerPage={countriesPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
