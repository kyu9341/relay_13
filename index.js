const dotenv = require('dotenv')
// .env 파일로 설정한 환경변수를 적용합니다(.env 파일 내용 확인 바람).
dotenv.config()

const express = require('express')
const path = require('path')

const router = require('./fileUpload')
const bodyParser = require('body-parser')
const getData = require('./getData')
const callTranslationApi = require('./callTranslationApi')
const callNaturalLangApi = require('./callNaturalLangApi')
// const process_sentimentAnalysis = require('./process_sentimentAnalysis')
const {convertFormatForAnalysis, convertFormatForUI} = require('./convertFormat')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: true }))
app.set('port', process.env.PORT || 3000)
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(router);
app.post('/posts', async (req, res) => {
  const post = req.body;
  const translatedPost = await callTranslationApi(post)
  const processedPost = await callNaturalLangApi(translatedPost);
  // TODO INSERT post, 추가적으로 ascii 텍스트 처리해서 넣어주어야 합니다.
  console.log('processedPost', processedPost);

  res.redirect('/');
});

/*
ex)
processedPost {
  title: '하하하',
  contents: '하하하하 안녕하세요~',
  translatedText: 'Hahahaha Hello~',
  sentiment: 'neutral' // 감정 분석 결과 neutral, positive, negative
}
*/


app.use(router);
app.get('/posts', (req, res) => {

  // TODO DB에서 select 한 데이터를 출력해주는 코드
  res.json();
})

app.listen(app.get('port'), () => {
  console.log(`만리안 app listening at http://localhost:${app.get('port')}`)
})
