const db = require('../config/db_config')

const checkUser = (req, res, next) => {
  const { id } = req.body
  const sql = 'SELECT password FROM user WHERE id=?'
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ success: false, message: err })
    }
    if (result.length > 0) {
      res.locals.password = result[0].password
      next()
    } else {
      res.status(400).json({ success: false, msg: 'user not found' })
    }
  })
}

module.exports = checkUser
