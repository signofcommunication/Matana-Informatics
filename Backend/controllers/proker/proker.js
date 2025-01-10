import {
  getAllProker,
  getProkerById,
  createProker,
  updateProker,
  deleteProker,
} from "../../models/proker/proker.js";

// Controller untuk mendapatkan semua proker
export const getAllProkerController = async (req, res) => {
  try {
    const proker = await getAllProker();
    res.status(200).json({
      success: true,
      data: proker,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk mendapatkan proker berdasarkan ID
export const getProkerByIdController = async (req, res) => {
  try {
    const { id_proker } = req.params;
    const proker = await getProkerById(id_proker);
    res.status(200).json({
      success: true,
      data: proker,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk membuat proker baru
export const createProkerController = async (req, res) => {
  try {
    const prokerData = req.body; // Data dikirim melalui request body
    const result = await createProker(prokerData);
    res.status(201).json({
      success: true,
      message: "Proker berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk memperbarui proker berdasarkan ID
export const updateProkerController = async (req, res) => {
  try {
    const { id_proker } = req.params;
    const updateData = req.body; // Data untuk update dikirim melalui request body
    const result = await updateProker(id_proker, updateData);
    res.status(200).json({
      success: true,
      message: "Proker berhasil diperbarui",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk menghapus proker berdasarkan ID
export const deleteProkerController = async (req, res) => {
  try {
    const { id_proker } = req.params;
    const result = await deleteProker(id_proker);
    res.status(200).json({
      success: true,
      message: "Proker berhasil dihapus",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
