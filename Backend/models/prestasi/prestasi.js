import db from "../../database/db.js";

const getAllPrestasi = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM prestasi");
    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error("Error saat mengambil semua data prestasi:", error);
    throw new Error("Gagal mengambil data prestasi");
  }
};

const createPrestasi = async prestasi => {
  const { logo, judul, media, penjelasan, waktu, tagline } = prestasi;

  // Validasi data
  if (!logo || !judul || !media || !penjelasan || !waktu || !tagline) {
    throw new Error(
      "Semua field (logo, judul, media, penjelasan, waktu, tagline) harus diisi"
    );
  }

  try {
    const query = `
      INSERT INTO prestasi (logo, judul, media, penjelasan, waktu, tagline)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await db.execute(query, [
      logo,
      judul,
      media,
      penjelasan,
      waktu,
      tagline,
    ]);

    return {
      success: true,
      message: "Prestasi berhasil ditambahkan",
      data: {
        id_prestasi: result.insertId,
        ...prestasi,
      },
    };
  } catch (error) {
    console.error("Error saat menambahkan prestasi:", error);
    throw new Error("Gagal menambahkan prestasi");
  }
};

const updatePrestasi = async (id_prestasi, updateData) => {
  const { logo, judul, media, penjelasan, waktu, tagline } = updateData;

  if (!id_prestasi) {
    throw new Error("ID prestasi harus disediakan untuk melakukan update");
  }
  if (!logo && !judul && !media && !penjelasan && !waktu && !tagline) {
    throw new Error("Tidak ada data yang diberikan untuk diupdate");
  }

  try {
    const fields = [];
    const values = [];

    if (logo) {
      fields.push("logo = ?");
      values.push(logo);
    }
    if (judul) {
      fields.push("judul = ?");
      values.push(judul);
    }
    if (media) {
      fields.push("media = ?");
      values.push(media);
    }
    if (penjelasan) {
      fields.push("penjelasan = ?");
      values.push(penjelasan);
    }
    if (waktu) {
      fields.push("waktu = ?");
      values.push(waktu);
    }
    if (tagline) {
      fields.push("tagline = ?");
      values.push(tagline);
    }

    values.push(id_prestasi);

    const query = `
      UPDATE prestasi
      SET ${fields.join(", ")}
      WHERE id_prestasi = ?
    `;

    const result = await db.execute(query, values);

    if (result.affectedRows === 0) {
      throw new Error("Prestasi dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Prestasi berhasil diupdate",
    };
  } catch (error) {
    console.error("Error saat mengupdate prestasi:", error);
    throw new Error("Gagal mengupdate prestasi");
  }
};

const deletePrestasi = async id_prestasi => {
  if (!id_prestasi) {
    throw new Error("ID prestasi harus disediakan untuk menghapus data");
  }

  try {
    const query = `
      DELETE FROM prestasi
      WHERE id_prestasi = ?
    `;

    const result = await db.execute(query, [id_prestasi]);

    if (result.affectedRows === 0) {
      throw new Error("Prestasi dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Prestasi berhasil dihapus",
    };
  } catch (error) {
    console.error("Error saat menghapus prestasi:", error);
    throw new Error("Gagal menghapus prestasi");
  }
};

const getPrestasiById = async id_prestasi => {
  if (!id_prestasi) {
    throw new Error("ID prestasi harus disediakan");
  }

  try {
    const query = `
      SELECT * FROM prestasi
      WHERE id_prestasi = ?
    `;

    const [rows] = await db.query(query, [id_prestasi]);

    if (rows.length === 0) {
      throw new Error("Prestasi dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      data: rows[0],
    };
  } catch (error) {
    console.error("Error saat mengambil data prestasi berdasarkan ID:", error);
    throw new Error("Gagal mengambil data prestasi berdasarkan ID");
  }
};

export {
  getAllPrestasi,
  createPrestasi,
  updatePrestasi,
  deletePrestasi,
  getPrestasiById,
};
