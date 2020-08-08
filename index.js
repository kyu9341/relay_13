const dotenv = require('dotenv')
// .env 파일로 설정한 환경변수를 적용합니다(sample.env 파일 내용 확인 바람).
dotenv.config()

const express = require('express')
const path = require('path')

const getData = require('./getData')
const callTranslationApi = require('./callTranslationApi')
const callNaturalLangApi = require('./callNaturalLangApi')

const app = express()
app.set('port', process.env.PORT || 3000)

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/posts', (req, res) => {
  getData()
    .then(posts => posts
      .map(post => post.contents.map(content => ({
        postId: post.postId,
        ...content
      })))
      .reduce((acc, cur) => [...acc, ...cur], []))
    .then(contents => new Promise((resolve, reject) => {
      Promise.all(contents.map(callTranslationApi)).then(resolve)
    }))
    .then(callNaturalLangApi)
    .then(data => {
      const posts = data
        .sort((a, b) => +a.postId - +b.postId || +a.contentId - +b.contentId)
        .reduce((acc, cur) => {
          const post = acc.find(post => post.postId === cur.postId)
          if (!post) {
            return [...acc, {
              postId: cur.postId,
              contents: [cur]
            }]
          }
          post.contents.push(cur)
          return acc
        }, [])
      res.json(posts)
    })
    .catch(error => {
      console.log(error)
      res.json(require('./public/data.json'))
    })
})

app.listen(app.get('port'), () => {
  console.log(`만리안 app listening at http://localhost:${app.get('port')}`)
})
