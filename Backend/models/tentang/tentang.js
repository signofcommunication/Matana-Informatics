import db from "../../database/db.js";

// Mendapatkan semua data dari tabel tentang
export const getAllTentang = async () => {
  const [rows] = await db.query("SELECT * FROM tentang");
  return rows;
};

// Mendapatkan data tentang berdasarkan ID
export const getTentangById = async id => {
  const [rows] = await db.query("SELECT * FROM tentang WHERE id = ?", [id]);
  if (rows.length === 0) {
    throw new Error("Data dengan ID tersebut tidak ditemukan");
  }
  return rows[0];
};

// Menambahkan data baru ke tabel tentang
export const createTentang = async data => {
  const { image_kerjasama, visi, misi, foto_mahasiswa, image_prestasi } = data;

  // Validasi data
  if (
    !image_kerjasama ||
    !visi ||
    !misi ||
    !foto_mahasiswa ||
    !image_prestasi
  ) {
    throw new Error("Semua field harus diisi");
  }

  try {
    const query = `
      INSERT INTO tentang (image_kerjasama, visi, misi, foto_mahasiswa, image_prestasi)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await db.execute(query, [
      image_kerjasama,
      visi,
      misi,
      foto_mahasiswa,
      image_prestasi,
    ]);
    return {
      success: true,
      message: "Data berhasil ditambahkan",
      data: {
        id: result.insertId,
        ...data,
      },
    };
  } catch (error) {
    console.error("Error saat menambahkan data:", error);
    throw new Error("Gagal menambahkan data");
  }
};

// Memperbarui data tentang berdasarkan ID
export const updateTentang = async (id, updateData) => {
  const { image_kerjasama, visi, misi, foto_mahasiswa, image_prestasi } =
    updateData;

  if (
    !image_kerjasama &&
    !visi &&
    !misi &&
    !foto_mahasiswa &&
    !image_prestasi
  ) {
    throw new Error("Tidak ada data yang diberikan untuk diupdate");
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
    const result = await db.execute(query, values);

    if (result.affectedRows === 0) {
      throw new Error("Data dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Data berhasil diperbarui",
    };
  } catch (error) {
    console.error("Error saat memperbarui data:", error);
    throw new Error("Gagal memperbarui data");
  }
};

// Menghapus data tentang berdasarkan ID
export const deleteTentang = async id => {
  try {
    const query = "DELETE FROM tentang WHERE id = ?";
    const result = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error("Data dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Data berhasil dihapus",
    };
  } catch (error) {
    console.error("Error saat menghapus data:", error);
    throw new Error("Gagal menghapus data");
  }
};
