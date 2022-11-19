const CONTENT = [
  {
    idContent: 'keteranganCalon',
    title: 'Keterangan Calon Petugas',
    content: [
      {
        identifier: 'hari',
        question: 'Hari/Tanggal Wawancara',
      },
      {
        identifier: 'waktuDanTempat',
        question: 'Waktu dan Tempat Wawancara',
      },
      {
        identifier: 'namaCalon',
        question: 'Nama Calon Petugas Pendataan Awal Regsosek',
      },
      {
        identifier: 'nik',
        question: 'NIK',
      },
      {
        identifier: 'kecamatan',
        question: 'Kecamatan Domisili',
      },
      {
        identifier: 'kelurahan',
        question: 'Kelurahan Domisili',
      },
      {
        identifier: 'nomorHpCalon',
        question: 'Nomor HP Calon Petugas',
      },
    ],
  },
  {
    idContent: 'pertanyaanPetugas',
    title: 'Ditanyakan Kepada Calon Petugas',
    content: [
      {
        identifier: 'bersediaBelajar',
        question:
          'Apakah Saudara/i bersedia mengikuti pembelajaran materi Pendataan Awal Regsosek?',
      },
      {
        identifier: 'bersediaTTD',
        question:
          'Apakah Saudara/i bersedia menandatangani perjanjian kerja sebagai petugas Pendataan Awal Regsosek selama bulan Oktober dan tidak terikan dengan pekerjaan lain?',
      },
      {
        identifier: 'bersediaAturan',
        question:
          'Apakah Saudara/i bersedia mengikuti semua aturan yang berlaku sebagai petugas Pendataan Awal Regsosek?',
      },
      {
        identifier: 'bersediaTugas',
        question:
          'Apakah Saudara/i bersedia melakukan rangkaian tugas Pendataan Awal Regsosek secara fokus?',
      },
      {
        identifier: 'kesibukan',
        question:
          'Bagaimana jadwal aktivitas kesibukan Saudara/i pada bulan Oktober - November 2022',
      },
      {
        identifier: 'hasMotor',
        question:
          'Apakah Saudara/i memiliki kendaraan roda 2 pada bulan Oktober November 2022?',
      },
      {
        identifier: 'bisaBerkendara',
        question: 'Apakah Saudara/i bisa mengendarai kendaraan roda 2?',
      },
      {
        identifier: 'hasAndroid',
        question:
          'Apakah Saudara/i memiliki handphone berbasis Android pada bulan Oktober November 2022?',
      },
    ],
  },
  {
    idContent: 'penilaian',
    title: 'Diisi Oleh Pewawancara',
    content: [
      {
        identifier: 'nilaiCalon',
        question:
          'Bagaimana penilaian penguji terhadap kemampuan berkomunikasi dari calon petugas?',
      },
      {
        identifier: 'kelengkapanDokumen',
        question:
          'Bagaimana kelengkapan dokumen calon petugas (fotokopi KTP dan ijazah, surat lamaran dengan tulisan tangan, pas photo ukuran 3x4 dan 4x6)?',
      },
      {
        identifier: 'kepribadian',
        question:
          'Bagaimana kepribadian calon petugas (penampilan, sikap dan cara berbicara calon petugas)?',
      },
    ],
  },
  {
    idContent: 'pengetahuan',
    title: 'Pertanyaan Pengetahuan',
    content: [
      {
        identifier: 'strategiPerumElite',
        question:
          'Jika ditugaskan mendata di perumahan elit, bagaimana strategi mandiri anda agar pendataan berjalan lancar?',
      },
      {
        identifier: 'strategiApartemen',
        question:
          'Jika ditugaskan mendata di Apartemen, bagaimana strategi mandiri anda agar pendataan berjalan lancar?',
      },
      {
        identifier: 'strategiResponden',
        question:
          'Bagaimana strategi anda agar pendataan berjalan lancar ketika menghadapi Responden yang tidak mau didata?',
      },
    ],
  },
  {
    idContent: 'kesimpulan',
    title: 'Kesimpulan',
    content: [
      {
        identifier: 'catatan',
        question: 'Catatan',
      },
    ],
  },
]

export default CONTENT
