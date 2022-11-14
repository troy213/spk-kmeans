const jwt = require('jsonwebtoken')

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10s',
  })
}

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '15s',
  })
}

const sendAccessToken = (req, res, accessToken) => {
  res.send({
    accessToken,
    username: req.body.username,
    roles: res.locals.roles,
  })
}

const sendRefreshToken = (res, token) => {
  // in real use case, you should not name your cookie 'refreshToken', it's for demonstration purpose
  res.cookie('refreshtoken', token, {
    httpOnly: true,
    path: '/api/refresh_token',
  })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
}
