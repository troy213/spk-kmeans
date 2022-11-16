const jwt = require('jsonwebtoken')
const db = require('../config/db_config')

const ROLES = {
  Admin: 1,
  Staff: 2,
}

const verifyRoles = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403) //invalid token

    const sql = 'SELECT roles FROM user WHERE id=?'
    db.query(sql, decoded.userId, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      if (result.length === 0)
        return res
          .status(400)
          .json({ success: false, message: 'user not found' })
      if (result[0].roles !== ROLES.Admin)
        return res.status(403).json({ success: false, message: 'forbidden' })
      next()
    })
  })
}

module.exports = verifyRoles
