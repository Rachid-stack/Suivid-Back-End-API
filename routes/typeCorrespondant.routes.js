const { Router } = require('express');
const actions = require('../controllers/typeCorrespondant.controller');
const router = Router();
router.get('/typeCorrespondant', actions.getTypeCorrespondant);
router.post('/typeCorrespondant', actions.postTypeCorrespondant);
router.put('/typeCorrespondant/:id', actions.putTypeCorrespondant);
router.delete('/typeCorrespondant/:id', actions.deleteTypeCorrespondant);

module.exports = router;
