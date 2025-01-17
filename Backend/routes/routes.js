import express from "express";
import {
  getMahasiswa,
  getDosen,
  getPrestasi,
  getProduk,
} from "../controllers/controllers.js";
import {
  getAllMahasiswaController,
  getMahasiswaByNimController,
  updateMahasiswaController,
  deleteMahasiswaController,
  createMahasiswaController,
} from "../controllers/mahasiswa/mahasiswa.js";
import {
  handleCreatePrestasi,
  handleDeletePrestasi,
  handleGetAllPrestasi,
  handleUpdatePrestasi,
  handleGetPrestasiById,
} from "../controllers/prestasi/prestasi.js";
import {
  getAllAcaraController,
  getAcaraByIdController,
  updateAcaraController,
  createAcaraController,
  deleteAcaraController,
} from "../controllers/acara/acara.js";
import { getAllProker } from "../models/proker/proker.js";
import {
  createProkerController,
  deleteProkerController,
  getAllProkerController,
  getProkerByIdController,
  updateProkerController,
} from "../controllers/proker/proker.js";
import {
  createHMJController,
  deleteHMJController,
  getAllHMJController,
  getHMJByIdController,
  updateHMJController,
} from "../controllers/hmj/hmj.js";
import {
  createDosenController,
  deleteDosenController,
  getAllDosenController,
  getDosenByIdController,
  updateDosenController,
} from "../controllers/dosen/dosen.js";
import {
  createTentangController,
  deleteTentangController,
  getAllTentangController,
  getTentangByIdController,
  updateTentangController,
} from "../controllers/tentang/tentang.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Mahasiswa
router.get("/mahasiswa", getAllMahasiswaController);
router.get("/mahasiswa/:nim", getMahasiswaByNimController);
router.post("/mahasiswa", createMahasiswaController);
router.patch("/mahasiswa/:nim", updateMahasiswaController);
router.delete("/mahasiswa/:nim", deleteMahasiswaController);

// Prestasi
router.get("/prestasi", handleGetAllPrestasi);
router.get("/prestasi/:id", handleGetPrestasiById);
router.patch("/prestasi/:id", handleUpdatePrestasi);
router.delete("/prestasi/:id", handleDeletePrestasi);
router.post("/prestasi", handleCreatePrestasi);

// Agenda / Acara
router.get("/acara", getAllAcaraController);
router.get("/acara/:id_agenda", getAcaraByIdController);
router.patch("/acara/:id_agenda", updateAcaraController);
router.delete("/acara/:id_agenda", deleteAcaraController);
router.post("/acara", createAcaraController);

// Proker
router.get("/proker", getAllProkerController);
router.get("/proker/:id_proker", getProkerByIdController);
router.patch("/proker/:id_proker", updateProkerController);
router.delete("/proker/:id_proker", deleteProkerController);
router.post("/proker", createProkerController);

// HMJ
router.get("/hmj", getAllHMJController);
router.get("/hmj/:id_hmj", getHMJByIdController);
router.patch("/hmj/:id_hmj", updateHMJController);
router.delete("/hmj/:id_hmj", deleteHMJController);
router.post("/hmj", createHMJController);

// Kerjasama

// Dosen
router.get("/dosen", getAllDosenController);
router.get("/dosen/:id_dosen", getDosenByIdController);
router.post("/dosen", createDosenController);
router.patch("/dosen/:id_dosen", updateDosenController);
router.delete("/dosen/:id_dosen", deleteDosenController);

// Produk
router.get("/produk", getProduk);

// Tentang
router.get("/tentang", getAllTentangController);
router.get("/tentang/:id", getTentangByIdController);
router.post("/tentang", createTentangController);
router.delete("/tentang/:id", deleteTentangController);
router.patch("/tentang/:id", updateTentangController);

export default router;
