const { Router } = require('express');
const actions = require('../controllers/correspondantCourrier.controller');
const router = Router();
router.get('/correspondantCourrier', actions.getCorrespondantCourrier);
router.post('/correspondantCourrier', actions.postCorrespondantCourrier);
router.put('/correspondantCourrier/:id', actions.putCorrespondantCourrier);
router.delete('/correspondantCourrier/:id', actions.deleteCorrespondantCourrier);

module.exports = router;
