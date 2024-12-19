import React from 'react';
import { Link } from 'react-router-dom';
import './FK.css'; // Tambahkan gaya CSS jika diperlukan

function FK() {
  return (
    <div className="fk-container">
      <h1 className='halaman'>Halaman FT Mahasiswa</h1>
      <p className='selamat'>Selamat datang di halaman FT Mahasiswa!</p>
      <Link to="/">
        <button>Kembali ke Halaman Utama</button>
      </Link>
    </div>
  );
}

export default FK;
