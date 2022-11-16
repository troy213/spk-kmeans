const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 5000
const allowedOrigins = require('./config/allowedOrigins')

const signIn = require('./middleware/signIn')
const signUp = require('./middleware/signUp')
const checkToken = require('./middleware/checkRefreshToken')
const verifyJWT = require('./middleware/verifyJWT')
const db = require('./config/db_config')

const userRouter = require('./router/user_router')

const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('./token')
const { isAuth } = require('./isAuth')
const credentials = require('./middleware/credentials')

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)
app.use([express.urlencoded({ extended: false }), express.json()])
app.use(cookieParser())

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Hello from the server!' })
})

app.post('/api/register', signUp, async (req, res) => {
  const { username, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const id = uuidv4()
    const sql = 'INSERT INTO user (id, username, password) VALUES(?, ?, ?)'
    if (username && password) {
      db.query(sql, [id, username, hashedPassword], (err, result) => {
        if (err) throw err
        return res
          .status(200)
          .json({ success: true, message: 'Sign Up success' })
      })
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'Username or Password is empty!' })
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err })
  }
})

app.post('/api/login', signIn, async (req, res) => {
  const { password } = req.body

  try {
    const valid = await bcrypt.compare(password, res.locals.hashedPassword)
    if (!valid)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid Username or Password' })

    const accessToken = generateAccessToken(res.locals.id)
    const refreshToken = generateRefreshToken(res.locals.id)
    const sql = 'UPDATE user SET refresh_token=? WHERE id=?'
    db.query(sql, [refreshToken, res.locals.id], (err, result) => {
      if (err) throw err
      sendRefreshToken(res, refreshToken)
      sendAccessToken(req, res, accessToken)
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err })
  }
})

app.post('/api/logout', (req, res) => {
  const { id } = req.body
  const sql = 'UPDATE user SET refresh_token=null WHERE id=?'
  db.query(sql, id, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
  })
  res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
  return res.send({ message: 'Logged out' })
})

app.post('/api/protected', async (req, res) => {
  try {
    const userId = isAuth(req)
    if (userId !== null) {
      res.send({
        data: 'This is protected data.',
      })
    }
  } catch (err) {
    res.status(403).send({
      error: `${err.message}`,
    })
  }
})

app.post('/api/refresh_token', checkToken, (req, res) => {
  const { id, username, roles, accessToken, refreshToken } = res.locals
  const sql = 'UPDATE user SET refresh_token=? WHERE id=?'
  db.query(sql, [refreshToken, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    sendRefreshToken(res, refreshToken)
    return res.send({ id, accessToken, username, roles })
  })
})

// put all yours protected route under line 121
app.use(verifyJWT)

app.use('/api/users', userRouter)

app.get('*', (req, res) => {
  res.status(404).json({ success: false, message: '404 Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
