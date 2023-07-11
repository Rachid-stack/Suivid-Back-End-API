const { Router } = require('express');
const actions = require('../controllers/services.controller');
const router = Router();

router.get('/services', actions.getService);
router.post('/services', actions.postService);
router.put('/services/:id', actions.putService);
router.delete('/services/:id', actions.deleteService);

module.exports = router;