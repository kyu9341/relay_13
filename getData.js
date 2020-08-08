const data = require('./public/data.json')

function getData() {
  return new Promise((resolve, reject) => resolve(data))
}

module.exports = getData
