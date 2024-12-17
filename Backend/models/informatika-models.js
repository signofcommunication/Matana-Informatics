import db from "../database/db.js";

const getAllDosen = async () => {
  const [rows] = await db.query("SELECT * FROM dosen");
  return rows;
};

const getAllMahasiswa = async () => {
  const [rows] = await db.query("SELECT * FROM mahasiswa");
  return rows;
};

const getAllProduk = async () => {
  const [rows] = await db.query("SELECT * FROM mahasiswa");
  return rows;
};

const getAllPrestasi = async () => {
  const [rows] = await db.query("SELECT * FROM prestasi");
  return rows;
};

export default { getAllDosen, getAllMahasiswa, getAllPrestasi, getAllProduk };
