import {
  getAllAcara,
  getAcaraById,
  createAcara,
  updateAcara,
  deleteAcara,
} from "../../models/acara/acara.js";

// Controller untuk mendapatkan semua acara
export const getAllAcaraController = async (req, res) => {
  try {
    const acara = await getAllAcara();
    res.status(200).json({
      success: true,
      data: acara,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk mendapatkan acara berdasarkan ID
export const getAcaraByIdController = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const acara = await getAcaraById(id_agenda);
    res.status(200).json({
      success: true,
      data: acara,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk membuat acara baru
export const createAcaraController = async (req, res) => {
  try {
    const acaraData = req.body; // Data dikirim melalui request body
    const result = await createAcara(acaraData);
    res.status(201).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk memperbarui acara berdasarkan ID
export const updateAcaraController = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const updateData = req.body; // Data untuk update dikirim melalui request body
    const result = await updateAcara(id_agenda, updateData);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk menghapus acara berdasarkan ID
export const deleteAcaraController = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const result = await deleteAcara(id_agenda);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
