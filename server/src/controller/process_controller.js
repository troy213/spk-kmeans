const db = require('../config/db_config')
const kmeans = require('node-kmeans')
const { getScoreValue } = require('../utils/utils')

const getCalonPetugasValue = (req, res, next) => {
  const sql = 'SELECT id, date, data FROM master_calon_petugas'
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: err })
    const arrayResult = result.map((value) => {
      const { id, date, data } = value
      const parsedData = JSON.parse(data)
      const namaCalon = parsedData.keteranganCalon.namaCalon
      const score = getScoreValue(parsedData)

      return {
        id,
        date,
        namaCalon,
        score,
      }
    })

    let vectors = new Array()
    for (let i = 0; i < arrayResult.length; i++) {
      vectors[i] = [
        arrayResult[i]['score']['pertanyaanPetugas'],
        arrayResult[i]['score']['penilaian'],
        arrayResult[i]['score']['pengetahuan'],
      ]
    }

    kmeans.clusterize(vectors, { k: 2 }, (kmeansErr, kmeansRes) => {
      if (kmeansErr) {
        return res.status(500).json({ success: false, message: kmeansErr })
      } else {
        return res
          .status(200)
          .json({ success: true, data: arrayResult, kmeans: kmeansRes })
      }
    })
  })
}

module.exports = {
  getCalonPetugasValue,
}
