import {
  getAllDosen,
  getDosenById,
  createDosen,
  updateDosen,
  deleteDosen,
} from "../../models/dosen/dosen.js";

// Controller untuk mendapatkan semua dosen
export const getAllDosenController = async (req, res) => {
  try {
    const dosen = await getAllDosen();
    res.status(200).json({
      success: true,
      data: dosen,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk mendapatkan dosen berdasarkan ID
export const getDosenByIdController = async (req, res) => {
  try {
    const { id_dosen } = req.params;
    const dosen = await getDosenById(id_dosen);
    res.status(200).json({
      success: true,
      data: dosen,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller untuk membuat dosen baru
export const createDosenController = async (req, res) => {
  try {
    const dosenData = req.body; // Data dikirim melalui request body
    const result = await createDosen(dosenData);
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

// Controller untuk memperbarui dosen berdasarkan ID
export const updateDosenController = async (req, res) => {
  try {
    const { id_dosen } = req.params;
    const updateData = req.body; // Data untuk update dikirim melalui request body
    const result = await updateDosen(id_dosen, updateData);
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

// Controller untuk menghapus dosen berdasarkan ID
export const deleteDosenController = async (req, res) => {
  try {
    const { id_dosen } = req.params;
    const result = await deleteDosen(id_dosen);
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
