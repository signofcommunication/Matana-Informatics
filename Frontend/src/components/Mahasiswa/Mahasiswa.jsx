import React from "react";
import { Link } from "react-router-dom";
import "./Mahasiswa.css";

function Mahasiswa() {
  const tahunList = [
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ];

  return (
    <div className="apaaja">
      <header className="text">
        <h2>Data Mahasiswa 2014 - 2024</h2>
      </header>
      <main className="main">
        <div className="grid-container">
          <Link to="/">
            <button>BACK</button>
          </Link>
          {tahunList.map(tahun => (
            <Link to={`/mahasiswa/${tahun}`} key={tahun}>
              <button>{tahun}</button>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Mahasiswa;
