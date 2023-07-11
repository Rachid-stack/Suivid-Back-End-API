const { Router } = require('express');
const router = Router();
const actions = require('../controllers/categorieCourrier.controller');

router.get('/categories-courrier', actions.getCategorieCourrier);
router.post('/categories-courrier', actions.postCategorieCourrier);
router.put('/categories-courrier/:id', actions.putCategorieCourrier);
router.delete('/categories-courrier/:id', actions.deleteCategorieCourrier);

module.exports = router;
