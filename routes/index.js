const express = require('express');
const IntersectionCtrl = require('../controllers/intersections');
const router = express.Router();

router.get('/api/nearest/:lat/:lon', IntersectionCtrl.findNearest);

module.exports = router;
