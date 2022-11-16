const bcrypt = require('bcrypt')

const checkPassword = async (req, res, next) => {
  try {
    const { oldPwd } = req.body
    if (await bcrypt.compare(oldPwd, res.locals.password)) {
      next()
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'invalid password' })
    }
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ success: false, message: 'failed to change password' })
  }
}

module.exports = checkPassword
