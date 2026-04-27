const axios = require('axios');

class AIService {
    constructor() {
        this.agentUrl = process.env.AI_AGENT_URL || 'http://localhost:8000';
    }

    async predictDelay(shipmentData) {
        const response = await axios.post(`${this.agentUrl}/api/v1/ml/predict-delay`, shipmentData);
        return response.data;
    }

    async predictETA(etaData) {
        const response = await axios.post(`${this.agentUrl}/api/v1/ml/predict-eta`, etaData);
        return response.data;
    }

    async getAnomalyDetection(shipmentData) {
        const response = await axios.post(`${this.agentUrl}/api/v1/ml/anomaly-detect`, shipmentData);
        return response.data;
    }

    async getAnomalyBatch(fleetSize = 25) {
        const response = await axios.post(`${this.agentUrl}/api/v1/ml/anomaly-detect-batch`, { fleet_size: fleetSize });
        return response.data;
    }

    async simulateDisruption(params) {
        const response = await axios.post(`${this.agentUrl}/api/v1/ml/whatif`, params);
        return response.data;
    }

    async explainDelay(shipmentData) {
        const response = await axios.post(`${this.agentUrl}/api/v1/ml/explain-delay`, shipmentData);
        return response.data;
    }

    async explainETA(etaData) {
        const response = await axios.post(`${this.agentUrl}/api/v1/ml/explain-eta`, etaData);
        return response.data;
    }

    async optimizeTransport(params) {
        const response = await axios.post(`${this.agentUrl}/api/v1/ml/optimize-transport`, params);
        return response.data;
    }

    async optimizeRoute(origin, destination, waypoints) {
        const response = await axios.post(`${this.agentUrl}/api/v1/routes/optimize`, { origin, destination, waypoints });
        return response.data;
    }

    async reportDisruption(report) {
        const response = await axios.post(`${this.agentUrl}/api/v1/disruptions/report`, report);
        return response.data;
    }
}

module.exports = new AIService();
