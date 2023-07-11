const { Router } = require('express');
const actions = require('../controllers/registreCourrier.controller');
const router = Router();
router.get('/registreCourrier', actions.getRegistreCourrier);
router.post('/registreCourrier', actions.postRegistreCourrier);
router.put('/registreCourrier/:id', actions.putRegistreCourrier);
router.delete('/registreCourrier/:id', actions.deleteRegistreCourrier);

module.exports = router;
