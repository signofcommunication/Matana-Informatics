import db from "../../database/db.js";

// Mendapatkan semua acara
export const getAllAcara = async () => {
  const [rows] = await db.query("SELECT * FROM agenda");
  return rows;
};

// Mendapatkan acara berdasarkan ID
export const getAcaraById = async id_agenda => {
  const [rows] = await db.query("SELECT * FROM agenda WHERE id_agenda = ?", [
    id_agenda,
  ]);
  if (rows.length === 0) {
    throw new Error("Acara dengan ID tersebut tidak ditemukan");
  }
  return rows[0];
};

// Menambahkan acara baru
export const createAcara = async acara => {
  const { no, nama_acara, tanggal, keterangan, waktu, tagline } = acara;

  // Validasi data
  if (!no || !nama_acara || !tanggal || !waktu) {
    throw new Error("Field no, nama_acara, tanggal, dan waktu harus diisi");
  }

  try {
    const query = `
      INSERT INTO agenda (no, nama_acara, tanggal, keterangan, waktu, tagline)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await db.execute(query, [
      no,
      nama_acara,
      tanggal,
      keterangan,
      waktu,
      tagline,
    ]);
    return {
      success: true,
      message: "Acara berhasil ditambahkan",
      data: {
        id_agenda: result.insertId,
        ...acara,
      },
    };
  } catch (error) {
    console.error("Error saat menambahkan acara:", error);
    throw new Error("Gagal menambahkan acara");
  }
};

// Memperbarui acara berdasarkan ID
export const updateAcara = async (id_agenda, updateData) => {
  const { no, nama_acara, tanggal, keterangan, waktu, tagline } = updateData;

  if (!no && !nama_acara && !tanggal && !keterangan && !waktu && !tagline) {
    throw new Error("Tidak ada data yang diberikan untuk diupdate");
  }

  try {
    const fields = [];
    const values = [];

    if (no) {
      fields.push("no = ?");
      values.push(no);
    }
    if (nama_acara) {
      fields.push("nama_acara = ?");
      values.push(nama_acara);
    }
    if (tanggal) {
      fields.push("tanggal = ?");
      values.push(tanggal);
    }
    if (keterangan) {
      fields.push("keterangan = ?");
      values.push(keterangan);
    }
    if (waktu) {
      fields.push("waktu = ?");
      values.push(waktu);
    }
    if (tagline) {
      fields.push("tagline = ?");
      values.push(tagline);
    }

    values.push(id_agenda);

    const query = `
      UPDATE agenda
      SET ${fields.join(", ")}
      WHERE id_agenda = ?
    `;
    const result = await db.execute(query, values);

    if (result.affectedRows === 0) {
      throw new Error("Acara dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Acara berhasil diperbarui",
    };
  } catch (error) {
    console.error("Error saat memperbarui acara:", error);
    throw new Error("Gagal memperbarui acara");
  }
};

// Menghapus acara berdasarkan ID
export const deleteAcara = async id_agenda => {
  try {
    const query = "DELETE FROM agenda WHERE id_agenda = ?";
    const result = await db.execute(query, [id_agenda]);

    if (result.affectedRows === 0) {
      throw new Error("Acara dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Acara berhasil dihapus",
    };
  } catch (error) {
    console.error("Error saat menghapus acara:", error);
    throw new Error("Gagal menghapus acara");
  }
};
