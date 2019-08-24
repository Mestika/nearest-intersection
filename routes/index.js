const express = require('express');
const intersectionCtrl = require('../controllers/intersections');
const router = express.Router();

router.get('/api/nearest/:lat/:lon', intersectionCtrl.findNearest);

module.exports = router;
