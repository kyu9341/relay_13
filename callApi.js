const request = require('request')

/**
 * https://medium.com/harrythegreat/node-js%EC%97%90%EC%84%9C-request-js-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-28744c52f68d
 */
const options = {
  uri: 'api url here...',
  method: 'GET',
  qs: {
    key: 'value'
  },
}

function callApi(prevData) {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!!error) {

        reject('error here...')
      }
      if (response.statusCode === 200) {

        resolve(JSON.parse(body))
      }
    })
  })
}

module.exports = callTranslationApi
