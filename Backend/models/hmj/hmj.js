import db from "../../database/db.js";

// Mendapatkan semua data HMJ
export const getAllHmj = async () => {
  const [rows] = await db.query("SELECT * FROM hmj");
  return rows;
};

// Mendapatkan data HMJ berdasarkan ID
export const getHmjById = async id_hmj => {
  const [rows] = await db.query("SELECT * FROM hmj WHERE id_hmj = ?", [id_hmj]);
  if (rows.length === 0) {
    throw new Error("HMJ dengan ID tersebut tidak ditemukan");
  }
  return rows[0];
};

// Menambahkan data HMJ baru
export const createHmj = async hmj => {
  const { nama_lengkap, tahun_jabatan, NIM, jabatan, image } = hmj;

  // Validasi data
  if (!nama_lengkap || !tahun_jabatan || !NIM || !jabatan) {
    throw new Error(
      "Field nama_lengkap, tahun_jabatan, NIM, dan jabatan harus diisi"
    );
  }

  try {
    const query = `
      INSERT INTO hmj (nama_lengkap, tahun_jabatan, NIM, jabatan, image)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await db.execute(query, [
      nama_lengkap,
      tahun_jabatan,
      NIM,
      jabatan,
      image || null,
    ]);
    return {
      id_hmj: result.insertId,
      ...hmj,
    };
  } catch (error) {
    console.error("Error saat menambahkan data HMJ:", error);
    throw new Error("Gagal menambahkan data HMJ");
  }
};

// Memperbarui data HMJ berdasarkan ID
export const updateHmj = async (id_hmj, updateData) => {
  const { nama_lengkap, tahun_jabatan, NIM, jabatan, image } = updateData;

  if (!nama_lengkap && !tahun_jabatan && !NIM && !jabatan && !image) {
    throw new Error("Tidak ada data yang diberikan untuk diupdate");
  }

  try {
    const fields = [];
    const values = [];

    if (nama_lengkap) {
      fields.push("nama_lengkap = ?");
      values.push(nama_lengkap);
    }
    if (tahun_jabatan) {
      fields.push("tahun_jabatan = ?");
      values.push(tahun_jabatan);
    }
    if (NIM) {
      fields.push("NIM = ?");
      values.push(NIM);
    }
    if (jabatan) {
      fields.push("jabatan = ?");
      values.push(jabatan);
    }
    if (image) {
      fields.push("image = ?");
      values.push(image);
    }

    values.push(id_hmj);

    const query = `
      UPDATE hmj
      SET ${fields.join(", ")}
      WHERE id_hmj = ?
    `;
    const result = await db.execute(query, values);

    if (result.affectedRows === 0) {
      throw new Error("HMJ dengan ID tersebut tidak ditemukan");
    }

    return true;
  } catch (error) {
    console.error("Error saat memperbarui data HMJ:", error);
    throw new Error("Gagal memperbarui data HMJ");
  }
};

// Menghapus data HMJ berdasarkan ID
export const deleteHmj = async id_hmj => {
  try {
    const query = "DELETE FROM hmj WHERE id_hmj = ?";
    const result = await db.execute(query, [id_hmj]);

    if (result.affectedRows === 0) {
      throw new Error("HMJ dengan ID tersebut tidak ditemukan");
    }

    return true;
  } catch (error) {
    console.error("Error saat menghapus data HMJ:", error);
    throw new Error("Gagal menghapus data HMJ");
  }
};
