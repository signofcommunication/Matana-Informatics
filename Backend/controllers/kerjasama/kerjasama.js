import db from "../../database/db.js";
import {
  getAllKerjasama,
  getKerjasamaById,
  createKerjasama,
  deleteKerjasama,
  getKerjasamaById,
} from "../../models/kerjasama/kerjasama.js";

// Mendapatkan semua data dari tabel kerjasama
export const getAllKerjasamaController = async (req, res) => {
  try {
    const kerjasama = await getAllKerjasama();
    res.status(200).json({
      success: true,
      data: kerjasama,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mendapatkan data kerjasama berdasarkan ID
export const getKerjasamaByIdController = async (req, res) => {
  try {
    const { id_perusahaan } = req.params;
    const kerjasama = await getKerjasamaById(id_perusahaan);
    res.status(200).json({
      success: true,
      data: kerjasama,
    });
  } catch (error) {
    res.status(error.message.includes("tidak ditemukan") ? 404 : 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Menambahkan data baru ke tabel kerjasama
export const createKerjasamaController = async (req, res) => {
  try {
    const newKerjasama = await createKerjasama(req.body);
    res.status(201).json({
      success: true,
      message: "Data berhasil ditambahkan",
      data: newKerjasama,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Memperbarui data kerjasama berdasarkan ID
export const updateKerjasamaController = async (req, res) => {
  try {
    const { id_perusahaan } = req.params;
    await updateKerjasama(id_perusahaan, req.body);
    res.status(200).json({
      success: true,
      message: "Data berhasil diperbarui",
    });
  } catch (error) {
    res.status(error.message.includes("tidak ditemukan") ? 404 : 400).json({
      success: false,
      message: error.message,
    });
  }
};

// Menghapus data kerjasama berdasarkan ID
export const deleteKerjasamaController = async (req, res) => {
  try {
    const { id_perusahaan } = req.params;
    await deleteKerjasama(id_perusahaan);
    res.status(200).json({
      success: true,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    res.status(error.message.includes("tidak ditemukan") ? 404 : 500).json({
      success: false,
      message: error.message,
    });
  }
};
