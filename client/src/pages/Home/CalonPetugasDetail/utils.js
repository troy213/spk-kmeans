export const valueIdentifier = (idContent, identifier, value) => {
  if (!value) return '-'
  if (idContent === 'pertanyaanPetugas') {
    const uniqueAnswer = ['kesibukan', 'bisaBerkendara', 'hasAndroid']

    const unique = {
      kesibukan: {
        0: 'Sibuk',
        1: 'Sedang',
        2: 'Luang',
      },
      bisaBerkendara: {
        0: 'Tidak bisa',
        1: 'Ragu-ragu',
        2: 'Bisa',
      },
      hasAndroid: {
        0: 'Tidak ada',
        1: 'Ragu-ragu',
        2: 'Ada',
      },
    }

    const common = {
      0: 'Tidak',
      1: 'Ragu-ragu',
      2: 'Ya',
    }

    if (uniqueAnswer.includes(identifier)) return unique[identifier][value]
    return common[value]
  }
  if (idContent === 'penilaian') {
    const uniqueAnswer = ['kelengkapanDokumen']

    const unique = {
      kelengkapanDokumen: {
        0: 'Tidak lengkap',
        3: 'Lengkap',
      },
    }

    const common = {
      0: 'Kurang',
      1: 'Sedang',
      2: 'Baik',
      3: 'Baik sekali',
    }

    if (uniqueAnswer.includes(identifier)) return unique[identifier][value]
    return common[value]
  }
  return value
}
