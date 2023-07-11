const { Router } = require('express');
const actions = require('../controllers/documents.controller');
const router = Router();

router.get('/documents', actions.getDocument);
router.post('/documents', actions.postDocument);
router.put('/documents/:id', actions.putDocument);
router.delete('/documents/:id', actions.deleteDocument);

module.exports = router;