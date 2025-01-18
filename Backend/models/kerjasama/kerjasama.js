import db from "../../database/db.js";

// Mendapatkan semua data dari tabel kerjasama
export const getAllKerjasama = async () => {
  const [rows] = await db.query("SELECT * FROM kerjasama");
  return rows;
};

// Mendapatkan data kerjasama berdasarkan ID perusahaan
export const getKerjasamaById = async id_perusahaan => {
  const [rows] = await db.query(
    "SELECT * FROM kerjasama WHERE id_perusahaan = ?",
    [id_perusahaan]
  );
  if (rows.length === 0) {
    throw new Error("Data dengan ID tersebut tidak ditemukan");
  }
  return rows[0];
};

// Menambahkan data baru ke tabel kerjasama
export const createKerjasama = async data => {
  const { nama_perusahaan, judul_kerjasama, deskripsi, file_type } = data;

  // Validasi data
  if (!nama_perusahaan || !judul_kerjasama || !deskripsi || !file_type) {
    throw new Error("Semua field harus diisi");
  }

  try {
    const query = `
      INSERT INTO kerjasama (nama_perusahaan, judul_kerjasama, deskripsi, file_type)
      VALUES (?, ?, ?, ?)
    `;
    const result = await db.execute(query, [
      nama_perusahaan,
      judul_kerjasama,
      deskripsi,
      file_type,
    ]);
    return {
      success: true,
      message: "Data berhasil ditambahkan",
      data: {
        id_perusahaan: result.insertId,
        ...data,
      },
    };
  } catch (error) {
    console.error("Error saat menambahkan data:", error);
    throw new Error("Gagal menambahkan data");
  }
};

// Memperbarui data kerjasama berdasarkan ID perusahaan
export const updateKerjasama = async (id_perusahaan, updateData) => {
  const { nama_perusahaan, judul_kerjasama, deskripsi, file_type } = updateData;

  if (!nama_perusahaan && !judul_kerjasama && !deskripsi && !file_type) {
    throw new Error("Tidak ada data yang diberikan untuk diupdate");
  }

  try {
    const fields = [];
    const values = [];

    if (nama_perusahaan) {
      fields.push("nama_perusahaan = ?");
      values.push(nama_perusahaan);
    }
    if (judul_kerjasama) {
      fields.push("judul_kerjasama = ?");
      values.push(judul_kerjasama);
    }
    if (deskripsi) {
      fields.push("deskripsi = ?");
      values.push(deskripsi);
    }
    if (file_type) {
      fields.push("file_type = ?");
      values.push(file_type);
    }

    values.push(id_perusahaan);

    const query = `
      UPDATE kerjasama
      SET ${fields.join(", ")}
      WHERE id_perusahaan = ?
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

// Menghapus data kerjasama berdasarkan ID perusahaan
export const deleteKerjasama = async id_perusahaan => {
  try {
    const query = "DELETE FROM kerjasama WHERE id_perusahaan = ?";
    const result = await db.execute(query, [id_perusahaan]);

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
