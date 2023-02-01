const express = require('express');
const app = express();
const port = 2000;

const configAPI = require("./config/config-api.json");

app.get("/api/v1", (req, res) => {
    const api = [{
        name: "Statut",
        value: configAPI.statut,
    }]
    res.json(api);
});

app.listen(port, () => {
    console.log(`API is online on port ${port}`);
});