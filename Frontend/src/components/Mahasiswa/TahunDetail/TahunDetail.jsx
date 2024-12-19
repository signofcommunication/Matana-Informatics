import { useParams, Link } from "react-router-dom";

function TahunDetail() {
  const { tahun } = useParams();

  return (
    <div className="tahun-detail">
      <header>
        <h2>Detail Data Mahasiswa Tahun {tahun}</h2>
      </header>
      <main>
        <p>Menampilkan data mahasiswa untuk tahun {tahun}.</p>
        <Link to="/mahasiswa">
          <button>BACK TO MAHASISWA</button>
        </Link>
      </main>
    </div>
  );
}

export default TahunDetail;
