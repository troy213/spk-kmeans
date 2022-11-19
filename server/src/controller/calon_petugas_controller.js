const { v4: uuidv4 } = require('uuid')
const db = require('../config/db_config')

const calonPetugasGet = (req, res) => {
  const sql =
    'SELECT calon.id, calon.date, calon.data, user.username FROM master_calon_petugas AS calon INNER JOIN user ON calon.user_id = user.id;'
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    return res.status(200).json({ success: true, data: result })
  })
}

const calonPetugasGetId = (req, res) => {
  const { id } = req.params
  const sql =
    'SELECT calon.id, calon.date, calon.data, user.username FROM master_calon_petugas AS calon INNER JOIN user ON calon.user_id = user.id WHERE calon.id=?;'
  db.query(sql, id, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    if (result.length === 0)
      return res
        .status(400)
        .json({ success: false, message: 'id field is missing' })
    return res.status(200).json({ success: true, data: result[0] })
  })
}

const calonPetugasPost = (req, res) => {
  const { userId, date, formData } = req.body
  const id = uuidv4()
  const sql =
    'INSERT INTO master_calon_petugas (id, user_id, date, data) VALUES(?, ?, ?, ?)'
  db.query(sql, [id, userId, date, formData], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    return res
      .status(200)
      .json({ success: true, message: 'data successfully added' })
  })
}

const calonPetugasDelete = (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM master_calon_petugas WHERE id=?'
  if (id) {
    db.query(sql, id, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({
        success: true,
        message: `data with id=${id} has been deleted successfully`,
      })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'id field is missing' })
  }
}

module.exports = {
  calonPetugasGet,
  calonPetugasGetId,
  calonPetugasPost,
  calonPetugasDelete,
}
