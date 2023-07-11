const { Router } = require('express');
const actions = require('../controllers/diffusionCourrier.controller');
const router = Router();
router.get('/diffusionCourrier', actions.getDiffusionCourrier);
router.post('/diffusionCourrier', actions.postDiffusionCourrier);
router.put('/diffusionCourrier/:id', actions.putDiffusionCourrier);
router.delete('/diffusionCourrier/:id', actions.deleteDiffusionCourrier);

module.exports = router;
