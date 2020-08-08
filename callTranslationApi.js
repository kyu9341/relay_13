const request = require('request')

const options = {
  url: 'https://openapi.naver.com/v1/papago/n2mt',
  method: 'POST',
  form: {
    source: 'ko',
    target: 'en',
    text: undefined
  },
  headers: {
    'X-Naver-Client-Id': process.env.CLIENT_ID,
    'X-Naver-Client-Secret': process.env.CLIENT_SECRET
  }
}

function callTranslationApi(content) {
  return new Promise((resolve, reject) => {
    const _options = JSON.parse(JSON.stringify(options))
    _options.form.text = content.text
    request(_options, (error, response, body) => {
      const data = JSON.parse(body)
      if (!!error || data.message['@type'] !== 'response') {
        resolve(content)
      }
      if (response.statusCode === 200) {
        content.translatedText = data.message.result.translatedText
        resolve(content)
      }
    })
  })
}

module.exports = callTranslationApi
