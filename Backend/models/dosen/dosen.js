import db from "../../database/db.js";

// Mendapatkan semua dosen
export const getAllDosen = async () => {
  const [rows] = await db.query("SELECT * FROM dosen");
  return rows;
};

// Mendapatkan dosen berdasarkan ID
export const getDosenById = async id_dosen => {
  const [rows] = await db.query("SELECT * FROM dosen WHERE id_dosen = ?", [
    id_dosen,
  ]);
  if (rows.length === 0) {
    throw new Error("Dosen dengan ID tersebut tidak ditemukan");
  }
  return rows[0];
};

// Menambahkan dosen baru
export const createDosen = async dosen => {
  const {
    NIDN,
    nama_lengkap_dosen,
    NIP,
    bidang_keahlian,
    link_google_cendekia,
  } = dosen;

  // Validasi data
  if (
    !NIDN ||
    !nama_lengkap_dosen ||
    !NIP ||
    !bidang_keahlian ||
    !link_google_cendekia
  ) {
    throw new Error(
      "Semua field harus diisi: NIDN, nama_lengkap_dosen, NIP, bidang_keahlian, link_google_cendekia"
    );
  }

  try {
    const query = `
      INSERT INTO dosen (NIDN, nama_lengkap_dosen, NIP, bidang_keahlian, link_google_cendekia)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await db.execute(query, [
      NIDN,
      nama_lengkap_dosen,
      NIP,
      bidang_keahlian,
      link_google_cendekia,
    ]);
    return {
      success: true,
      message: "Dosen berhasil ditambahkan",
      data: {
        id_dosen: result.insertId, // ID yang di-generate otomatis
        ...dosen,
      },
    };
  } catch (error) {
    console.error("Error saat menambahkan dosen:", error);
    throw new Error("Gagal menambahkan dosen");
  }
};

// Memperbarui dosen berdasarkan ID
export const updateDosen = async (id_dosen, updateData) => {
  const {
    NIDN,
    nama_lengkap_dosen,
    NIP,
    bidang_keahlian,
    link_google_cendekia,
  } = updateData;

  if (
    !NIDN &&
    !nama_lengkap_dosen &&
    !NIP &&
    !bidang_keahlian &&
    !link_google_cendekia
  ) {
    throw new Error("Tidak ada data yang diberikan untuk diupdate");
  }

  try {
    const fields = [];
    const values = [];

    if (NIDN) {
      fields.push("NIDN = ?");
      values.push(NIDN);
    }
    if (nama_lengkap_dosen) {
      fields.push("nama_lengkap_dosen = ?");
      values.push(nama_lengkap_dosen);
    }
    if (NIP) {
      fields.push("NIP = ?");
      values.push(NIP);
    }
    if (bidang_keahlian) {
      fields.push("bidang_keahlian = ?");
      values.push(bidang_keahlian);
    }
    if (link_google_cendekia) {
      fields.push("link_google_cendekia = ?");
      values.push(link_google_cendekia);
    }

    values.push(id_dosen);

    const query = `
      UPDATE dosen
      SET ${fields.join(", ")}
      WHERE id_dosen = ?
    `;
    const result = await db.execute(query, values);

    if (result.affectedRows === 0) {
      throw new Error("Dosen dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Dosen berhasil diperbarui",
    };
  } catch (error) {
    console.error("Error saat memperbarui dosen:", error);
    throw new Error("Gagal memperbarui dosen");
  }
};

// Menghapus dosen berdasarkan ID
export const deleteDosen = async id_dosen => {
  try {
    const query = "DELETE FROM dosen WHERE id_dosen = ?";
    const result = await db.execute(query, [id_dosen]);

    if (result.affectedRows === 0) {
      throw new Error("Dosen dengan ID tersebut tidak ditemukan");
    }

    return {
      success: true,
      message: "Dosen berhasil dihapus",
    };
  } catch (error) {
    console.error("Error saat menghapus dosen:", error);
    throw new Error("Gagal menghapus dosen");
  }
};
