const db = require('../config/db_config')
const { getScoreValue } = require('../utils/utils')

const getCalonPetugasValue = (req, res) => {
  const sql = 'SELECT id, date, data FROM master_calon_petugas'
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: err })

    const arrayResult = result.map((value) => {
      const { id, date, data } = value
      const parsedData = JSON.parse(data)
      const namaCalon = parsedData.keteranganCalon.namaCalon
      const scores = getScoreValue(parsedData)

      return {
        id,
        date,
        namaCalon,
        scores,
      }
    })

    return res.status(200).json({ success: true, data: arrayResult })
  })
}

module.exports = {
  getCalonPetugasValue,
}
