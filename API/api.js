const fs = require('fs');
const path = require('path');

const modelDir = './models';

fs.readdirSync(modelDir).forEach(filePath => {
  const fileName = path.parse(filePath).name;
  const fullPath = path.join(__dirname, modelDir, filePath);
  exports[fileName] = require(fullPath).public;
});