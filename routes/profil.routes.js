const { Router } = require('express');
const actions = require('../controllers/profils.controller');
const router = Router();

router.get('/profils', actions.getProfil);
router.post('/profils', actions.postProfil);
router.put('/profils/:id', actions.putProfil);
router.delete('/profils/:id', actions.deleteProfil);

module.exports = router;
