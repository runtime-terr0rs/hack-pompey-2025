const fs = require('fs');
const data = require('../data/shipData.json')

function readShipData() {
   // fs.readFile('../dashboardApi/src/api_core/data/shipData.json', 'utf8', (err, jsonString) => {
   //    if (err) {
   //      console.log('Error reading file:', err);
   //      return;
   //    }
   //    try {
   //       return JSON.parse(jsonString);

   //    } catch (err) {
   //      console.log('Error parsing JSON:', err);
   //    }
   //  });
   return data;
}

function getRandomFloat(min, max) {
   return Math.random() * (max - min) + min;
}

function updateShipData(newJsonData ) {
   const filePath = '../dashboardApi/src/api_core/data/shipData.json'
   fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }
      try {
          fs.writeFile(filePath, JSON.stringify(newJsonData), (err) => {
              if (err) {
                  console.error('Error writing file:', err);
                  return;
              }
              console.log('\nData updated successfully.');
          });
      } catch (error) {
          console.error('Error parsing JSON data:', error);
      }
  });
}

module.exports = {
   readShipData,
   getRandomFloat,
   updateShipData
}