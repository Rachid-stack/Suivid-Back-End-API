const { Router } = require('express');
const actions = require('../controllers/imputationCourrier.controller');
const router = Router();
router.get('/imputationCourrier', actions.getImputationCourrier);
router.post('/imputationCourrier', actions.postImputationCourrier);
router.put('/imputationCourrier/:id', actions.putImputationCourrier);
router.delete('/imputationCourrier/:id', actions.deleteImputationCourrier);

module.exports = router;
