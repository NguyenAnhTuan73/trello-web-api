const express = require("express");
const app = express();
const hostName = "localhost";
const port = 8073;
app.get("/", (req, res) => {
  res.send("<h2>Hello World</h2>");
});

app.listen(port, hostName, () => {
  console.log(`Server is running on http://${hostName}:${port}`);
});
