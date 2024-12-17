import models from "../models/informatika-models.js";

const getMahasiswa = async (req, res) => {
  try {
    const data = await models.getAllMahasiswa();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDosen = async (req, res) => {
  try {
    const data = await models.getAllDosen();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPrestasi = async (req, res) => {
  try {
    const data = await models.getAllPrestasi();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProduk = async (req, res) => {
  try {
    const data = await models.getAllProduk();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getMahasiswa, getDosen, getPrestasi, getProduk };
