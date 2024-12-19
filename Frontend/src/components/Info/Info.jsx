import { Link } from "react-router-dom";
import "./Info.css";

function Info() {
  const links = [
    { path: "/", label: "HOME" },
    { path: "/mahasiswa", label: "MAHASISWA" },
    { path: "/dosen", label: "DOSEN" },
    { path: "/agenda", label: "AGENDA" },
    { path: "/prestasi", label: "PRESTASI" },
    { path: "/produk", label: "PRODUK" },
    { path: "/kerjasama", label: "KERJA SAMA" },
    { path: "/hmj", label: "HMJ" },
  ];

  return (
    <main className="main">
      <div className="grid-container">
        {links.map((link, index) => (
          <Link to={link.path} key={index} className="card">
            <div className="card-content">
              <h3>{link.label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Info;
