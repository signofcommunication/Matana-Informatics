import {
  getAllPrestasi,
  createPrestasi,
  updatePrestasi,
  deletePrestasi,
  getPrestasiById,
} from "../../models/prestasi/prestasi.js";

// Controller untuk mendapatkan semua prestasi
export const handleGetAllPrestasi = async (req, res) => {
  try {
    const result = await getAllPrestasi();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk menambahkan prestasi baru
export const handleCreatePrestasi = async (req, res) => {
  try {
    const prestasi = req.body;
    const result = await createPrestasi(prestasi);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk memperbarui prestasi berdasarkan ID
export const handleUpdatePrestasi = async (req, res) => {
  try {
    const { id } = req.params; // ID dari parameter URL
    const updateData = req.body; // Data yang akan diperbarui
    const result = await updatePrestasi(id, updateData);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk menghapus prestasi berdasarkan ID
export const handleDeletePrestasi = async (req, res) => {
  try {
    const { id } = req.params; // ID dari parameter URL
    const result = await deletePrestasi(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk mendapatkan prestasi berdasarkan ID
export const handleGetPrestasiById = async (req, res) => {
  try {
    const { id } = req.params; // ID dari parameter URL
    const result = await getPrestasiById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
