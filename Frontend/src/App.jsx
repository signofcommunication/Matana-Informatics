import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dosen, Info, Mahasiswa, Riset, TahunDetail } from "./components";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/riset" element={<Riset />} />
        <Route path="/dosen" element={<Dosen />} />
        <Route path="/mahasiswa" element={<Mahasiswa />} />
        <Route path="/mahasiswa/:tahun" element={<TahunDetail />} />
        <Route path="/produk" element={<h1>Produk</h1>} />
        <Route path="/prestasi" element={<h1>Prestasi</h1>} />
        <Route path="/agenda" element={<h1>Agenda</h1>} />
        <Route path="/hmj" element={<h1>HMJ</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
