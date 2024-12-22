import db from "../../database/db.js";

const getAllMahasiswa = async () => {
  const [rows] = await db.query("SELECT * FROM mahasiswa");
  return rows;
};

const getMahasiswaByNIM = async nim => {
  if (!nim) {
    throw new Error("NIM harus disediakan");
  }

  try {
    const query = `
        SELECT * FROM mahasiswa
        WHERE NIM = ?
      `;

    const [rows] = await db.query(query, [nim]);

    if (rows.length === 0) {
      throw new Error("Mahasiswa dengan NIM tersebut tidak ditemukan");
    }

    return {
      success: true,
      data: rows[0],
    };
  } catch (error) {
    console.error(
      "Error saat mengambil data mahasiswa berdasarkan NIM:",
      error
    );
    throw new Error("Gagal mengambil data mahasiswa berdasarkan NIM");
  }
};

const createMahasiswa = async mahasiswa => {
  const { NIM, nama_lengkap, angkatan, tahun_lulus } = mahasiswa;

  if (!NIM || !nama_lengkap || !angkatan || !tahun_lulus) {
    throw new Error(
      "Semua field (NIM, nama_lengkap, angkatan, tahun_lulus) harus diisi"
    );
  }

  try {
    const query = `
        INSERT INTO mahasiswa (NIM, nama_lengkap, angkatan, tahun_lulus)
        VALUES (?, ?, ?, ?)
      `;

    const result = await db.execute(query, [
      NIM,
      nama_lengkap,
      angkatan,
      tahun_lulus,
    ]);

    return {
      success: true,
      message: "Data mahasiswa berhasil ditambahkan",
      data: {
        id: result.insertId,
        ...mahasiswa,
      },
    };
  } catch (error) {
    console.error("Error saat menambahkan data mahasiswa:", error);
    throw new Error("Gagal menambahkan data mahasiswa");
  }
};

const updateMahasiswa = async (nim, updateData) => {
  const { nama_lengkap, angkatan, tahun_lulus } = updateData;

  if (!nim) {
    throw new Error("NIM harus disediakan untuk melakukan update");
  }

  if (!nama_lengkap && !angkatan && !tahun_lulus) {
    throw new Error("Tidak ada data yang diberikan untuk diupdate");
  }

  try {
    const fields = [];
    const values = [];

    if (nama_lengkap) {
      fields.push("nama_lengkap = ?");
      values.push(nama_lengkap);
    }
    if (angkatan) {
      fields.push("angkatan = ?");
      values.push(angkatan);
    }
    if (tahun_lulus) {
      fields.push("tahun_lulus = ?");
      values.push(tahun_lulus);
    }

    values.push(nim);

    const query = `
        UPDATE mahasiswa
        SET ${fields.join(", ")}
        WHERE NIM = ?
      `;

    const result = await db.execute(query, values);

    if (result.affectedRows === 0) {
      throw new Error("Mahasiswa dengan NIM tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Data mahasiswa berhasil diupdate",
    };
  } catch (error) {
    console.error("Error saat mengupdate data mahasiswa:", error);
    throw new Error("Gagal mengupdate data mahasiswa");
  }
};

const deleteMahasiswa = async nim => {
  if (!nim) {
    throw new Error("NIM harus disediakan untuk melakukan delete");
  }

  try {
    const query = `
        DELETE FROM mahasiswa
        WHERE NIM = ?
      `;

    const result = await db.execute(query, [nim]);

    if (result.affectedRows === 0) {
      throw new Error("Mahasiswa dengan NIM tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Data mahasiswa berhasil dihapus",
    };
  } catch (error) {
    console.error("Error saat menghapus data mahasiswa:", error);
    throw new Error("Gagal menghapus data mahasiswa");
  }
};

export {
  createMahasiswa,
  getAllMahasiswa,
  deleteMahasiswa,
  updateMahasiswa,
  getMahasiswaByNIM,
};
