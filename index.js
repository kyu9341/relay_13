const dotenv = require('dotenv')
// .env 파일로 설정한 환경변수를 적용합니다(.env 파일 내용 확인 바람).
dotenv.config()
const express = require('express')
const path = require('path')
const router = require('./fileUpload')
const sequelize = require('./model/database')
const bodyParser = require('body-parser')
const Posts = require('./model/post')
const getData = require('./getData')
const callTranslationApi = require('./callTranslationApi')
const callNaturalLangApi = require('./callNaturalLangApi')
// const process_sentimentAnalysis = require('./process_sentimentAnalysis')
const {convertFormatForAnalysis, convertFormatForUI} = require('./convertFormat');


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(router);
app.post('/posts', async (req, res) => {
  const {title, contents, objectDetection} = req.body;
  const [boxPoints, filePath]= objectDetection
  const translatedPost = await callTranslationApi(req.body)
  const processedPost = await callNaturalLangApi(translatedPost);
  console.log(boxPoints, filePath)
  await Posts.create({title, contents})
  // objectDetection 객체로 좌표 접근 가능.
  // TODO INSERT post, 추가적으로 ascii 텍스트 처리해서 넣어주어야 합니다.
  // console.log('processedPost', processedPost);

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
app.get('/posts', async(req, res) => {
  const result = await Posts.findAll()
  // TODO DB에서 select 한 데이터를 출력해주는 코드
  res.json(result);
})
// {
//   "postId": "1",
//   "sentiment": "neutral",
//   "title" : "즐거운 하루입니다.",
//   "contents": "안녕하세요. 첫번째 글을 쓰게 되었네요. 커다란 영광입니다. 잘 부탁드립니다.",
//   "ascii" : null
// },

sequelize.sync().then(() => {

})

app.listen(app.get('port'), () => {
  console.log(`만리안 app listening at http://localhost:${app.get('port')}`)
})
