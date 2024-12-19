import "./Riset.css";
import { Link } from "react-router-dom";

function Riset() {
  return (
    <div className="container">
      <header></header>

      {/* Main Content */}
      <main className="main">
        <div className="navigation-left">
          <button className="nav-btn back">&larr;</button>
        </div>

        <div className="content">
          <iframe
            src="https://scholar.google.com/citations?user=USER_ID&hl=id"
            title="Google Scholar Profile"
            className="google-scholar"
          ></iframe>
        </div>

        <div className="navigation-right">
          <Link to="/">
            <button className="nav-btn home">🏠</button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer></footer>
    </div>
  );
}

export default Riset;
