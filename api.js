const express = require('express');
const app = express();
const port = 2000;

const config = require("./config/config.json");

app.get("/api/v1", (req, res) => {
    const api = [{
        name: "Statut",
        value: config.statut,
    },{
        name: "Version",
        value: config.version,
    }]
    res.json(api);
});

app.listen(port, () => {
    console.log(`API is online on port ${port}`);
});