import React from "react";
import "./../assets/style/filters.css";

const Filters = ({
  sortingOption,
  setSortingOption,
  filterValues,
  setFilterValues,
}) => {
  const onSortingOptionChange = (e) => {
    e.preventDefault();
    setSortingOption(e.target.value);
  };

  const handlerCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFilterValues([...filterValues, value]);
    } else {
      setFilterValues(filterValues.filter((val) => val !== value));
    }
  };

  console.log(filterValues);

  return (
    <div className="filters">
      <h4>Sort</h4>
      <div className="sorting-btns">
        <button
          className={sortingOption === "Ascending(A-Z)" && "active-sorting-btn"}
          onClick={onSortingOptionChange}
          value="Ascending(A-Z)"
        >
          Ascending (A-Z)
        </button>
        <button
          className={
            sortingOption === "Descending(Z-A)" && "active-sorting-btn"
          }
          onClick={onSortingOptionChange}
          value="Descending(Z-A)"
        >
          Descending (Z-A)
        </button>
      </div>
      <h4>Filters</h4>
      <div className="filter-btns">
        <div>
          <input
            type="checkbox"
            name="smLithuania"
            id="smLithuania"
            value="smLithuania"
            checked={filterValues.includes("smLithuania")}
            onChange={handlerCheckboxChange}
          />
          <label htmlFor="smLithuania">Smaller than Lithuania by area</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="oceania"
            id="oceania"
            value="oceania"
            checked={filterValues.includes("oceania")}
            onChange={handlerCheckboxChange}
          />
          <label htmlFor="oceania">Oceania</label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
