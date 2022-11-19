const express = require('express')
const router = express.Router()

const {
  calonPetugasGet,
  calonPetugasGetId,
  calonPetugasPost,
  calonPetugasDelete,
} = require('../controller/calon_petugas_controller')

router.get('/', calonPetugasGet)
router.get('/:id', calonPetugasGetId)
router.post('/', calonPetugasPost)
router.delete('/:id', calonPetugasDelete)

module.exports = router
