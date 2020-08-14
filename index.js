const dotenv = require('dotenv')
// .env 파일로 설정한 환경변수를 적용합니다(sample.env 파일 내용 확인 바람).
dotenv.config()

const express = require('express')
const path = require('path')

const getData = require('./getData')
const callTranslationApi = require('./callTranslationApi')
const callNaturalLangApi = require('./callNaturalLangApi')
const process_sentimentAnalysis = require('./process_sentimentAnalysis')
const {convertFormatForUI} = require('./convertFormat')

const app = express()
app.set('port', process.env.PORT || 3000)

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/posts', (req, res) => {
  getData() // json 파일 가져옴
    .then(contents => new Promise((resolve) => {
      Promise.all(contents.map(callTranslationApi)).then(resolve)
    }))
    .then(posts => res.json(posts))
    .catch(error => {
      console.log(error)
      let substitute = require('./public/sentiment.json')
      if (!substitute) {
        substitute = require('./public/data.json')
      }
      res.json(substitute)
    })
})

app.listen(app.get('port'), () => {
  console.log(`만리안 app listening at http://localhost:${app.get('port')}`)
})
