const express = require('express');
const router = express.Router();
const { getDocument, updateDocument } = require('../controllers/documentController');

router.get('/:id/getdocs', getDocument);
router.post('/:id/updatedocs', updateDocument);

module.exports = router;
