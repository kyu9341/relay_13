const request = require('request')
let https = require('https');

const options = {
  url: `${process.env.ENDPOINT}/text/analytics/v3.0/sentiment`,
  method: 'POST',
  headers: {
    'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY
  },
  body: {
    documents: []
  },
  json: true
}

const DELIMITER = '-'

function callNaturalLangApi(contents) {
  return new Promise((resolve, reject) => {
    const body = contents.map(content => ({
      id: `${content.postId}${DELIMITER}${content.contentId}`,
      language: 'en',
      text: content.translatedText
    }))
    const _options = JSON.parse(JSON.stringify(options))
    _options.body.documents = body
    request(_options, (error, response, body) => {
      if (!!error) {
        resolve(contents)
      }
      if (response.statusCode === 200) {
        const data = body.documents.reduce((acc, document) => {
          const [postId, contentId] = document.id.split(DELIMITER)
          const content = contents.find(content => content.postId === postId && content.contentId === contentId)
          content.sentiment = document.sentiment
          return [...acc, content]
        }, [])
        console.log(data)
        resolve(data)
        return
      }
      resolve(contents)
    })
  })
}

module.exports = callNaturalLangApi
