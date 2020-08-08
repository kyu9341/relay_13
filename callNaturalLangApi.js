const request = require('request')

function callNaturalLangApi(content) {
  return new Promise((resolve, reject) => {
    request('https://jsonplaceholder.typicode.com/users/2', (error, response, body) => {
      if (!!error) {
        resolve(content)
      }
      if (response.statusCode === 200) {
        resolve(content)
      }
    })
  })
}

module.exports = callNaturalLangApi
