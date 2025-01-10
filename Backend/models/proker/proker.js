import db from "../../database/db.js";

// Mendapatkan semua proker
export const getAllProker = async () => {
  const [rows] = await db.query("SELECT * FROM proker");
  return rows;
};

// Mendapatkan proker berdasarkan ID
export const getProkerById = async id_proker => {
  const [rows] = await db.query("SELECT * FROM proker WHERE id_proker = ?", [
    id_proker,
  ]);
  if (rows.length === 0) {
    throw new Error("Proker dengan ID tersebut tidak ditemukan");
  }
  return rows[0];
};

// Menambahkan proker baru
export const createProker = async proker => {
  const { nama_proker, start_date, end_date, status } = proker;

  // Validasi data
  if (!nama_proker || !start_date || !end_date || status === undefined) {
    throw new Error(
      "Field nama_proker, start_date, end_date, dan status harus diisi"
    );
  }

  try {
    const query = `
      INSERT INTO proker (nama_proker, start_date, end_date, status)
      VALUES (?, ?, ?, ?)
    `;
    const result = await db.execute(query, [
      nama_proker,
      start_date,
      end_date,
      status,
    ]);
    return {
      id_proker: result.insertId,
      ...proker,
    };
  } catch (error) {
    console.error("Error saat menambahkan proker:", error);
    throw new Error("Gagal menambahkan proker");
  }
};

// Memperbarui proker berdasarkan ID
export const updateProker = async (id_proker, updateData) => {
  const { nama_proker, start_date, end_date, status } = updateData;

  if (!nama_proker && !start_date && !end_date && status === undefined) {
    throw new Error("Tidak ada data yang diberikan untuk diupdate");
  }

  try {
    const fields = [];
    const values = [];

    if (nama_proker) {
      fields.push("nama_proker = ?");
      values.push(nama_proker);
    }
    if (start_date) {
      fields.push("start_date = ?");
      values.push(start_date);
    }
    if (end_date) {
      fields.push("end_date = ?");
      values.push(end_date);
    }
    if (status !== undefined) {
      fields.push("status = ?");
      values.push(status);
    }

    values.push(id_proker);

    const query = `
      UPDATE proker
      SET ${fields.join(", ")}
      WHERE id_proker = ?
    `;
    const result = await db.execute(query, values);

    if (result.affectedRows === 0) {
      throw new Error("Proker dengan ID tersebut tidak ditemukan");
    }

    return true;
  } catch (error) {
    console.error("Error saat memperbarui proker:", error);
    throw new Error("Gagal memperbarui proker");
  }
};

// Menghapus proker berdasarkan ID
export const deleteProker = async id_proker => {
  try {
    const query = "DELETE FROM proker WHERE id_proker = ?";
    const result = await db.execute(query, [id_proker]);

    if (result.affectedRows === 0) {
      throw new Error("Proker dengan ID tersebut tidak ditemukan");
    }

    return true;
  } catch (error) {
    console.error("Error saat menghapus proker:", error);
    throw new Error("Gagal menghapus proker");
  }
};
