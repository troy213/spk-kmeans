const bcrypt = require('bcrypt')
const db = require('../config/db_config')
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../token')

const userGet = (req, res) => {
  const sql = 'SELECT id, username, roles FROM user'
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    return res.status(200).json({ success: true, data: result })
  })
}

const userGetId = (req, res) => {
  const { id } = req.params
  const sql = 'SELECT id, username, roles FROM user WHERE id=?'
  db.query(sql, id, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    return res.status(200).json({ success: true, data: result })
  })
}

const userPut = (req, res) => {
  const { id, username, roles } = req.body

  const sql = 'SELECT * FROM user WHERE id=?'
  db.query(sql, id, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    if (result.length > 0) {
      const updateSql = 'UPDATE user SET username=?, roles=? WHERE id=?'
      db.query(updateSql, [username, roles, id], (errUpdate, resultUpdate) => {
        if (errUpdate)
          return res.status(500).json({ success: false, message: err })

        const accessToken = generateAccessToken(id)
        const refreshToken = generateRefreshToken(id)
        const updateRTSql = 'UPDATE user SET refresh_token=? WHERE id=?'
        db.query(
          updateRTSql,
          [refreshToken, id],
          (errUpdateRT, resultUpdateRT) => {
            if (errUpdateRT)
              return res.status(500).json({ success: false, message: err })
            res.locals.id = id
            res.locals.roles = roles
            sendRefreshToken(res, refreshToken)
            sendAccessToken(req, res, accessToken)
          }
        )
      })
    } else {
      return res.status(400).json({ success: false, message: 'user not found' })
    }
  })
}

const userDelete = (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM user WHERE id=?'
  if (id) {
    db.query(sql, id, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({
        success: true,
        message: `user with id=${id} has been deleted successfully`,
      })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'id field is missing' })
  }
}

const userPasswordPut = async (req, res) => {
  try {
    const { id, newPwd } = req.body
    const hashedPassword = await bcrypt.hash(newPwd, 10)
    const sql = 'UPDATE user SET password=? WHERE id=?'
    if (id && hashedPassword) {
      db.query(sql, [hashedPassword, id], (err, result) => {
        if (err) throw err
        return res
          .status(200)
          .json({ success: true, message: 'password successfully changed' })
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err })
  }
}

module.exports = {
  userGet,
  userGetId,
  userPut,
  userDelete,
  userPasswordPut,
}
