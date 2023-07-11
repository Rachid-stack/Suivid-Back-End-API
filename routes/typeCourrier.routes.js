const { Router } = require('express');
const actions = require('../controllers/typeCourrier.controller');
const router = Router();

router.get('/types-courrier', actions.getTypeCourrier);
router.post('/types-courrier', actions.postTypeCourrier);
router.put('/types-courrier/:id', actions.putTypeCourrier);
router.delete('/types-courrier/:id', actions.deleteTypeCourrier);

module.exports = router;