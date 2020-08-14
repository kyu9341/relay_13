const request = require('request')

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

function callNaturalLangApi(post) {
  console.log('na', post);
  return new Promise((resolve, reject) => {
    let documents = {
      id: 1,
      language: !!post.translatedText ? 'en' : 'ko',
      text: post.translatedText || post.contents
    }

    console.log('docu', documents);
    const _options = JSON.parse(JSON.stringify(options))
    _options.body.documents = [ documents ]
    request(_options, (error, response, body) => {
      if (!!error) {
        console.log('==last fail data==', body.documents.sentiment)
        resolve(post)
      }
      if (response.statusCode === 200) {
        post.sentiment = body.documents[0].sentiment;
        console.log('===============data', post)
        resolve(post)
        return
      }
      console.log('na2', body);

      resolve(post)
    })
  })
}

module.exports = callNaturalLangApi

