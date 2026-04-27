const aiService = require('../services/aiService');
const AgentHistory = require('../models/AgentHistory');

const predictDelay = async (req, res) => {
    try {
        const result = await aiService.predictDelay(req.body);
        await AgentHistory.create({
            user: req.user._id,
            prompt: 'Delay prediction',
            response: JSON.stringify(result),
            actionType: 'RISK_ANALYSIS',
            context: req.body,
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const predictETA = async (req, res) => {
    try {
        const result = await aiService.predictETA(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const analyzeShipment = async (req, res) => {
    try {
        const result = await aiService.getAnomalyDetection(req.body);
        await AgentHistory.create({
            user: req.user._id,
            prompt: 'Anomaly detection analysis',
            response: JSON.stringify(result),
            actionType: 'ANOMALY_DETECTION',
            context: req.body,
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const analyzeFleet = async (req, res) => {
    try {
        const { fleet_size } = req.body;
        const result = await aiService.getAnomalyBatch(fleet_size || 25);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const simulateDisruption = async (req, res) => {
    try {
        const result = await aiService.simulateDisruption(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const explainDelay = async (req, res) => {
    try {
        const result = await aiService.explainDelay(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const explainETA = async (req, res) => {
    try {
        const result = await aiService.explainETA(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const optimizeTransport = async (req, res) => {
    try {
        const result = await aiService.optimizeTransport(req.body);
        await AgentHistory.create({
            user: req.user._id,
            prompt: `Optimize: ${req.body.distance_km}km, ${req.body.weight_kg}kg`,
            response: JSON.stringify(result),
            actionType: 'REROUTE',
            context: req.body,
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const reportDisruption = async (req, res) => {
    try {
        const result = await aiService.reportDisruption(req.body);
        await AgentHistory.create({
            user: req.user._id,
            prompt: `Disruption: ${req.body.description || 'reported'}`,
            response: JSON.stringify(result),
            actionType: 'RISK_ANALYSIS',
            context: req.body,
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    predictDelay,
    predictETA,
    analyzeShipment,
    analyzeFleet,
    simulateDisruption,
    explainDelay,
    explainETA,
    optimizeTransport,
    reportDisruption,
};
