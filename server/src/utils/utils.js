const convertScore = (sum, maxValue) => {
  const limit = maxValue / 6
  if (sum < limit) return 0
  if (sum >= limit && sum < limit * 2) return 2
  if (sum >= limit * 2 && sum < limit * 3) return 4
  if (sum >= limit * 3 && sum < limit * 4) return 6
  if (sum >= limit * 4 && sum < limit * 5) return 8
  if (sum >= limit * 5) return 10
  return 0
}

const getScoreValue = (parsedData) => {
  const SCORE_FIELD = ['pertanyaanPetugas', 'penilaian', 'pengetahuan']
  const MAX_SCORE = {
    pertanyaanPetugas: 16,
    penilaian: 9,
    pengetahuan: 30,
  }
  let returnedArray = []

  for (const field in parsedData) {
    if (!SCORE_FIELD.includes(field)) continue

    const sum = Object.values(parsedData[field]).reduce(
      (a, b) => parseInt(a) + parseInt(b),
      0
    )
    returnedArray = [...returnedArray, convertScore(sum, MAX_SCORE[field])]
  }
  return returnedArray
}

module.exports = {
  getScoreValue,
}
