import db from "../../database/db.js";

// Mendapatkan semua data dari tabel tentang
export const getAllTentangController = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tentang");
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mendapatkan data tentang berdasarkan ID
export const getTentangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM tentang WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data dengan ID tersebut tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Menambahkan data baru ke tabel tentang
export const createTentangController = async (req, res) => {
  const { image_kerjasama, visi, misi, foto_mahasiswa, image_prestasi } =
    req.body;

  if (
    !image_kerjasama ||
    !visi ||
    !misi ||
    !foto_mahasiswa ||
    !image_prestasi
  ) {
    return res.status(400).json({
      success: false,
      message: "Semua field harus diisi",
    });
  }

  try {
    const query = `
      INSERT INTO tentang (image_kerjasama, visi, misi, foto_mahasiswa, image_prestasi)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      image_kerjasama,
      visi,
      misi,
      foto_mahasiswa,
      image_prestasi,
    ]);
    res.status(201).json({
      success: true,
      message: "Data berhasil ditambahkan",
      data: {
        id: result.insertId,
        image_kerjasama,
        visi,
        misi,
        foto_mahasiswa,
        image_prestasi,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Memperbarui data tentang berdasarkan ID
export const updateTentangController = async (req, res) => {
  const { id } = req.params;
  const { image_kerjasama, visi, misi, foto_mahasiswa, image_prestasi } =
    req.body;

  if (
    !image_kerjasama &&
    !visi &&
    !misi &&
    !foto_mahasiswa &&
    !image_prestasi
  ) {
    return res.status(400).json({
      success: false,
      message: "Tidak ada data yang diberikan untuk diupdate",
    });
  }

  try {
    const fields = [];
    const values = [];

    if (image_kerjasama) {
      fields.push("image_kerjasama = ?");
      values.push(image_kerjasama);
    }
    if (visi) {
      fields.push("visi = ?");
      values.push(visi);
    }
    if (misi) {
      fields.push("misi = ?");
      values.push(misi);
    }
    if (foto_mahasiswa) {
      fields.push("foto_mahasiswa = ?");
      values.push(foto_mahasiswa);
    }
    if (image_prestasi) {
      fields.push("image_prestasi = ?");
      values.push(image_prestasi);
    }

    values.push(id);

    const query = `
      UPDATE tentang
      SET ${fields.join(", ")}
      WHERE id = ?
    `;
    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Data dengan ID tersebut tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Menghapus data tentang berdasarkan ID
export const deleteTentangController = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM tentang WHERE id = ?";
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Data dengan ID tersebut tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
