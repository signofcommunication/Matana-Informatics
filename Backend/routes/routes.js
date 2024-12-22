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

router.get("/dosen", getDosen);
router.get("/produk", getProduk);

export default router;
