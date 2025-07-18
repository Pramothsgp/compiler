const express = require('express');
const { testDocker, codeRunner } = require('../controller/runCode');
const router = express.Router();

router.post('/', codeRunner);
router.get('/test', testDocker);

module.exports = router;