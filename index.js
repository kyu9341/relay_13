var fs = require('fs'); // 파일 시스템
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')

const getData = require('./getData')
const callTranslationApi = require('./callTranslationApi')
const {callNaturalLangApi} = require('./callNaturalLangApi')

const app = express()
app.set('port', process.env.PORT || 3000)

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/posts', (req, res) => {
  getData() // json 파일 가져옴
    .then(posts => posts.map(post => post.contents.map(content => { return { // [{postId:1, "contentId": "0","text": "제목 입니다."}, {...}]
        postId: post.postId,
        ...content
      }}))
      .reduce((acc, cur) => [...acc, ...cur], [])) // [게시글1객체, 게시글2객체]
    .then(contents => new Promise((resolve, reject) => {
      Promise.all(contents.map(callTranslationApi)).then(resolve)
    }))
    .then(data=>process_sentimentAnalysis(data, res)) //출력 // data => res.json(data)
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

// 추가
function process_sentimentAnalysis(data, res){
  const sentiment_input = data.map(el=>el.translatedText); // sentiment_input = [문장1, 문장2, ...]
  const promise = callNaturalLangApi(sentiment_input);
  promise.then(api_result=>{
    const only_sentiment = api_result.map(el=>el.sentiment); // [ 'positive', 'negative' ]
    
    // 기존의 게시글 id 문장 번호와 합치기
    const result = [];
    for(let i=0; i<data.length; i++){
      result.push({...data[i], sentiment:only_sentiment[i]});
    }
    res.json(result);
    console.log('감정 분석 처리 완료');

    // 파일로 저장
    const jsonArray = JSON.stringify(result);
    fs.writeFile("./public/sentiment.json", jsonArray, function(err) {
        if (err) {
            console.log(err);
        }
    });
  });

  // const result = data2.map(el=>el.sentiment); // [ 'positive', 'negative' ]
}

/*
  // 번역
  [
    {"postId":"1","contentId":"0","text":"제목 입니다.","translatedText":"It's the title."},
    {"postId":"1","contentId":"1","text":"안녕하세요.","translatedText":"Hello"},
    {"postId":"1","contentId":"2","text":"첫번째 글 입니다.","translatedText":"Here's the first one."},
    {"postId":"1","contentId":"3","text":"잘 부탁드립니다.","translatedText":"Nice to meet you."},
    {"postId":"2","contentId":"0","text":"이것도 제목이에요","translatedText":"This is also a title."},
    {"postId":"2","contentId":"1","text":"반갑습니다.","translatedText":"Nice to meet you."},
    {"postId":"2","contentId":"2","text":"두번째 글 입니다.","translatedText":"Here's the second one."},
    {"postId":"2","contentId":"3","text":"안녕히 계세요.","translatedText":"Goodbye."}
  ]
*/