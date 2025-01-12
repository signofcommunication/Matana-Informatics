import {
  getAllHmj,
  getHmjById,
  createHmj,
  updateHmj,
  deleteHmj,
} from "../../models/hmj/hmj.js";

// Controller untuk mendapatkan semua HMJ
export const getAllHMJController = async (req, res) => {
  try {
    const hmj = await getAllHmj();
    res.status(200).json({
      success: true,
      data: hmj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk mendapatkan HMJ berdasarkan ID
export const getHMJByIdController = async (req, res) => {
  try {
    const { id_hmj } = req.params;
    const hmj = await getHmjById(id_hmj);
    res.status(200).json({
      success: true,
      data: hmj,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk membuat data HMJ baru
export const createHMJController = async (req, res) => {
  try {
    const hmjData = req.body; // Data dikirim melalui request body
    const result = await createHmj(hmjData);
    res.status(201).json({
      success: true,
      message: "HMJ berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk memperbarui data HMJ berdasarkan ID
export const updateHMJController = async (req, res) => {
  try {
    const { id_hmj } = req.params;
    const updateData = req.body; // Data untuk update dikirim melalui request body
    const result = await updateHmj(id_hmj, updateData);
    res.status(200).json({
      success: true,
      message: "HMJ berhasil diperbarui",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk menghapus data HMJ berdasarkan ID
export const deleteHMJController = async (req, res) => {
  try {
    const { id_hmj } = req.params;
    await deleteHmj(id_hmj);
    res.status(200).json({
      success: true,
      message: "HMJ berhasil dihapus",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
