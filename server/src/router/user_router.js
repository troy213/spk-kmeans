const express = require('express')
const router = express.Router()

const {
  userGet,
  userPut,
  userDelete,
  userGetId,
  userPasswordPut,
} = require('../controller/user_controller')

const checkPassword = require('../middleware/check_password')
const checkUser = require('../middleware/check_user')

router.get('/', userGet)
router.get('/:id', userGetId)
router.put('/', userPut)
router.delete('/:id', userDelete)
router.put('/change-password', checkUser, checkPassword, userPasswordPut)

module.exports = router
