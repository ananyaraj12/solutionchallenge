const express = require('express');
const router = express.Router();
const {
    predictDelay,
    predictETA,
    analyzeShipment,
    analyzeFleet,
    simulateDisruption,
    explainDelay,
    explainETA,
    optimizeTransport,
    reportDisruption,
} = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/predict-delay', protect, predictDelay);
router.post('/predict-eta', protect, predictETA);
router.post('/analyze', protect, analyzeShipment);
router.post('/analyze-fleet', protect, analyzeFleet);
router.post('/simulate', protect, simulateDisruption);
router.post('/explain-delay', protect, explainDelay);
router.post('/explain-eta', protect, explainETA);
router.post('/optimize-transport', protect, optimizeTransport);
router.post('/report-disruption', protect, reportDisruption);

module.exports = router;
