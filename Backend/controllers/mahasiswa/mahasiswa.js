import {
  createMahasiswa,
  getAllMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  getMahasiswaByNIM,
} from "../../models/mahasiswa/mahasiswa.js";

// Controller untuk mendapatkan semua mahasiswa
const getAllMahasiswaController = async (req, res) => {
  try {
    const mahasiswa = await getAllMahasiswa();
    res.status(200).json({
      success: true,
      data: mahasiswa,
    });
  } catch (error) {
    console.error("Error saat mengambil semua mahasiswa:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data mahasiswa",
    });
  }
};

const getMahasiswaByNimController = async (req, res) => {
  const { nim } = req.params;

  try {
    const result = await getMahasiswaByNIM(nim);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error saat mengambil mahasiswa berdasarkan NIM:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Gagal mengambil mahasiswa",
    });
  }
};

// Controller untuk membuat mahasiswa baru
const createMahasiswaController = async (req, res) => {
  const { NIM, nama_lengkap, angkatan, tahun_lulus } = req.body;

  try {
    const mahasiswa = { NIM, nama_lengkap, angkatan, tahun_lulus };
    const result = await createMahasiswa(mahasiswa);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error saat membuat mahasiswa:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Gagal menambahkan mahasiswa",
    });
  }
};

// Controller untuk mengupdate data mahasiswa
const updateMahasiswaController = async (req, res) => {
  const { nim } = req.params;
  const updateData = req.body;

  try {
    const result = await updateMahasiswa(nim, updateData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error saat mengupdate mahasiswa:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Gagal mengupdate data mahasiswa",
    });
  }
};

// Controller untuk menghapus mahasiswa berdasarkan NIM
const deleteMahasiswaController = async (req, res) => {
  const { nim } = req.params;

  try {
    const result = await deleteMahasiswa(nim);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error saat menghapus mahasiswa:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Gagal menghapus mahasiswa",
    });
  }
};

export {
  getAllMahasiswaController,
  getMahasiswaByNimController,
  createMahasiswaController,
  updateMahasiswaController,
  deleteMahasiswaController,
};
