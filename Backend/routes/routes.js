import express from "express";
import {
  getMahasiswa,
  getDosen,
  getPrestasi,
  getProduk,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/mahasiswa", getMahasiswa);
router.get("/dosen", getDosen);
router.get("/prestasi", getPrestasi);
router.get("/produk", getProduk);

export default router;
