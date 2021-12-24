import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar.jsx";
import { useCoinsContextProvider } from "../Providers/CoinsContextProvider.jsx";
import CoinData from "./../Components/CoinData/CoinData.jsx";
import styles from "./App-style/App.module.css";
import FilterSort from "../Components/Filter&Sort/Filter&Sort.jsx";

const App = () => {
  return (
    <>
      <div className={`${styles.mainContainer}`}>
        <Navbar />
        <FilterSort />
        <CoinData />
      </div>
    </>
  );
};

export default App;
