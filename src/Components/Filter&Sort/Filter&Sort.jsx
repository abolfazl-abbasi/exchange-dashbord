import _ from "lodash";
import React, { useRef, createRef, useState } from "react";
import { useCoinsContextProvider } from "../../Providers/CoinsContextProvider";
import styles from "./Filter&Sort-style/Filter&Sort.module.css";
// import Select from "react-select";

const FilterSort = () => {
  const {
    coinsData,
    marketCapChangesState,
    selectCurrency,
    selectCurrencyValue,
    handlePrice,
    handleChangePrice,
    marketCapChanges,
    modifyNumbers,
    handleSelectCurrency,
    setCoinsData,
    coinsDataShow,
    setCoinsDataShow,
    searchValue,
    setSearchValue,
    handleSearchValue,
    handleSort,
  } = useCoinsContextProvider();

  return (
    <>
      <section className={`${styles.filterSort}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.sort}`}>
            <span onClick={(e) => handleSort(e, "allToken")} className={`${styles.sortItems} ${styles.active}`}>
              All Tokens
            </span>
            <span onClick={(e) => handleSort(e, "highestPrice")} className={`${styles.sortItems}`}>
              Highest price
            </span>
            <span onClick={(e) => handleSort(e, "lowestPrice")} className={`${styles.sortItems}`}>
              lowest price
            </span>
            <span onClick={(e) => handleSort(e, "changeAsc")} className={`${styles.sortItems}`}>
              Gainers
            </span>
            <span onClick={(e) => handleSort(e, "changeDesc")} className={`${styles.sortItems}`}>
              Losers
            </span>
          </div>
          <div className={`${styles.filter}`}>
            <span className={`${styles.filterItems}`}>
              <i className="bi bi-funnel"></i> Filters
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterSort;
