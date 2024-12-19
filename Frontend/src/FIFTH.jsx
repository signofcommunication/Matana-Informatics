import { Link } from "react-router-dom";
import "./FIFTH.css";

function App() {
  return (
    <div className="container">
      <main className="main">
        <div className="content">
          <div className="info-card">
            <p>NAMA LENGKAP</p>
            <p>NIM</p>
            <p>TAHUN LULUS</p>
          </div>
          <div className="info-card">
            <p>NAMA LENGKAP</p>
            <p>NIM</p>
            <p>TAHUN LULUS</p>
          </div>
          <div className="info-card">
            <p>NAMA LENGKAP</p>
            <p>NIM</p>
            <p>TAHUN LULUS</p>
          </div>
        </div>

        <div className="navigation">
          <Link to="/info">
            <button className="home">🔙</button>
          </Link>
          <button className="up">⬆️</button>
          <button className="down">⬇️</button>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
