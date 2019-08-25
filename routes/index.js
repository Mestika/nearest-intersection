const express = require('express');
const IntersectionCtrl = require('../controllers/intersections');
const router = express.Router();

/**
 * ADD ADDITIONAL ROUTES HERE BOTH FOR APP AND FOR API
 */
router.get('/api/nearest/:lat/:lon', IntersectionCtrl.findNearest);

module.exports = router;
