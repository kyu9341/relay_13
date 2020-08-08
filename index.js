const dotenv = require('dotenv')
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
    .then(data => res.json(data))
    .catch(error => {
      console.log(error.message)
      res.json({
        status: 'fail'
      })
    })
})

app.listen(app.get('port'), () => {
  console.log(`만리안 app listening at http://localhost:${app.get('port')}`)
})
