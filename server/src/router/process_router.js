const express = require('express')
const router = express.Router()

const { getCalonPetugasValue } = require('../controller/process_controller')

router.get('/', getCalonPetugasValue)

module.exports = router
