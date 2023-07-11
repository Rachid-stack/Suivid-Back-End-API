const { Router } = require('express');
const actions = require('../controllers/utilisateurs.controller');
const router = Router();

router.get('/utilisateurs', actions.getUtilisateur);
router.post('/utilisateurs', actions.postUtilisateur);
router.put('/utilisateurs/:id', actions.putUtilisateur);
router.delete('/utilisateurs/:id', actions.deleteUtilisateur);

module.exports = router;