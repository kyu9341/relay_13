const data = require('./public/data.json')
const {DataError} = require('./Errortype')

function getData() {
  return new Promise((resolve, reject) => {
    if (!data) {
      resolve(DataError)
    }
    resolve(data)
  })
}

module.exports = getData
