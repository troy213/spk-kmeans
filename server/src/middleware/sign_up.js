const db = require('../config/db_config')

const signUp = (req, res, next) => {
  const { username } = req.body
  const sql = 'SELECT * FROM user WHERE username=?'
  if (username) {
    db.query(sql, username, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      if (result.length > 0)
        return res
          .status(409)
          .json({ success: false, message: 'Username has been already taken' })
      next()
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'Username or Password is empty!' })
  }
}

module.exports = signUp
