const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

app.use(cors());

app.post("/api/isNose", jsonParser, async (req, res) => {
  console.log(req.body);

  //TODO: TensorFlowJS, load models, do predicting in here

  const result = 200

  res.json(result);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
