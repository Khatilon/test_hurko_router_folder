const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/client/dist'));

app.get('/hello', (req, res) => {
  res.send({
    name: "ray",
    id: 123
  });
});

app.get('/testroute', (req, res) => {
  res.send({
    name: "testroute",
    id: 478
  });
});

// send the user to index html page inspite of the url
// 這一行是在給不同route的時候 假設另外狀況 仍可指向index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/client/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});