const jwt = require('jsonwebtoken')
const db = require('../config/db_config')
const { generateAccessToken, generateRefreshToken } = require('../token')

const checkToken = (req, res, next) => {
  const token = req.cookies.refreshtoken
  if (!token) return res.status(403).send({ accessToken: '' })
  let payload = null
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (err) {
    return res.status(403).send({ accessToken: '' })
  }

  const sql = 'SELECT * FROM user WHERE id=?'
  db.query(sql, payload.userId, (err, result) => {
    if (err) return res.status(403).send({ accessToken: '', message: err })
    if (result[0].refresh_token !== token)
      return res.status(403).send({ accessToken: '' })

    res.locals.id = result[0].id
    res.locals.roles = result[0].roles
    res.locals.username = result[0].username
    res.locals.accessToken = generateAccessToken(result[0].id)
    res.locals.refreshToken = generateRefreshToken(result[0].id)
    next()
  })
}

module.exports = checkToken
