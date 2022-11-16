const db = require('../config/db_config')

const signIn = (req, res, next) => {
  const { username } = req.body
  const sql = 'SELECT * FROM user WHERE username=?'
  if (username) {
    db.query(sql, username, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      if (result.length > 0) {
        res.locals.id = result[0].id
        res.locals.hashedPassword = result[0].password
        res.locals.roles = result[0].roles
        next()
      } else {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid Username or Password' })
      }
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'Username or Password is empty!' })
  }
}

module.exports = signIn
