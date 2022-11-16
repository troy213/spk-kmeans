const express = require('express')
const router = express.Router()

const {
  userGet,
  userPut,
  userDelete,
  userGetId,
} = require('../controller/user_controller')

router.get('/', userGet)
router.get('/:id', userGetId)
router.put('/', userPut)
router.delete('/:id', userDelete)

module.exports = router
