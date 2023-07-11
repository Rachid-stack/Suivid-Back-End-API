const { Router } = require('express');
const actions = require('../controllers/courriers.controller');
const router = Router();

router.get('/courriers', actions.getCourrier);
router.post('/courriers', actions.postCourrier);
router.put('/courriers/:id', actions.putCourrier);
router.delete('/courriers/:id', actions.deleteCourrier);

module.exports = router;