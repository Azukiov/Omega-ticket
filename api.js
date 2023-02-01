const express = require('express');
const app = express();
const port = 2000;

app.get("/api/v1", (req, res) => {
    const api = [{
        name: "Statut",
        value: "Online",
    }]
    res.json(api);
});

app.listen(port, () => {
    console.log(`API is online on port ${port}`);
});