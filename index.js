const express = require('express');
const app = express();
const port = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.