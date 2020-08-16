const axios = require('axios')
const dotenv = require('dotenv').config()

axios.defaults.timeout = 2000
const URL = process.env.ENDPOINT + 'text/analytics/v3.0/sentiment'

headers = {
    'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

function callNaturalLangApi(post) {
  const data = {
    documents: [{
      "id": "1",
      "language": "ko",
      "text" : post.title + ' ' + post.contents
    }]
  }

  axios({
    method  : 'POST',
    url     : URL,
    headers : headers,
    data    : data
  }).then((res) => {
    post['sentiment'] = res.data.documents[0].sentiment
    return post
  }).catch((error) => {
    console.log('status code    = ', error.response.status)
    console.log('status message = ', error.response.statusText)
  })
}

module.exports = callNaturalLangApi
